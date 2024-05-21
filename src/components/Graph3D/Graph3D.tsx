import React, { useEffect } from "react";
import Graph, { TWIN3D } from "../../modules/Graph/Graph";
import Point from "../../modules/Math3D/entities/Point";
import Math3D, { ETransform } from "../../modules/Math3D/Math3D";
import Surface from "../../modules/Math3D/entities/Surface";
import Sphere from "../../modules/Math3D/surfaces/Sphere";
import Light from "../../modules/Math3D/entities/Light";
import Edge from "../../modules/Math3D/entities/Edge";
import Polygon, { EDistance } from "../../modules/Math3D/entities/Polygon";
import Checkbox3D from "./Checkbox3D/Checkbox3D";
import Torus from "../../modules/Math3D/surfaces/Torus";
import Cube from "../../modules/Math3D/surfaces/Cube";

export enum ECustom {
    canMove = 'canMove',
    mouse0 = 'mouse0',
    mouse1 = 'mouse1',
    mouse2 = 'mouse2',
    drawPoints = 'drawPoints',
    drawEdges = 'drawEdges',
    drawPolygons = 'drawPolygons'
}

const Graph3D: React.FC = () => {
    let graph: Graph | null = null;
    const WIN: TWIN3D = {
        left: -5,
        bottom: -5,
        width: 10,
        height: 10,
        center: new Point(0, 0, -30),
        camera: new Point(0, 0, -50),
    }
    const math3D: Math3D = new Math3D({ WIN });

    const custom = {
        [ECustom.canMove]: false,
        [ECustom.mouse0]: false,
        [ECustom.mouse1]: false,
        [ECustom.mouse2]: false,
        [ECustom.drawPoints]: false,
        [ECustom.drawEdges]: false,
        [ECustom.drawPolygons]: true
    }


    const SolarSystem = (): Surface[] => {
        const Sun = new Sphere(3.5, '#FFCC00');
        Sun.addAnimation(ETransform.rotateOz, -0.01);

        const Earth = new Sphere(2, '#22FF33', new Point(12, 0, 0));
        Earth.addAnimation(ETransform.rotateOz, 0.06, new Point);

        const Moon = new Sphere(1, '#454545', new Point(8, 0, 0));
        Moon.addAnimation(ETransform.rotateOz, 0.6, Earth.center);

        return [Sun, Earth, Moon];
    }

    let scene: Surface[] = [new Sphere(5)];
    let dx: number = 0;
    let dy: number = 0;

    const mouseup = (event: MouseEvent): void => {
        switch (event.button) {
            case 0:
                custom.mouse0 = false;
                break;
            case 1:
                custom.mouse1 = false;
                break;
            case 2:
                custom.mouse2 = false;
                break;
        }
    }

    const mouseleave = (): void => {
        custom.mouse0 = false;
        custom.mouse1 = false;
        custom.mouse2 = false;
    }

    const mousedown = (event: MouseEvent): void => {
        switch (event.button) {
            case 0:
                custom.mouse0 = true;
                break;
            case 1:
                custom.mouse1 = true;
                break;
            case 2:
                custom.mouse2 = true;
                break;
        }
    }

    const wheel = (event: WheelEvent): void => {
        event.preventDefault();
        const delta = (event.deltaY > 0) ? 1.2 : 0.8;
        const matrix = math3D.zoom(delta);
        scene.forEach(surface => {
            surface.points.forEach(point => math3D.transform(matrix, point));
            math3D.transform(matrix, surface.center);
        });
    }

    const mousemove = (event: MouseEvent): void => {
        if (custom.mouse0 || custom.mouse2) {
            const gradus = Math.PI / 180 / 4;
            const matrix = math3D.getTransform(
                math3D.rotateOx((dy - event.offsetY) * gradus),
                custom.mouse2 ?
                    math3D.rotateOz((dx - event.offsetX) * gradus) :
                    math3D.rotateOy((dx - event.offsetX) * gradus)
            );
            scene.forEach((surface: Surface) => {
                surface.points.forEach((point: Point) => math3D.transform(matrix, point))
                math3D.transform(matrix, surface.center);
            });
        }
        if (custom.mouse1) {
            const offset = 0.05;
            const matrix = math3D.move(
                (dx - event.offsetX) * -offset,
                (dy - event.offsetY) * offset,
                0
            );
            scene.forEach((surface: Surface) => {
                surface.points.forEach((point: Point) => math3D.transform(matrix, point));
                math3D.transform(matrix, surface.center);
            });
        }
        dx = event.offsetX;
        dy = event.offsetY;
    }

    const ligth = new Light(-40, 15, 0, 1500);
    setInterval(() => {
        scene.forEach(surface => surface.doAnimation(math3D));
    }, 50);

    let currentFPS = 0;
    let FPS = 0;
    let timestamp = Date.now();

    const renderScene = (fps: number): void => {
        if (graph) {
            graph.clear();

            if (custom.drawPoints) {
                scene.forEach((surface: Surface) => {
                    surface.points.forEach((point: Point) => {
                        if (graph)
                            graph.point(math3D.xs(point), math3D.ys(point));
                    });
                });
            }

            if (custom.drawEdges) {
                scene.forEach((surface: Surface) => {
                    surface.edges.forEach((edge: Edge) => {
                        const point1 = surface.points[edge.p1];
                        const point2 = surface.points[edge.p2];
                        if (graph)
                            graph.line(math3D.xs(point1), math3D.ys(point1), math3D.xs(point2), math3D.ys(point2));
                    });
                });
            }

            if (custom.drawPolygons) {
                const polygons: Polygon[] = [];
                scene.forEach((surface: Surface, index: number) => {
                    math3D.calcDistance(surface, WIN.camera, EDistance.distance);
                    math3D.calcDistance(surface, ligth, EDistance.lumen);
                    surface.polygons.forEach((polygon: Polygon) => {
                        polygon.index = index;
                        polygons.push(polygon);
                    });
                });
                math3D.sortByArtistAlgorithm(polygons);
                polygons.forEach(polygon => {
                    const points = polygon.points.map(
                        index => new Point(
                            math3D.xs(scene[polygon.index].points[index]),
                            math3D.ys(scene[polygon.index].points[index])
                        )
                    );
                    const lumen = math3D.calcIllumination(polygon.lumen, ligth.lumen);
                    let { r, g, b } = polygon.color;
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);
                    if (graph)
                        graph.polygon(points, polygon.rgbToHex(r, g, b));
                });
            }

            graph.text(WIN.left, WIN.bottom, fps.toString());
        }
    }

    const animLoop = () => {
        FPS++;
        const currentTimestamp = Date.now();
        if (currentTimestamp - timestamp >= 1000) {
            timestamp = currentTimestamp;
            currentFPS = FPS;
            FPS = 0;
        }

        renderScene(currentFPS);

        window.requestAnimationFrame(animLoop);
    }

    animLoop();

    const changeValue = (flag: ECustom, value: boolean): void => {
        custom[flag] = value;
    }

    const changeScene = (event: React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.target.value) {
            case "Sphere": 
                scene = [new Sphere()];
                break;
            case "Cube":
                scene = [new Cube()];
                break;
            case "Torus":
                scene = [new Torus()];
                break;
        }
    } 

    useEffect(() => {
        graph = new Graph({
            id: 'graph3DCanvas',
            width: 600,
            height: 600,
            WIN,
            callbacks: { wheel, mousemove, mouseleave, mouseup, mousedown }
        });

        return () => {
            graph = null;
        }
    }, [graph]);


    return (<div>
        <canvas id='graph3DCanvas'></canvas>
        <div>
            <Checkbox3D
                text="точки"
                id="points"
                custom={ECustom.drawPoints}
                customValue={custom[ECustom.drawPoints]}
                changeValue={changeValue}
            />
            <Checkbox3D 
                text="рёбра"
                id="edges"
                custom={ECustom.drawEdges}
                customValue={custom[ECustom.drawEdges]}
                changeValue={changeValue}
            />
            <Checkbox3D 
                text="полигоны"
                id="polygons"
                custom={ECustom.drawPolygons}
                customValue={custom[ECustom.drawPolygons]}
                changeValue={changeValue}
            />
        </div>
        <select onChange={changeScene} id="selectedSurface">
            <option value="Cube">Куб</option>
            <option value="Sphere">Сфера</option>
            <option value="Torus">Тор</option>
        </select>
    </div>);
}

export default Graph3D;

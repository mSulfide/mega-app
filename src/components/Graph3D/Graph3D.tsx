import React, { useEffect } from "react";
import Graph, { TWIN3D } from "../../modules/Graph/Graph";
import { Math3D, HyperbolicParaboloid, HyperbolicCylinder, EllipticalCylinder, ParabolicCylinder, Ellipsoid, Pyramid, Cone, Cube, Sphere, Torus, Point, Edge, Polygon, EDistance, Surface, Light } from "../../modules/Math3D"
import Checkbox3D from "./Checkbox3D/Checkbox3D";
import Select3D from "./Select3D/Select3D";

export enum ECustom {
    canMove = 'canMove',
    mouse0 = 'mouse0',
    mouse1 = 'mouse1',
    mouse2 = 'mouse2',
    drawPoints = 'drawPoints',
    drawEdges = 'drawEdges',
    drawPolygons = 'drawPolygons'
}

export enum EScene {
    hyperbolicParaboloid = 'hyperbolicParaboloid',
    hyperbolicCylinder = 'hyperbolicCylinder',
    ellipticalCylinder = 'ellipticalCylinder',
    parabolicCylinder = 'parabolicCylinder',
    ellipsoid = 'ellipsoid',
    pyramid = 'pyramid',
    cone = 'cone',
    cube = 'cube',
    sphere = 'sphere',
    torus = 'torus'
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
    const ligth = new Light(-40, 15, 0, 1500);
    const canvasId = 'graph3DCanvas';
    let scene: Surface[] = [];
    let dx: number = 0;
    let dy: number = 0;

    const custom = {
        [ECustom.canMove]: false,
        [ECustom.mouse0]: false,
        [ECustom.mouse1]: false,
        [ECustom.mouse2]: false,
        [ECustom.drawPoints]: false,
        [ECustom.drawEdges]: false,
        [ECustom.drawPolygons]: true
    }

    const scenes = {
        [EScene.hyperbolicParaboloid]: [new HyperbolicParaboloid()],
        [EScene.hyperbolicCylinder]: [new HyperbolicCylinder()],
        [EScene.ellipticalCylinder]: [new EllipticalCylinder()],
        [EScene.parabolicCylinder]: [new ParabolicCylinder()],
        [EScene.ellipsoid]: [new Ellipsoid()],
        [EScene.pyramid]: [new Pyramid()],
        [EScene.cone]: [new Cone()],
        [EScene.cube]: [new Cube()],
        [EScene.sphere]: [new Sphere()],
        [EScene.torus]: [new Torus()]
    }

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
        const delta = (event.deltaY < 0) ? 1.2 : 0.8;
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


    const renderScene = (fps: number): void => {
        if (graph) {
            graph.clear();

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

            if (custom.drawPoints) {
                scene.forEach((surface: Surface) => {
                    surface.points.forEach((point: Point) => {
                        if (graph)
                            graph.point(math3D.xs(point), math3D.ys(point));
                    });
                });
            }

            graph.text(WIN.left, WIN.bottom, fps.toString());
        }
    }

    const changeValue = (flag: ECustom, value: boolean): void => {
        custom[flag] = value;
    }

    const changeScene = (flag: EScene) => {
        scene = scenes[flag];
    }

    useEffect(() => {
        graph = new Graph({
            id: canvasId,
            width: 600,
            height: 600,
            WIN,
            callbacks: { wheel, mousemove, mouseleave, mouseup, mousedown }
        });

        const interval = setInterval(() => {
            scene.forEach(surface => surface.doAnimation(math3D));
        }, 50);

        let currentFPS = 0;
        let FPS = 0;
        let timestamp = Date.now();
        let idLoop: number;

        const animLoop = () => {
            FPS++;
            const currentTimestamp = Date.now();
            if (currentTimestamp - timestamp >= 1000) {
                timestamp = currentTimestamp;
                currentFPS = FPS;
                FPS = 0;
            }

            renderScene(currentFPS);

            idLoop = window.requestAnimationFrame(animLoop);
        }

        animLoop();

        return () => {
            graph = null;
            window.cancelAnimationFrame(idLoop);
            clearInterval(interval);
        }
    }, [graph]);

    changeScene(EScene.hyperbolicParaboloid);

    return (<div>
        <canvas id={canvasId}></canvas>
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
        <Select3D
            scenes={[
                { scene: EScene.hyperbolicParaboloid, text: "Гиперболический параболоид" },
                { scene: EScene.hyperbolicCylinder, text: "Гиперболический цилиндр" },
                { scene: EScene.ellipticalCylinder, text: "Эллиптический цилиндр" },
                { scene: EScene.parabolicCylinder, text: "Параболический цилиндр" },
                { scene: EScene.ellipsoid, text: "Элипсоид" },
                { scene: EScene.pyramid, text: "Пирамида" },
                { scene: EScene.cone, text: "Конус" },
                { scene: EScene.cube, text: "Куб" },
                { scene: EScene.sphere, text: "Сфера" },
                { scene: EScene.torus, text: "Тор" }
            ]}
            id="selectedSurface"
            changeScene={changeScene}
        />
    </div>);
}

export default Graph3D;

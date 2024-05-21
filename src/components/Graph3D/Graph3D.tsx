import React, { useEffect } from "react";
import Graph, { TWIN3D } from "../../modules/Graph/Graph";
import Point from "../../modules/Math3D/entities/Point";
import Math3D, { ETransform } from "../../modules/Math3D/Math3D";
import Surface from "../../modules/Math3D/entities/Surface";
import Sphere from "../../modules/Math3D/surfaces/Sphere";
import Light from "../../modules/Math3D/entities/Light";
import Edge from "../../modules/Math3D/entities/Edge";
import Polygon, { EDistance } from "../../modules/Math3D/entities/Polygon";

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

    let canMove: boolean = false;
    let mouse0: boolean = false;
    let mouse1: boolean = false;
    let mouse2: boolean = false;
    let drawPoints: boolean = false;
    let drawEdges: boolean = false;
    let drawPolygons: boolean = true;

    const SolarSystem = (): Surface[] => {
        const Sun = new Sphere(3.5, '#FFCC00');
        Sun.addAnimation(ETransform.rotateOz, -0.01);

        const Earth = new Sphere(2, '#22FF33', new Point(12, 0, 0));
        Earth.addAnimation(ETransform.rotateOz, 0.06, new Point);

        const Moon = new Sphere(1, '#454545', new Point(8, 0, 0));
        Moon.addAnimation(ETransform.rotateOz, 0.6, Earth.center);

        return [Sun, Earth, Moon];
    }

    let scene: Surface[] = SolarSystem();
    let dx: number = 0;
    let dy: number = 0;

    const mouseup = (event: MouseEvent): void => {
        switch (event.button) {
            case 0:
                mouse0 = false;
                break;
            case 1:
                mouse1 = false;
                break;
            case 2:
                mouse2 = false;
                break;
        }
    }

    const mouseleave = (): void => {
        mouse0 = false;
        mouse1 = false;
        mouse2 = false;
    }

    const mousedown = (event: MouseEvent): void => {
        switch (event.button) {
            case 0:
                mouse0 = true;
                break;
            case 1:
                mouse1 = true;
                break;
            case 2:
                mouse2 = true;
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
        if (mouse0 || mouse2) {
            const gradus = Math.PI / 180 / 4;
            const matrix = math3D.getTransform(
                math3D.rotateOx((dy - event.offsetY) * gradus),
                mouse2 ?
                    math3D.rotateOz((dx - event.offsetX) * gradus) :
                    math3D.rotateOy((dx - event.offsetX) * gradus)
            );
            scene.forEach((surface: Surface) => {
                surface.points.forEach((point: Point) => math3D.transform(matrix, point))
                math3D.transform(matrix, surface.center);
            });
        }
        if (mouse1) {
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

            if (drawPoints) {
                scene.forEach((surface: Surface) => {
                    surface.points.forEach((point: Point) => {
                        if (graph)
                            graph.point(math3D.xs(point), math3D.ys(point));
                    });
                });
            }

            if (drawEdges) {
                scene.forEach((surface: Surface) => {
                    surface.edges.forEach((edge: Edge) => {
                        const point1 = surface.points[edge.p1];
                        const point2 = surface.points[edge.p2];
                        if (graph)
                            graph.line(math3D.xs(point1), math3D.ys(point1), math3D.xs(point2), math3D.ys(point2));
                    });
                });
            }

            if (drawPolygons) {
                const polygons: Polygon[] = [];
                scene.forEach((surface, index) => {
                    math3D.calcDistance(surface, WIN.camera, EDistance.distance);
                    math3D.calcDistance(surface, ligth, EDistance.lumen);
                    surface.polygons.forEach(polygon => {
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

    return (<div>
        <canvas id='graph3DCanvas'></canvas>
        <div>
            <input type="checkbox" data-custom="drawPoints">Точки</input>
            <input type="checkbox" data-custom="drawEdges" id="drawEdges">Рёбра</input>
            <input type="checkbox" data-custom="drawPolygons" id="drawPolygons" checked>Полигоны</input>
        </div>
        <select id="selectedSurface">
            <option value="cube">Куб</option>
            <option value="sphere">Сфера</option>
            <option value="torus">Тор</option>
        </select>
    </div>);
}



/*addEventListeners() {
    document.querySelectorAll('.customScene').forEach(input => {
        input.addEventListener('click', event => {
            this[event.target.dataset.custom] = event.target.checked;
        });
    });
    document.getElementById("drawPoints").addEventListener(
        'click',
        event => this.drawPoints = event.target.checked
    );
    document.getElementById("drawEdges").addEventListener(
        'click',
        event => this.drawEdges = event.target.checked
    );
    document.getElementById("drawPolygons").addEventListener(
        'click',
        event => this.drawPolygons = event.target.checked
    );
    document.getElementById("selectedSurface").addEventListener(
        'change',
        event => {
            this.scene = [this.surfaces[event.target.value]()];
        },
        false
    );
}*/

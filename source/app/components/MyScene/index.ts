import {
    Mesh,
    MeshLambertMaterial,
    OrthographicCamera,
    Renderer,
    Scene,
    SmoothShading,
    VertexColors,
} from "three";
import { getRandomInt, makeCube } from "../../../utils/index";
import { ChristmasTree } from "../ChristmasTree/index";
import { Clouds } from "../Clouds/index";
import { Deer } from "../Deer/index";
import { Fireworks } from "../Fireworks/index";
import { Floor } from "../Floor/index";
import { House } from "../House/index";
import { Lamp } from "../Lamp/index";
import { Santa } from "../Santa/index";
import { Snowman } from "../Snowman/index";
import { Tree } from "../Tree/index";
import { cloudsMap } from "./cloudsMap";
import { objectsMap } from "./objectsMap";

export class MyScene {
    public cubeSize: number;
    public animationId: number;
    public renderer: Renderer;
    public camera: OrthographicCamera;
    public scene: Scene;
    constructor(scene: Scene, camera: OrthographicCamera, renderer: Renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.animationId = 0;
        this.cubeSize = 150;
    }
    public getCenterMap() {
        return {
            x: objectsMap.length / 2,
            y: objectsMap[0].length / 2,
        };
    }
    public draw() {
        const floor = new Floor(this.scene, 0, 0, 0, this.cubeSize);
        floor.draw();
        const house = new House(this.scene, 2, 4, -1, this.cubeSize);
        house.draw();
        const rotationLamp = [0, 90];
        let rotationIterator = 0;
        for (let i = 0; i < objectsMap.length; i++) {
            for (let j = 0; j < objectsMap[i].length; j++) {
                switch (objectsMap[i][j]) {
                    case 1:
                        const tree = new Tree(
                            this.scene,
                            i - this.getCenterMap().x,
                            2,
                            j - this.getCenterMap().y,
                            this.cubeSize,
                        );
                        tree.draw();
                        break;
                    case 2:
                        const deer = new Deer(
                            this.scene,
                            i - this.getCenterMap().x,
                            2,
                            j - this.getCenterMap().y,
                            this.cubeSize,
                        );
                        deer.draw();
                        break;
                    case 3:
                        const christmasTree = new ChristmasTree(
                            this.scene,
                            i - this.getCenterMap().x,
                            2,
                            j - this.getCenterMap().y,
                            this.cubeSize * 1.5,
                        );
                        christmasTree.draw();
                        break;
                    case 4:
                        const snowman = new Snowman(
                            this.scene,
                            i - this.getCenterMap().x,
                            2,
                            j - this.getCenterMap().y,
                            this.cubeSize,
                        );
                        snowman.draw();
                        break;
                    case 5:
                        const size = getRandomInt(25, 100);
                        const mainMaterial = new MeshLambertMaterial({
                            color: 0xffffff,
                            shading: SmoothShading,
                            vertexColors: VertexColors,
                        });
                        const cube = new Mesh(
                            makeCube(size, size, size, 0xffffff),
                            mainMaterial,
                        );
                        cube.position.set(
                            (i - this.getCenterMap().x) * this.cubeSize,
                            2 * this.cubeSize - size / 2,
                            (j - this.getCenterMap().y) * this.cubeSize,
                        );
                        this.scene.add(cube);
                        break;
                    case 6:
                        const lamp = new Lamp(
                            this.scene,
                            i - this.getCenterMap().x,
                            2,
                            j - this.getCenterMap().y,
                            this.cubeSize,
                            rotationLamp[rotationIterator],
                        );
                        lamp.draw();
                        rotationIterator++;
                        break;
                    case 7:
                        const firewokrs = new Fireworks(
                            this.scene,
                            i - this.getCenterMap().x,
                            3,
                            j - this.getCenterMap().y,
                            this.cubeSize - 50,
                        );
                        firewokrs.draw();
                        break;
                    case 8:
                        const santa = new Santa(
                            this.scene,
                            i - this.getCenterMap().x,
                            2,
                            j - this.getCenterMap().y,
                            this.cubeSize,
                        );
                        santa.draw();
                        break;
                }
            }
        }
        for (let i = 0; i < cloudsMap.length; i++) {
            for (let j = 0; j < cloudsMap[i].length; j++) {
                switch (cloudsMap[i][j]) {
                    case 1:
                        const clouds = new Clouds(
                            this.scene,
                            i - this.getCenterMap().x,
                            9,
                            j - this.getCenterMap().y,
                            this.cubeSize,
                        );
                        clouds.draw();
                        clouds.animate();
                        break;
                }
            }
        }
    }
    public animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}

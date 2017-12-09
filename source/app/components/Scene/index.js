import * as THREE from "three";
import { Floor } from "../Floor/index";
import { House } from "../House/index";
import { Tree } from "../Tree/index";
import { TweenMax } from "gsap";
import objectsMap from "./objectsMap";

export class Scene {
    constructor(scene, light, camera, renderer) {
        this.scene = scene;
        this.light = light;
        this.camera = camera;
        this.renderer = renderer;
        this.animationId = 0;
        this.cubeSize = 150;
    }
    getCenterMap() {
        return {
            x: objectsMap.length / 2,
            y: objectsMap[0].length / 2,
        };
    }
    draw() {
        const floor = new Floor(this.scene, 0, 0, 0, this.cubeSize);
        floor.draw();
        const house = new House(this.scene, 2, 4, -1, this.cubeSize);
        house.draw();
        for (let i = 0; i < objectsMap.length; i++) {
            for (let j = 0; j < objectsMap[i].length; j++) {
                switch (objectsMap[i][j]) {
                    case 1:
                        let tree = new Tree(
                            this.scene,
                            i - this.getCenterMap().x,
                            2,
                            j - this.getCenterMap().y,
                            this.cubeSize,
                        );
                        tree.draw();
                        break;
                }
            }
        }
    }
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}

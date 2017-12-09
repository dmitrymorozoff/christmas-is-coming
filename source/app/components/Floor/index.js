import * as THREE from "three";
import floorMap from "./floorMap";
import { makeCube } from "../../../utils/index";

export class Floor {
    constructor(scene, x = 0, y = 0, z = 0, cubeSize) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.z = z;
        this.cubeSize = cubeSize;
    }
    getCenterMap() {
        return {
            x: floorMap.length / 2 * this.cubeSize,
            y: floorMap[0].length / 2 * this.cubeSize,
        };
    }
    generateMergedObject(geometry, i, j, centerX, centerY, color) {
        let cubeGeometry = makeCube(
            this.cubeSize,
            this.cubeSize,
            this.cubeSize,
            color,
        );
        let x = i * this.cubeSize - centerX;
        let y = 1 * this.cubeSize;
        let z = j * this.cubeSize - centerY;
        cubeGeometry.translate(x, y, z);
        geometry.merge(cubeGeometry, cubeGeometry.matrix);
        cubeGeometry.translate(-x, -y, -z);
    }
    draw() {
        let mergedFloorGeometry = new THREE.Geometry();
        for (let i = 0; i < floorMap.length; i++) {
            for (let j = 0; j < floorMap[i].length; j++) {
                switch (floorMap[i][j]) {
                    case 1:
                        this.generateMergedObject(
                            mergedFloorGeometry,
                            i,
                            j,
                            this.getCenterMap().x,
                            this.getCenterMap().y,
                            0xffffff,
                        );
                        break;
                }
            }
        }
        const floorMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.SmoothShading,
            vertexColors: THREE.VertexColors,
        });
        const floor = new THREE.Mesh(mergedFloorGeometry, floorMaterial);
        this.scene.add(floor);
    }
}

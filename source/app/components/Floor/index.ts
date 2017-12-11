import {
    Geometry,
    Mesh,
    MeshLambertMaterial,
    Scene,
    SmoothShading,
    VertexColors,
} from "three";
import { makeCube } from "../../../utils/index";
import { floorMap } from "./floorMap";

export class Floor {
    public cubeSize: number;
    public z: number;
    public y: number;
    public x: number;
    public scene: Scene;
    constructor(
        scene: Scene,
        x: number = 0,
        y: number = 0,
        z: number = 0,
        cubeSize: number,
    ) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.z = z;
        this.cubeSize = cubeSize;
    }
    public getCenterMap() {
        return {
            x: floorMap.length / 2 * this.cubeSize,
            y: floorMap[0].length / 2 * this.cubeSize,
        };
    }
    public generateMergedObject(
        geometry: Geometry,
        i: number,
        j: number,
        centerX: number,
        centerY: number,
        color: number,
    ) {
        const cubeGeometry = makeCube(
            this.cubeSize,
            this.cubeSize,
            this.cubeSize,
            color,
        );
        const x = i * this.cubeSize - centerX;
        const y = 1 * this.cubeSize;
        const z = j * this.cubeSize - centerY;
        cubeGeometry.translate(x, y, z);
        geometry.merge(cubeGeometry);
        cubeGeometry.translate(-x, -y, -z);
    }
    public draw() {
        const mergedFloorGeometry = new Geometry();
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
        const floorMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        const floor = new Mesh(mergedFloorGeometry, floorMaterial);
        floor.receiveShadow = true;
        this.scene.add(floor);
    }
}

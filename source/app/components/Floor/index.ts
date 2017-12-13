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
    public color: {
        white: number;
        purple: number;
        orange: number;
        road: number;
    };
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
        this.color = {
            white: 0xffffff,
            purple: 0x969edd,
            orange: 0xd8af81,
            road: 0x505050,
        };
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
        let color: number = 0;
        let flag: boolean = false;
        for (let i = 0; i < floorMap.length; i++) {
            for (let j = 0; j < floorMap[i].length; j++) {
                color = 0;
                flag = false;
                switch (floorMap[i][j]) {
                    case 1:
                        color = this.color.white;
                        flag = true;
                        break;
                    case 2:
                        color = this.color.purple;
                        flag = true;

                        break;
                    case 3:
                        color = this.color.orange;
                        flag = true;
                        break;
                    case 4:
                        color = this.color.road;
                        flag = true;
                        break;
                }
                if (flag) {
                    this.generateMergedObject(
                        mergedFloorGeometry,
                        i,
                        j,
                        this.getCenterMap().x,
                        this.getCenterMap().y,
                        color,
                    );
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

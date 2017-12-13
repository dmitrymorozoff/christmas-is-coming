import {
    Group,
    Mesh,
    MeshLambertMaterial,
    Scene,
    SmoothShading,
    VertexColors,
} from "three";
import { makeCube } from "../../../utils/index";

export class Lamp {
    public lamp: Group;
    public color: { trunk: number; trunkTop: number; bottom: number };
    public z: number;
    public y: number;
    public x: number;
    public cubeSize: number;
    public scene: Scene;
    constructor(
        scene: Scene,
        x: number = 0,
        y: number = 0,
        z: number = 0,
        cubeSize: number,
    ) {
        this.scene = scene;
        this.cubeSize = cubeSize;
        this.x = x * this.cubeSize;
        this.y = y * this.cubeSize;
        this.z = z * this.cubeSize;
        this.color = {
            trunk: 0x868d93,
            trunkTop: 0x535151,
            bottom: 0xffffff,
        };
        this.lamp = new Group();
    }
    public draw() {
        const mainMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        const trunkGeometry = makeCube(
            this.cubeSize / 2.5,
            this.cubeSize,
            this.cubeSize / 2.5,
            this.color.trunk,
        );
        const trunkTopGeometry = makeCube(
            this.cubeSize / 5,
            this.cubeSize * 5,
            this.cubeSize / 5,
            this.color.trunkTop,
        );
        const capGeometry = makeCube(
            this.cubeSize * 1.5,
            this.cubeSize / 5,
            this.cubeSize / 5,
            this.color.trunkTop,
        );
        const capTopGeometry = makeCube(
            this.cubeSize * 1.25,
            this.cubeSize / 5,
            this.cubeSize / 2,
            this.color.trunkTop,
        );
        const bottomCubeGeometry = makeCube(
            this.cubeSize / 1.25,
            this.cubeSize / 2,
            this.cubeSize / 1.25,
            this.color.bottom,
        );
        const bottomCube = new Mesh(bottomCubeGeometry, mainMaterial);
        bottomCube.position.y = -this.cubeSize / 2;
        const trunk = new Mesh(trunkGeometry, mainMaterial);
        trunk.position.y = this.cubeSize / 4;
        const trunkTop = new Mesh(trunkTopGeometry, mainMaterial);
        const cap = new Mesh(capGeometry, mainMaterial);
        const capTop = new Mesh(capTopGeometry, mainMaterial);
        cap.position.set(-this.cubeSize / 1.6, this.cubeSize * 3.5, 0);
        capTop.position.set(-this.cubeSize - 15, this.cubeSize * 3.5, 0);
        trunkTop.position.y = this.cubeSize;
        this.lamp.add(trunk);
        this.lamp.add(trunkTop);
        this.lamp.add(cap);
        this.lamp.add(capTop);
        this.lamp.add(bottomCube);
        this.lamp.position.set(this.x, this.y, this.z);
        this.scene.add(this.lamp);
    }
}

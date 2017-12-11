import {
    Group,
    Mesh,
    MeshLambertMaterial,
    Scene,
    SmoothShading,
    VertexColors,
} from "three";
import { makeCube } from "../../../utils/index";

export class Tree {
    public tree: Group;
    public color: { trunk: number; cup: number };
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
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = {
            trunk: 0x76543b,
            cup: 0xffffff,
        };
        this.tree = new Group();
    }
    public draw() {
        const mainMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        const trunkGeometry = makeCube(
            this.cubeSize / 3,
            this.cubeSize,
            this.cubeSize / 3,
            this.color.trunk,
        );
        const trunk = new Mesh(trunkGeometry, mainMaterial);

        const cupGeometry = makeCube(
            this.cubeSize + this.cubeSize / 4,
            this.cubeSize,
            this.cubeSize + this.cubeSize / 4,
            this.color.cup,
        );
        const bottomCubeGeometry = makeCube(
            this.cubeSize,
            this.cubeSize / 4,
            this.cubeSize,
            this.color.cup,
        );
        const cup = new Mesh(cupGeometry, mainMaterial);
        const bottomCube = new Mesh(bottomCubeGeometry, mainMaterial);
        cup.position.y = this.cubeSize;
        bottomCube.position.y = -this.cubeSize / 2;
        this.tree.add(trunk);
        this.tree.add(bottomCube);
        this.tree.add(cup);
        this.tree.position.set(
            this.x * this.cubeSize,
            this.y * this.cubeSize + this.cubeSize / 8,
            this.z * this.cubeSize,
        );
        this.scene.add(this.tree);
    }
}

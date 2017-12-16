import {
    Group,
    Math,
    Mesh,
    MeshLambertMaterial,
    Scene,
    SmoothShading,
    VertexColors,
} from "three";
import { makeCube } from "../../../utils/index";

export class Snowman {
    public rotation: number;
    public snowman: Group;
    public color: { main: number; nose: number; hand: number };
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
        rotation = 0,
    ) {
        this.scene = scene;
        this.cubeSize = cubeSize;
        this.x = x * this.cubeSize;
        this.y = y * this.cubeSize;
        this.z = z * this.cubeSize;
        this.color = {
            main: 0xffffff,
            nose: 0xff0000,
            hand: 0x76533d,
        };
        this.rotation = rotation;
        this.snowman = new Group();
    }
    public draw() {
        const mainMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        let size: number = this.cubeSize;
        for (let i = 0; i < 3; i++) {
            const mainGeometry = makeCube(size, size, size, this.color.main);
            const main = new Mesh(mainGeometry, mainMaterial);
            main.position.y = i * this.cubeSize / 1.5;
            this.snowman.add(main);
            size -= 35;
        }
        const nose = new Mesh(
            makeCube(
                this.cubeSize / 4,
                this.cubeSize / 8,
                this.cubeSize / 8,
                this.color.nose,
            ),
            mainMaterial,
        );
        const handGeometry = makeCube(
            this.cubeSize / 8,
            this.cubeSize / 8,
            this.cubeSize * 1.8,
            this.color.hand,
        );
        const leftHand = new Mesh(handGeometry, mainMaterial);
        leftHand.position.set(0, 0.9 * this.cubeSize, 0);
        const rightHand = new Mesh(handGeometry, mainMaterial);
        rightHand.position.set(0, 0.9 * this.cubeSize, 0);
        nose.position.set(-this.cubeSize / 3, 1.35 * this.cubeSize, 0);
        this.snowman.add(nose);
        this.snowman.add(leftHand);
        this.snowman.add(rightHand);
        this.snowman.rotation.y = Math.degToRad(this.rotation);
        this.snowman.position.set(this.x, this.y, this.z);
        this.scene.add(this.snowman);
    }
}

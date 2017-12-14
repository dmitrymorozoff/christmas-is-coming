import {
    ConeGeometry,
    Geometry,
    Group,
    Math,
    Mesh,
    MeshLambertMaterial,
    Scene,
    SmoothShading,
    VertexColors,
} from "three";
import { makeCube } from "../../../utils/index";

export class Fireworks {
    public fireworks: Group;
    public color: {
        white: number;
        purple: number;
        orange: number;
        red: number;
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
        this.cubeSize = cubeSize;
        this.x = x * this.cubeSize;
        this.y = y * this.cubeSize;
        this.z = z * this.cubeSize;
        this.color = {
            white: 0xffffff,
            purple: 0x9d67db,
            orange: 0xffb932,
            red: 0xf84237,
        };
        this.fireworks = new Group();
    }
    public generateMergedObject(
        geometry: Geometry,
        width: number,
        height: number,
        depth: number,
        x: number,
        y: number,
        z: number,
        color: number,
    ) {
        const cubeGeometry = makeCube(width, height, depth, color);
        cubeGeometry.translate(x, y, z);
        geometry.merge(cubeGeometry);
        cubeGeometry.translate(-x, -y, -z);
    }
    public draw() {
        const mergedFireworksGeometry = new Geometry();
        let posY = 0;
        for (let i = 1; i <= 7; i++) {
            let color = 0;
            if (i % 2 === 0) {
                color = this.color.purple;
            } else {
                color = this.color.orange;
            }
            this.generateMergedObject(
                mergedFireworksGeometry,
                this.cubeSize / 1.5,
                this.cubeSize / 4,
                this.cubeSize / 1.5,
                0,
                0 + posY,
                0,
                color,
            );
            posY += this.cubeSize / 4;
        }
        const mainMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        const coneMaterial = new MeshLambertMaterial({
            color: this.color.red,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        const bottomCubeGeometry = makeCube(
            this.cubeSize / 3,
            this.cubeSize,
            this.cubeSize / 3,
            this.color.red,
        );
        const topCubeGeometry = makeCube(
            this.cubeSize / 1.15,
            this.cubeSize / 6,
            this.cubeSize / 1.15,
            this.color.red,
        );
        const capGeometry = new ConeGeometry(
            this.cubeSize / 1.75,
            this.cubeSize / 2,
            4,
        );
        const bottomCube = new Mesh(bottomCubeGeometry, mainMaterial);
        const cap = new Mesh(capGeometry, coneMaterial);
        const topCube = new Mesh(topCubeGeometry, mainMaterial);
        bottomCube.position.y = -this.cubeSize / 2;
        topCube.position.y = this.cubeSize * 1.75;
        cap.position.y = this.cubeSize * 2.1;
        cap.rotation.y = Math.degToRad(45);
        const fireworksMain = new Mesh(mergedFireworksGeometry, mainMaterial);
        fireworksMain.receiveShadow = true;
        this.fireworks.add(fireworksMain);
        this.fireworks.add(bottomCube);
        this.fireworks.add(topCube);
        this.fireworks.add(cap);
        this.fireworks.position.set(this.x - this.cubeSize * 2, this.y, this.z);
        this.scene.add(this.fireworks);
    }
}

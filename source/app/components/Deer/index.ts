import {
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

export class Deer {
    public deer: any;
    public color: {
        main: number;
        paws: number;
        head: number;
        horns: number;
        nose: number;
        brown: number;
    };
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
            main: 0x76543b,
            paws: 0x76543b,
            head: 0x76543b,
            horns: 0xfbb37f,
            nose: 0xe50000,
            brown: 0x432314,
        };
        this.deer = new Group();
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
        const mergedHornsGeometry = new Geometry();
        const hornsArray = [
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 1],
        ];
        for (let i = 0; i < hornsArray.length; i++) {
            for (let j = 0; j < hornsArray[i].length; j++) {
                switch (hornsArray[i][j]) {
                    case 1:
                        this.generateMergedObject(
                            mergedHornsGeometry,
                            this.cubeSize / 6,
                            this.cubeSize / 8,
                            this.cubeSize / 10,
                            i * this.cubeSize / 6,
                            j * this.cubeSize / 8,
                            0,
                            this.color.horns,
                        );
                        break;
                }
            }
        }
        const mainMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        const mainGeometry = makeCube(
            this.cubeSize * 2,
            this.cubeSize,
            this.cubeSize,
            this.color.main,
        );
        const headGeometry = makeCube(
            this.cubeSize / 1.15,
            this.cubeSize / 2,
            this.cubeSize / 1.8,
            this.color.head,
        );
        const noseGeometry = makeCube(
            this.cubeSize / 6,
            this.cubeSize / 6,
            this.cubeSize / 6,
            this.color.nose,
        );
        const main = new Mesh(mainGeometry, mainMaterial);
        main.position.y = this.cubeSize / 1.5;
        const mergedPawsGeometry = new Geometry();
        const pawsPositions = [
            {
                x: this.cubeSize / 1.5,
                y: 0,
                z: this.cubeSize / 4,
            },
            {
                x: this.cubeSize / 1.5,
                y: 0,
                z: -this.cubeSize / 4,
            },
            {
                x: -this.cubeSize / 1.5,
                y: 0,
                z: this.cubeSize / 4,
            },
            {
                x: -this.cubeSize / 1.5,
                y: 0,
                z: -this.cubeSize / 4,
            },
            {
                x: -this.cubeSize / 1.5,
                y: this.cubeSize * 1.25,
                z: 0,
            },
        ];
        for (const position of pawsPositions) {
            this.generateMergedObject(
                mergedPawsGeometry,
                this.cubeSize / 5,
                this.cubeSize,
                this.cubeSize / 5,
                position.x,
                position.y,
                position.z,
                this.color.paws,
            );
            this.generateMergedObject(
                mergedPawsGeometry,
                this.cubeSize / 4.8,
                this.cubeSize / 4.8,
                this.cubeSize / 4.8,
                position.x,
                position.y - this.cubeSize / 2.5,
                position.z,
                this.color.brown,
            );
        }
        const paws = new Mesh(mergedPawsGeometry, mainMaterial);
        const head = new Mesh(headGeometry, mainMaterial);
        const nose = new Mesh(noseGeometry, mainMaterial);
        const hornsRight = new Mesh(mergedHornsGeometry, mainMaterial);
        const hornsLeft = new Mesh(mergedHornsGeometry, mainMaterial);
        hornsLeft.position.set(
            -this.cubeSize / 2,
            this.cubeSize * 2.25,
            -this.cubeSize / 6,
        );
        hornsLeft.rotation.z = Math.degToRad(90);
        hornsRight.position.set(
            -this.cubeSize / 2,
            this.cubeSize * 2.25,
            this.cubeSize / 6,
        );
        hornsRight.rotation.z = Math.degToRad(90);
        head.position.set(-this.cubeSize / 1.1, this.cubeSize * 2, 0);
        nose.position.set(-this.cubeSize * 1.3, this.cubeSize * 2.225, 0);
        this.deer.add(main);
        this.deer.add(paws);
        this.deer.add(hornsRight);
        this.deer.add(hornsLeft);
        this.deer.add(nose);
        this.deer.add(head);
        this.deer.position.set(this.x, this.y, this.z);
        this.scene.add(this.deer);
    }
}

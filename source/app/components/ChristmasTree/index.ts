import {
    ConeGeometry,
    Group,
    Math,
    Mesh,
    MeshLambertMaterial,
    Scene,
    SmoothShading,
    VertexColors,
} from "three";
import { makeCube } from "../../../utils/index";
import { getRandomInt } from "../../../utils/index";

export class ChristmasTree {
    public tree: Group;
    public color: {
        tree: number;
        trunk: number;
        bottom: number;
        toysColor: number[];
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
            tree: 0x00845A,
            trunk: 0x76533d,
            bottom: 0xffffff,
            toysColor: [0x137ec2, 0xf6a131, 0xc91c26],
        };
        this.tree = new Group();
    }
    public draw() {
        const toysPositions = [
            [
                [1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0],
                [1, 0, 0, 0, 1],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 1],
            ],
            [
                [0, 0, 1, 0, 1],
                [0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1],
            ],
        ];
        const toysY = [this.cubeSize / 3.3, this.cubeSize * 0.9];
        const mainMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        for (let i = 0; i < toysPositions.length; i++) {
            for (let j = 0; j < toysPositions[i].length; j++) {
                for (let k = 0; k < toysPositions[i][j].length; k++) {
                    switch (toysPositions[i][j][k]) {
                        case 1:
                            const toyGeometry = makeCube(
                                this.cubeSize / 8,
                                this.cubeSize / 8,
                                this.cubeSize / 8,
                                this.color.toysColor[
                                    getRandomInt(0, this.color.toysColor.length)
                                ],
                            );
                            const toy = new Mesh(toyGeometry, mainMaterial);
                            toy.position.set(
                                k * this.cubeSize / 7 - this.cubeSize / 3.3,
                                toysY[i],
                                j * this.cubeSize / 7 - this.cubeSize / 3.3,
                            );
                            this.tree.add(toy);
                            break;
                    }
                }
            }
        }
        const trunkGeometry = makeCube(
            this.cubeSize / 6,
            this.cubeSize / 1.25,
            this.cubeSize / 6,
            this.color.trunk,
        );
        const bottomCubeGeometry = makeCube(
            this.cubeSize / 2,
            this.cubeSize / 6,
            this.cubeSize / 2,
            this.color.bottom,
        );
        const mainGeometry = new ConeGeometry(
            this.cubeSize / 2,
            this.cubeSize,
            4,
        );
        const treeMaterial = new MeshLambertMaterial({
            color: this.color.tree,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        const treeBottom = new Mesh(mainGeometry, treeMaterial);
        treeBottom.rotation.y = Math.degToRad(45);

        const treeCenter = new Mesh(mainGeometry, treeMaterial);
        treeCenter.rotation.y = Math.degToRad(45);
        const cubeSize = this.cubeSize / 4;
        treeBottom.position.y += cubeSize * 2.25;
        treeCenter.position.y += cubeSize * 4.5;

        const trunk = new Mesh(trunkGeometry, mainMaterial);
        const bottomCube = new Mesh(bottomCubeGeometry, mainMaterial);
        bottomCube.position.y = -this.cubeSize / 2;

        this.tree.add(treeBottom);
        this.tree.add(treeCenter);
        this.tree.add(bottomCube);
        this.tree.add(trunk);
        this.tree.castShadow = true;
        this.tree.position.set(this.x, this.y - this.cubeSize / 2.25, this.z);
        this.scene.add(this.tree);
    }
}

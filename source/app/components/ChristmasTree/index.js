import * as THREE from "three";
import { makeCube } from "../../../utils/index";
import getRandomInt from "../../../utils/index";

export class ChristmasTree {
    constructor(scene, x = 0, y = 0, z = 0, cubeSize) {
        this.scene = scene;
        this.cubeSize = cubeSize;
        this.x = x * this.cubeSize;
        this.y = y * this.cubeSize;
        this.z = z * this.cubeSize;
        this.color = {
            tree: 0x16996d,
            trunk: 0x76533d,
            bottom: 0xffffff,
            toysColor: [0x137ec2, 0xf6a131, 0xc91c26],
        };
        this.tree = new THREE.Group();
    }
    draw() {
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
        const mainMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.SmoothShading,
            vertexColors: THREE.VertexColors,
        });
        for (let i = 0; i < toysPositions.length; i++) {
            for (let j = 0; j < toysPositions[i].length; j++) {
                for (let k = 0; k < toysPositions[i][j].length; k++) {
                    switch (toysPositions[i][j][k]) {
                        case 1:
                            let toyGeometry = makeCube(
                                this.cubeSize / 8,
                                this.cubeSize / 8,
                                this.cubeSize / 8,
                                this.color.toysColor[
                                    getRandomInt(0, this.color.toysColor.length)
                                ],
                            );
                            let toy = new THREE.Mesh(toyGeometry, mainMaterial);
                            toy.position.set(
                                k * this.cubeSize / 7 - this.cubeSize / 3.3,
                                toysY[i],
                                j * this.cubeSize / 7 - this.cubeSize / 3.3,
                            );
                            console.log("z");
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
        const mainGeometry = new THREE.ConeGeometry(
            this.cubeSize / 2,
            this.cubeSize,
            4,
        );
        const treeMaterial = new THREE.MeshLambertMaterial({
            color: this.color.tree,
            shading: THREE.SmoothShading,
            vertexColors: THREE.VertexColors,
        });
        const treeBottom = new THREE.Mesh(mainGeometry, treeMaterial);
        treeBottom.rotation.y = THREE.Math.degToRad(45);

        const treeCenter = new THREE.Mesh(mainGeometry, treeMaterial);
        treeCenter.rotation.y = THREE.Math.degToRad(45);
        const cubeSize = this.cubeSize / 4;
        treeBottom.position.y += cubeSize * 2.25;
        treeCenter.position.y += cubeSize * 4.5;

        const trunk = new THREE.Mesh(trunkGeometry, mainMaterial);
        const bottomCube = new THREE.Mesh(bottomCubeGeometry, mainMaterial);
        bottomCube.position.y = -this.cubeSize / 2;

        this.tree.add(treeBottom);
        this.tree.add(treeCenter);
        this.tree.add(bottomCube);
        this.tree.add(trunk);
        this.tree.position.set(this.x, this.y - this.cubeSize / 2.25, this.z);
        this.scene.add(this.tree);
    }
}

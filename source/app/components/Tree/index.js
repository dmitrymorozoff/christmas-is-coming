import * as THREE from "three";
import { makeCube } from "../../../utils/index";

export class Tree {
    constructor(scene, x = 0, y = 0, z = 0, cubeSize) {
        this.scene = scene;
        this.cubeSize = cubeSize;
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = {
            trunk: 0x76543b,
            cup: 0xffffff,
        };
        this.tree = new THREE.Group();
    }
    draw() {
        const mainMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.SmoothShading,
            vertexColors: THREE.VertexColors,
        });
        const trunkGeometry = makeCube(
            this.cubeSize / 3,
            this.cubeSize,
            this.cubeSize / 3,
            this.color.trunk,
        );
        const trunk = new THREE.Mesh(trunkGeometry, mainMaterial);

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
        const cup = new THREE.Mesh(cupGeometry, mainMaterial);
        const bottomCube = new THREE.Mesh(bottomCubeGeometry, mainMaterial);
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

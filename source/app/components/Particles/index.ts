import * as THREE from "three";
import { Scene } from "three";
import { getRandomInt } from "../../../utils/index";

export class Particles {
    public particleCount: number;
    public color: number;
    public depth: number;
    public height: number;
    public width: number;
    public scene: Scene;
    constructor(
        scene: Scene,
        width: number,
        height: number,
        depth: number,
        color: number,
        particleCount: number,
    ) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.particleCount = particleCount;
    }
    public draw() {
        const particleMaterial = new THREE.PointCloudMaterial({
            color: this.color,
            size: 9,
        });
        const particleGeometry = new THREE.Geometry();
        let x: number = 0;
        let y: number = 0;
        let z: number = 0;
        for (let i = 0; i < this.particleCount; i++) {
            x = getRandomInt(-this.width, this.width);
            y = getRandomInt(-this.height, this.height);
            z = getRandomInt(-this.depth, this.depth);
            particleGeometry.vertices.push(new THREE.Vector3(x, y, z));
        }
        const pointCloud = new THREE.PointCloud(
            particleGeometry,
            particleMaterial,
        );
        pointCloud.position.y = this.height / 3;
        this.scene.add(pointCloud);
    }
}

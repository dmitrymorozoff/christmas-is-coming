import { Power0, TweenMax } from "gsap";
import {
    Geometry,
    Group,
    Mesh,
    MeshLambertMaterial,
    Scene,
    SmoothShading,
    VertexColors,
} from "three";
import { getRandomInt, makeCube } from "../../../utils/index";

export class Clouds {
    public rotation: number;
    public snowman: Group;
    public color: { clouds: number };
    public z: number;
    public y: number;
    public x: number;
    public clouds: Mesh;
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
            clouds: 0xffffff,
        };
        this.rotation = rotation;
        this.clouds = new Mesh();
    }
    public generateMergedObject(
        geometry: Geometry,
        size: number,
        x: number,
        y: number,
        z: number,
        color: number,
    ) {
        const cubeGeometry = makeCube(size, size, size, color);
        cubeGeometry.translate(x, y, z);
        geometry.merge(cubeGeometry);
        cubeGeometry.translate(-x, -y, -z);
    }
    public draw() {
        const mergedCloudsGeometry = new Geometry();
        const mainMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        const cloudSizes = [
            this.cubeSize + getRandomInt(-100, -20),
            this.cubeSize / 1.5,
            this.cubeSize / 3,
        ];
        for (let i = 0; i < getRandomInt(3, 5); i++) {
            const rand = getRandomInt(1, 4);
            this.generateMergedObject(
                mergedCloudsGeometry,
                cloudSizes[i],
                i * cloudSizes[i] * 1.25,
                0,
                i * cloudSizes[i] * 1.25 + rand * getRandomInt(-50, 150),
                this.color.clouds,
            );
        }
        this.clouds = new Mesh(mergedCloudsGeometry, mainMaterial);
        this.clouds.position.set(this.x, this.y, this.z);
        this.scene.add(this.clouds);
    }
    public animate() {
        const toX = this.x;
        TweenMax.to(this.clouds.position, 3, {
            x: toX + 250,
            repeat: -1,
            yoyo: true,
            ease: Power0.easeNone,
        } as any);
    }
}

import { Power0, TweenMax } from "gsap";
import {
    Color,
    Geometry,
    Group,
    Mesh,
    MeshLambertMaterial,
    Scene,
    SmoothShading,
    VertexColors,
} from "three";
import { makeCube } from "../../../utils/index";
import { getRandomInt } from "../../../utils/index";

export class ChristmasTree {
    public toyMaterial: any;
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
            tree: 0x00845a,
            trunk: 0x76533d,
            bottom: 0xffffff,
            toysColor: [0xf6a131, 0xf6a131, 0xf6a131],
        };
        this.tree = new Group();
        this.toyMaterial = null;
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
        const toysPositions = [
            [
                [1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0],
                [1, 0, 0, 0, 1],
                [0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1],
            ],
            [
                [1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0],
                [1, 0, 0, 0, 1],
                [0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1],
            ],
        ];
        const toysY = [this.cubeSize / 6, this.cubeSize / 2];
        const mainMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        this.toyMaterial = new MeshLambertMaterial({
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
                            const toy = new Mesh(toyGeometry, this.toyMaterial);
                            toy.position.set(
                                k * this.cubeSize / 5.5 - this.cubeSize / 2.75,
                                toysY[i],
                                j * this.cubeSize / 5.5 - this.cubeSize / 2.75,
                            );
                            this.tree.add(toy);
                            break;
                    }
                }
            }
        }
        let posY = this.cubeSize / 6;
        const mergedTreeGeometry = new Geometry();
        let widthCube = this.cubeSize / 1.5;
        for (let i = 1; i <= 3; i++) {
            if (i === 3) {
                widthCube /= 1.5;
            }
            this.generateMergedObject(
                mergedTreeGeometry,
                widthCube,
                this.cubeSize / 4,
                widthCube,
                0,
                0 + posY,
                0,
                this.color.tree,
            );
            posY += this.cubeSize / 3;
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
        const starGeometry = makeCube(
            this.cubeSize / 5,
            this.cubeSize / 3.5,
            this.cubeSize / 5,
            this.color.toysColor[1],
        );
        const trunk = new Mesh(trunkGeometry, mainMaterial);
        const treeCube = new Mesh(mergedTreeGeometry, mainMaterial);
        const bottomCube = new Mesh(bottomCubeGeometry, mainMaterial);
        const star = new Mesh(starGeometry, this.toyMaterial);
        bottomCube.position.y = -this.cubeSize / 2;
        star.position.y = this.cubeSize;
        this.tree.add(bottomCube);
        this.tree.add(trunk);
        this.tree.add(treeCube);
        this.tree.add(star);
        this.tree.castShadow = true;
        this.tree.position.set(
            this.x + this.cubeSize / 2,
            this.y - this.cubeSize / 2.25,
            this.z - this.cubeSize / 3,
        );
        this.scene.add(this.tree);
    }
    public animate() {
        const targetColor = new Color(0xf71b1b);
        TweenMax.to(this.toyMaterial.color, 0.5, {
            r: targetColor.r,
            g: targetColor.g,
            b: targetColor.b,
            repeat: -1,
            yoyo: true,
            ease: Power0.easeInOut,
        } as any);
    }
}

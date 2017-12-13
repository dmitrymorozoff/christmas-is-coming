import {
    Geometry,
    Group,
    Mesh,
    MeshLambertMaterial,
    Scene,
    SmoothShading,
    VertexColors,
} from "three";
import { makeCube } from "../../../utils/index";

export class Santa {
    public color: {
        white: number;
        red: number;
        brown: number;
        black: number;
        face: number;
    };
    public santa: Group;
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
            white: 0xffffff,
            red: 0xdc1a22,
            brown: 0x432314,
            black: 0x050505,
            face: 0xd79a6b,
        };
        this.santa = new Group();
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
    public changePositionMesh(mesh: Mesh, x: number, y: number) {
        mesh.position.y = this.cubeSize * y;
        mesh.position.x = this.cubeSize / x;
    }
    public draw() {
        const mainMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        const mergedLegsGeometry = new Geometry();
        const mergedHandsGeometry = new Geometry();
        const mergedEyeGeometry = new Geometry();
        const legsPositions = [
            {
                x: -this.cubeSize / 4,
                y: 0,
                z: -this.cubeSize / 3,
            },
            {
                x: -this.cubeSize / 4,
                y: 0,
                z: this.cubeSize / 3,
            },
        ];
        const handPositions = [
            {
                x: 0,
                y: this.cubeSize * 1.5,
                z: -this.cubeSize + this.cubeSize / 8,
            },
            {
                x: 0,
                y: this.cubeSize * 1.5,
                z: this.cubeSize - this.cubeSize / 8,
            },
        ];
        const eyePositions = [
            {
                x: -15,
                y: this.cubeSize * 1.57,
                z: -this.cubeSize / 4,
            },
            {
                x: -15,
                y: this.cubeSize * 1.57,
                z: this.cubeSize / 4,
            },
        ];
        for (const position of handPositions) {
            this.generateMergedObject(
                mergedHandsGeometry,
                this.cubeSize / 2.5,
                this.cubeSize,
                this.cubeSize / 2.5,
                position.x,
                position.y,
                position.z,
                this.color.red,
            );
        }
        for (const position of eyePositions) {
            this.generateMergedObject(
                mergedEyeGeometry,
                this.cubeSize / 8,
                this.cubeSize / 8,
                this.cubeSize / 8,
                position.x,
                position.y * 2,
                position.z,
                this.color.black,
            );
        }
        for (const position of legsPositions) {
            this.generateMergedObject(
                mergedLegsGeometry,
                this.cubeSize / 2,
                this.cubeSize / 5,
                this.cubeSize / 5,
                position.x,
                position.y,
                position.z,
                this.color.brown,
            );
            this.generateMergedObject(
                mergedLegsGeometry,
                this.cubeSize / 5,
                this.cubeSize / 2,
                this.cubeSize / 5,
                position.x + this.cubeSize / 8,
                position.y + this.cubeSize / 4,
                position.z,
                this.color.brown,
            );
            this.generateMergedObject(
                mergedLegsGeometry,
                this.cubeSize / 2.5,
                this.cubeSize / 1.25,
                this.cubeSize / 2.5,
                position.x + this.cubeSize / 8,
                position.y + this.cubeSize / 1.5,
                position.z,
                this.color.red,
            );
        }
        const whiteMain = new Mesh(
            makeCube(
                this.cubeSize * 1.5,
                this.cubeSize / 4,
                this.cubeSize * 1.5,
                this.color.white,
            ),
            mainMaterial,
        );
        whiteMain.position.y = this.cubeSize + 15;
        const redMain = new Mesh(
            makeCube(
                this.cubeSize * 1.4,
                this.cubeSize * 1.25,
                this.cubeSize * 1.4,
                this.color.red,
            ),
            mainMaterial,
        );
        redMain.position.y = this.cubeSize + 15 + this.cubeSize / 2;
        const topMain = new Mesh(
            makeCube(
                this.cubeSize,
                this.cubeSize / 4,
                this.cubeSize,
                this.color.white,
            ),
            mainMaterial,
        );
        const centerTopMain = new Mesh(
            makeCube(
                this.cubeSize / 1.7,
                this.cubeSize / 3,
                this.cubeSize,
                this.color.white,
            ),
            mainMaterial,
        );
        const cap = new Mesh(
            makeCube(
                this.cubeSize / 1.7,
                this.cubeSize / 4,
                this.cubeSize,
                this.color.white,
            ),
            mainMaterial,
        );
        const face = new Mesh(
            makeCube(
                this.cubeSize / 1.7,
                this.cubeSize / 1.9,
                this.cubeSize,
                this.color.face,
            ),
            mainMaterial,
        );
        const capTop = new Mesh(
            makeCube(
                this.cubeSize / 2.5,
                this.cubeSize / 2,
                this.cubeSize * 0.8,
                this.color.red,
            ),
            mainMaterial,
        );
        const capCube = new Mesh(
            makeCube(
                this.cubeSize / 4,
                this.cubeSize / 4,
                this.cubeSize / 4,
                this.color.white,
            ),
            mainMaterial,
        );

        topMain.position.y = this.cubeSize * 2.4;
        this.changePositionMesh(centerTopMain, 4.5, 2.7);
        this.changePositionMesh(cap, 4.5, 3.5);
        this.changePositionMesh(capTop, 4.5, 3.8);
        this.changePositionMesh(capCube, 4.5, 4.2);
        this.changePositionMesh(face, 4.5, 3.1);
        const legsBottom = new Mesh(mergedLegsGeometry, mainMaterial);
        const hands = new Mesh(mergedHandsGeometry, mainMaterial);
        const eye = new Mesh(mergedEyeGeometry, mainMaterial);
        this.santa.add(legsBottom);
        this.santa.add(hands);
        this.santa.add(eye);
        this.santa.add(whiteMain);
        this.santa.add(redMain);
        this.santa.add(centerTopMain);
        this.santa.add(topMain);
        this.santa.add(face);
        this.santa.add(cap);
        this.santa.add(capTop);
        this.santa.add(capCube);
        this.santa.position.set(this.x, this.y - this.cubeSize / 2, this.z);
        this.scene.add(this.santa);
    }
}

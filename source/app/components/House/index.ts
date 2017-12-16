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

export class House {
    public house: Group;
    public color: {
        mainHouse: number;
        mainHouseBottom: number;
        column: number;
        roof: number;
        window: number;
        tube: number;
        tubeTop: number;
        door: number;
        border: number;
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
            mainHouse: 0x76533d,
            mainHouseBottom: 0xcccccc,
            column: 0xcf9c62,
            roof: /*0x76543b*/ 0xffffff,
            window: 0xffb932,
            tube: 0x76533d,
            tubeTop: 0xcf9c62,
            door: 0xcf9c62,
            border: 0x583f2c,
        };
        this.house = new Group();
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
    public generateMergedWindowObject = (
        geometry: Geometry,
        width: number,
        height: number,
        depth: number,
        x: number,
        y: number,
        z: number,
        color: number,
    ) => {
        const cubeGeometry = makeCube(width, height, depth, color);
        const borderGeometry = makeCube(
            width + 35,
            height / 2.8,
            depth + 35,
            this.color.border,
        );
        cubeGeometry.translate(x, y, z);
        borderGeometry.translate(x + 15, y + height / 2.1, z);
        geometry.merge(cubeGeometry);
        geometry.merge(borderGeometry);
        cubeGeometry.translate(-x, -y, -z);
        borderGeometry.translate(-x + 15, -y + height / 2.1, -z);
    }
    public draw() {
        const houseWidth = this.cubeSize * 4;
        const houseHeight = this.cubeSize * 5;
        const houseDepth = this.cubeSize * 4;
        const mergedColumnsGeometry = new Geometry();
        const mergedWindowsGeometry = new Geometry();
        const columnPositions = [
            {
                x: this.x - this.cubeSize / 4 + this.cubeSize / 8,
                y: 0,
                z: this.z - this.cubeSize + this.cubeSize / 8,
            },
            {
                x: this.x - this.cubeSize / 4 + this.cubeSize / 8,
                y: 0,
                z: this.z + houseDepth / 2 + this.cubeSize - this.cubeSize / 8,
            },
            {
                x: this.x - houseWidth + this.cubeSize / 8,
                y: 0,
                z: this.z + houseDepth / 2 + this.cubeSize - this.cubeSize / 8,
            },
            {
                x: this.x - houseWidth + this.cubeSize / 8,
                y: 0,
                z: this.z - houseDepth / 2 + this.cubeSize - this.cubeSize / 8,
            },
        ];
        const windowPositions = [
            {
                x: this.x - houseWidth + this.cubeSize / 4.8,
                y: this.cubeSize / 2,
                z: this.z / 2 + this.cubeSize / 2.4 - this.cubeSize / 1.2,
            },
            {
                x: this.x - houseWidth + this.cubeSize / 4.8,
                y: this.cubeSize / 2,
                z: this.z / 2 + this.cubeSize / 2.4 + this.cubeSize / 1.2,
            },
        ];
        for (const position of columnPositions) {
            this.generateMergedObject(
                mergedColumnsGeometry,
                this.cubeSize / 2,
                houseHeight,
                this.cubeSize / 2,
                position.x,
                position.y,
                position.z,
                this.color.column,
            );
        }
        for (const position of windowPositions) {
            this.generateMergedWindowObject(
                mergedWindowsGeometry,
                this.cubeSize / 1.3,
                this.cubeSize / 1.3,
                this.cubeSize / 1.3,
                position.x,
                position.y,
                position.z,
                this.color.window,
            );
        }
        const mainMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            shading: SmoothShading,
            vertexColors: VertexColors,
        });
        const roofGeometry = makeCube(
            houseWidth + this.cubeSize,
            houseHeight / 10,
            houseDepth + this.cubeSize,
            this.color.roof,
        );
        const mainHouseGeometry = makeCube(
            houseWidth,
            houseHeight,
            houseDepth,
            this.color.mainHouse,
        );
        const mainHouseBottomGeometry = makeCube(
            houseWidth + this.cubeSize * 2,
            houseHeight / 20,
            houseDepth + this.cubeSize * 2,
            this.color.mainHouseBottom,
        );
        const mainHouse = new Mesh(mainHouseGeometry, mainMaterial);
        const mainHouseBottom = new Mesh(mainHouseBottomGeometry, mainMaterial);
        mainHouseBottom.position.y = -houseHeight / 2;
        const tubeGeometry = makeCube(
            houseWidth / 7,
            houseHeight / 2.5,
            houseDepth / 7,
            this.color.tube,
        );
        const tubeTopGeometry = makeCube(
            houseWidth / 5.5,
            houseHeight / 20,
            houseDepth / 5.5,
            this.color.tubeTop,
        );
        const doorGeometry = makeCube(
            houseWidth / 16,
            houseHeight / 2,
            houseDepth / 4,
            this.color.door,
        );
        const roof = new Mesh(roofGeometry, mainMaterial);
        roof.position.y = this.y + this.cubeSize * 1.5;
        roof.position.z = -this.cubeSize / 8;
        const columns = new Mesh(mergedColumnsGeometry, mainMaterial);
        const tube = new Mesh(tubeGeometry, mainMaterial);
        const tubeTop = new Mesh(tubeTopGeometry, mainMaterial);
        tube.position.set(
            this.cubeSize,
            houseHeight / 1.4,
            1.5 * this.cubeSize,
        );
        tubeTop.position.set(
            this.cubeSize,
            houseHeight / 1.1,
            1.5 * this.cubeSize,
        );
        const windowLeft = new Mesh(mergedWindowsGeometry, mainMaterial);
        const windowBottom = new Mesh(mergedWindowsGeometry, mainMaterial);
        const windowBottomSecond = new Mesh(
            mergedWindowsGeometry,
            mainMaterial,
        );
        const door = new Mesh(doorGeometry, mainMaterial);
        const doorBorder = new Mesh(
            makeCube(
                houseWidth / 8,
                houseHeight / 16,
                houseDepth / 3.2,
                this.color.border,
            ),
            mainMaterial,
        );
        door.position.set(
            -houseWidth / 2,
            -this.cubeSize * 2,
            this.z / 2 + this.cubeSize / 2.6,
        );
        doorBorder.position.set(
            -houseWidth / 2 + 10,
            -this.cubeSize + 20,
            this.z / 2 + this.cubeSize / 2.6,
        );
        windowBottomSecond.position.y -= this.cubeSize * 1.5;
        windowBottomSecond.rotateY(Math.degToRad(90));
        windowBottom.rotateY(Math.degToRad(90));
        this.house.add(columns);
        this.house.add(roof);
        // this.house.add(mainHouseBottom);
        this.house.add(door);
        this.house.add(doorBorder);
        this.house.add(tube);
        this.house.add(tubeTop);
        this.house.add(windowLeft);
        this.house.add(windowBottom);
        this.house.add(windowBottomSecond);
        this.house.add(mainHouse);
        this.house.castShadow = true;
        this.house.position.set(this.x, this.y, this.z);
        this.scene.add(this.house);
    }
}

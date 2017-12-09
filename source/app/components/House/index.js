import * as THREE from "three";
import { makeCube } from "../../../utils/index";

export class House {
    constructor(scene, x = 0, y = 0, z = 0, cubeSize) {
        this.scene = scene;
        this.cubeSize = cubeSize;
        this.x = x * this.cubeSize;
        this.y = y * this.cubeSize;
        this.z = z * this.cubeSize;
        this.color = {
            mainHouse: 0x76533d,
            mainHouseBottom: 0xbcbde2,
            column: 0xcf9c62,
            roof: /*0x76543b*/ 0xbcbde2,
            window: 0xf8bc47,
            tube: 0x76533d,
            tubeTop: 0xcf9c62,
            door: 0xcf9c62,
        };
        this.house = new THREE.Group();
    }
    generateMergedObject(geometry, width, height, depth, x, y, z, color) {
        let cubeGeometry = makeCube(width, height, depth, color);
        cubeGeometry.translate(x, y, z);
        geometry.merge(cubeGeometry, cubeGeometry.matrix);
        cubeGeometry.translate(-x, -y, -z);
    }
    draw() {
        const houseWidth = this.cubeSize * 4;
        const houseHeight = this.cubeSize * 5;
        const houseDepth = this.cubeSize * 4;
        let mergedColumnsGeometry = new THREE.Geometry();
        let mergedWindowsGeometry = new THREE.Geometry();
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
        for (let i = 0; i < columnPositions.length; i++) {
            this.generateMergedObject(
                mergedColumnsGeometry,
                this.cubeSize / 2,
                houseHeight,
                this.cubeSize / 2,
                columnPositions[i].x,
                columnPositions[i].y,
                columnPositions[i].z,
                this.color.column,
            );
        }
        for (let i = 0; i < windowPositions.length; i++) {
            this.generateMergedObject(
                mergedWindowsGeometry,
                this.cubeSize / 1.2,
                this.cubeSize / 1.2,
                this.cubeSize / 1.2,
                windowPositions[i].x,
                windowPositions[i].y,
                windowPositions[i].z,
                this.color.window,
            );
        }
        const mainMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.SmoothShading,
            vertexColors: THREE.VertexColors,
        });
        const roofMaterial = new THREE.MeshLambertMaterial({
            color: this.color.roof,
            shading: THREE.SmoothShading,
            vertexColors: THREE.VertexColors,
        });
        const roofGeometry = new THREE.ConeGeometry(
            houseWidth,
            houseHeight / 2,
            4,
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
        const mainHouse = new THREE.Mesh(mainHouseGeometry, mainMaterial);
        const mainHouseBottom = new THREE.Mesh(
            mainHouseBottomGeometry,
            mainMaterial,
        );
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
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = this.y - this.cubeSize / 2;
        roof.rotation.y = THREE.Math.degToRad(45);
        const columns = new THREE.Mesh(mergedColumnsGeometry, mainMaterial);
        const tube = new THREE.Mesh(tubeGeometry, mainMaterial);
        const tubeTop = new THREE.Mesh(tubeTopGeometry, mainMaterial);
        tube.position.set(
            this.cubeSize / 2,
            houseHeight / 1.4,
            2 * this.cubeSize,
        );
        tubeTop.position.set(
            this.cubeSize / 2,
            houseHeight / 1.1,
            2 * this.cubeSize,
        );
        const windowLeft = new THREE.Mesh(mergedWindowsGeometry, mainMaterial);
        const windowBottom = new THREE.Mesh(
            mergedWindowsGeometry,
            mainMaterial,
        );
        const windowBottomSecond = new THREE.Mesh(
            mergedWindowsGeometry,
            mainMaterial,
        );
        const door = new THREE.Mesh(doorGeometry, mainMaterial);
        door.position.set(
            -houseWidth / 2,
            -this.cubeSize * 2,
            this.z / 2 + this.cubeSize / 2.6,
        );
        windowBottomSecond.position.y -= this.cubeSize * 1.5;
        windowBottomSecond.rotateY(THREE.Math.degToRad(90));
        windowBottom.rotateY(THREE.Math.degToRad(90));
        this.house.add(columns);
        this.house.add(roof);
        this.house.add(mainHouseBottom);
        this.house.add(door);
        this.house.add(tube);
        this.house.add(tubeTop);
        this.house.add(windowLeft);
        this.house.add(windowBottom);
        this.house.add(windowBottomSecond);
        this.house.add(mainHouse);
        this.house.position.set(this.x, this.y, this.z);
        this.scene.add(this.house);
    }
}

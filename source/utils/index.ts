import * as THREE from "three";

export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function makeCube(
    width: number,
    height: number,
    depth: number,
    color: number,
) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    for (const itFace of geometry.faces) {
        const face = itFace;
        face.color.setHex(color);
    }
    return geometry;
}

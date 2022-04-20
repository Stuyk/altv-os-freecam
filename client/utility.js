/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import * as native from 'natives';

export function getCrossProduct(v1, v2) {
    return {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
    };
}

export function getNormalizedVector(vector) {
    const mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    return {
        x: vector.x / mag,
        y: vector.y / mag,
        z: vector.z / mag
    };
}

export function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
}

export function rotationToDirection(rotation) {
    const z = degToRad(rotation.z);
    const x = degToRad(rotation.x);
    const num = Math.abs(Math.cos(x));

    return {
        x: -Math.sin(z) * num,
        y: Math.cos(z) * num,
        z: Math.sin(x)
    };
}

export function getCameraRotation(cam) {
    return { ...native.getCamRot(parseFloat(cam), 2) };
}

export function getCameraPosition(cam) {
    return { ...native.getCamCoord(parseFloat(cam)) };
}

import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { MyScene } from "./components/MyScene/index";
// import { Particles } from "./components/Particles/index";

export class Game {
    public aspect: number;
    public settings: { camera: { x: number; y: number; z: number } };
    constructor(settings: {
        camera: {
            x: number;
            y: number;
            z: number;
        };
    }) {
        this.aspect = window.innerWidth / window.innerHeight;
        this.settings = settings;
    }
    public start() {
        const scene = new THREE.Scene();
        const frustumSize = 3200;
        const camera = new THREE.OrthographicCamera(
            frustumSize * this.aspect / -2,
            frustumSize * this.aspect / 2,
            frustumSize / 2,
            frustumSize / -2,
            1,
            10000,
        );
        camera.position.x = this.settings.camera.x;
        camera.position.y = this.settings.camera.y;
        camera.position.z = this.settings.camera.z;
        scene.add(new THREE.AmbientLight(0xd0e9fa, 0.6));

        const controls = new OrbitControls(camera);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;

        const axisHelper = new THREE.AxisHelper(1000);
        scene.add(axisHelper);

        const shadowlight = new THREE.DirectionalLight(0xffffff, 0.3);
        shadowlight.position.set(0, 100, 0);
        scene.add(shadowlight);

        const light = new THREE.DirectionalLight(0xdae6fd, 0.4);
        light.position.set(-150, 100, 20);
        scene.add(light);

        const backLight = new THREE.DirectionalLight(0xdae6fd, 0.45);
        backLight.position.set(-10, 100, 60);
        scene.add(backLight);

        // const particles = new Particles(scene, 1000, 1000, 1000, 0xffffff, 200);
        // particles.draw();

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x2c2b4d, 1);
        renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        document.body.appendChild(renderer.domElement);

        const gameScene = new MyScene(scene, camera, renderer);
        gameScene.draw();
        gameScene.animate();

        const resize = () => {
            camera.left =
                -frustumSize * window.innerWidth / window.innerHeight / 2;
            camera.right =
                frustumSize * window.innerWidth / window.innerHeight / 2;
            camera.top = frustumSize / 2;
            camera.bottom = -frustumSize / 2;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        renderer.render(scene, camera);
        addEventListener("resize", resize);
    }
}

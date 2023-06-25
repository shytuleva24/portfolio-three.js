import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {LoadingService} from "../../services/load.service";

@Component({
    selector: 'app-sky',
    templateUrl: './sky.component.html',
    styleUrls: ['./sky.component.css']
})
export class SkyComponent implements AfterViewInit {
    @ViewChild('c', {static: true}) canvasRef!: ElementRef<HTMLCanvasElement>;

    scene!: THREE.Scene;
    camera!: THREE.PerspectiveCamera;
    renderer!: THREE.WebGLRenderer;
    car!: THREE.Object3D;
    mouseX = 0;
    mouseY = 0;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    ship: THREE.Object3D | undefined;
    animationId: number | null = null;
    totalResources: number = 0;
    loadedResources: number = 0;
    loadingProgress: number = 0;
    constructor(private loadingService: LoadingService) { }

    ngAfterViewInit() {
        this.init();
        document.addEventListener('scroll', () => this.pauseAnimation());
    }

    init() {
        const canvas = this.canvasRef.nativeElement;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xdddddd);

        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 3000);
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        const shipObject = this.scene.getObjectByName("ship");
        if (shipObject) {
            this.camera.lookAt(shipObject.position);

            const cameraOffset = new THREE.Vector3(-5, 5, 500);
            this.camera.position.copy(shipObject.position).add(cameraOffset);
        }
        const loader = new GLTFLoader();

        loader.load('assets/scatch/scene.gltf', (gltf) => {
            this.loadingService.setProgress(1);
            this.car = gltf.scene.children[0];
            this.car.scale.set(1, 1, 1);
            this.scene.add(gltf.scene);
            this.scene.traverse((object: THREE.Object3D) => {
                if (object.name === "Boot_Finaal_1") { // Замените "Boot_Finaal_1" на имя вашего корабля
                    this.ship = object;
                    const cameraOffset = new THREE.Vector3(-5, 5, 500);
                    this.camera.position.copy(object.position).add(cameraOffset);
                }
            });

            let scrollTimeout: number | undefined;

            document.addEventListener('scroll', () => {
                if (scrollTimeout !== undefined) {
                    clearTimeout(scrollTimeout);
                }
                scrollTimeout = setTimeout(() => this.resumeAnimation(), 200); // Задержка перед возобновлением анимации (200 миллисекунд)
            });


            loader.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
                const progress = (itemsLoaded / itemsTotal) * 100;
                this.loadingService.setProgress(progress);
            };

            loader.manager.onLoad = () => {
                // Все ресурсы загружены
                this.loadingService.setProgress(100);
                this.animate();
            };
            this.animate();
        }, (xhr) => {
            this.totalResources = xhr.total; // Общий объем ресурсов
        }, (error) => {
            console.error('Ошибка загрузки:', error);
        });

        window.addEventListener('resize', () => this.onWindowResize());
        document.addEventListener('mousemove', (event: MouseEvent) => this.onDocumentMouseMove(event));
        document.addEventListener('touchstart', (event: TouchEvent) => this.onDocumentTouchStart(event));
        document.addEventListener('touchmove', (event: TouchEvent) => this.onDocumentTouchMove(event));
    }



    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onDocumentMouseMove(event: MouseEvent) {
        this.mouseX = (event.clientX - this.windowHalfX) / 250;
        this.mouseY = (event.clientY - this.windowHalfY) / 250;
    }

    onDocumentTouchStart(event: TouchEvent) {
        if (event.touches.length === 1) {
            event.preventDefault();
            // this.mouseX = event.touches[0].pageX - this.windowHalfX;
            // this.mouseY = event.touches[0].pageY - this.windowHalfY;
        }
    }

    onDocumentTouchMove(event: TouchEvent) {
        if (event.touches.length === 1) {
            event.preventDefault();
            // this.mouseX = event.touches[0].pageX - this.windowHalfX;
            // this.mouseY = event.touches[0].pageY - this.windowHalfY;
        }
    }

    animate() {
        if (this.ship) {
            const shipPosition = this.ship.position;
            const cameraRadius = 350; // Расстояние от камеры до корабля
            const cameraRotationSpeed = 0.3; // Скорость вращения камеры
            const cameraOffset = new THREE.Vector3(30, 5, cameraRadius); // Смещение камеры относительно корабля
            const cameraPhi = this.mouseY * cameraRotationSpeed;
            const targetX = shipPosition.x + cameraRadius * Math.sin(cameraRotationSpeed + this.mouseX * cameraRotationSpeed);
            const targetZ = shipPosition.z + cameraRadius * Math.cos(cameraRotationSpeed + this.mouseX * cameraRotationSpeed);
            // const targetY = shipPosition.y + cameraOffset.y + this.mouseY;
            const targetY = THREE.MathUtils.clamp(
                shipPosition.y + cameraRadius * Math.sin(cameraPhi) + cameraOffset.y,
                shipPosition.y - Math.sin(THREE.MathUtils.degToRad(5)) * cameraRadius, // Ограничение вниз
                shipPosition.y + Math.sin(THREE.MathUtils.degToRad(13)) * cameraRadius  // Ограничение вверх
            );
            const rotationSpeed = 0.5; // Скорость вращения камеры
            const smoothness = 0.03; // Сглаживание движения камеры

            this.camera.position.x += (targetX - this.camera.position.x) * smoothness;
            this.camera.position.z += (targetZ - this.camera.position.z) * smoothness;
            this.camera.position.y += (targetY - this.camera.position.y) * smoothness;

            const targetRotationY = -this.mouseX;
            const targetRotationX = -this.mouseY;

            const rotationThreshold = 0.0001; // Порог для остановки вращения

            if (Math.abs(this.camera.rotation.y - targetRotationY) > rotationThreshold ||
                Math.abs(this.camera.rotation.x - targetRotationX) > rotationThreshold) {
                this.camera.rotation.y += (targetRotationY - this.camera.rotation.y) * rotationSpeed;
                this.camera.rotation.x += (targetRotationX - this.camera.rotation.x) * rotationSpeed;
            } else {
                this.camera.rotation.y += rotationSpeed;
            }


            this.camera.lookAt(shipPosition);
        }

        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    pauseAnimation() {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resumeAnimation() {
        if (this.animationId === null) {
            this.animate();
        }
    }

}

import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-three-scene',
  templateUrl: './three-scene.component.html',
  styleUrls: ['./three-scene.component.scss']
})
export class ThreeSceneComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  car: THREE.Object3D = new THREE.Object3D();
  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  mixer!: THREE.AnimationMixer;
  mouseX = 0;
  mouseY = 0;
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  startPosX!: number;
  startPosY!: number;
  initialCarScale!: THREE.Vector3;

  constructor() {}

  ngOnInit(): void {
    this.setupScene();
    this.setupLights();
    this.setupRenderer();
    this.setupEventListeners();
    this.loadModel();
    this.camera.rotation.y = 15 / 180 * Math.PI;
    this.camera.rotation.x = -10 / 180 * Math.PI;
    this.camera.position.set(0, 5, 25);
  }

  setupScene(): void {
    this.scene.background = null;
  }

  setupLights(): void {
    const light = new THREE.AmbientLight(0x4e3602, 10);
    this.scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0x6a6a6a, 45);
    directionalLight.position.set(0, 0, 300);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    const additionalLight = new THREE.PointLight(0xd7ba7a, 1);
    light.position.set(0, 300, 500);
    this.scene.add(additionalLight);
  }

  setupRenderer(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  setupEventListeners(): void {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  loadModel(): void {
    const loader = new GLTFLoader();
    loader.load('assets/notorius/scene.gltf', (gltf) => {
      this.mixer = new THREE.AnimationMixer(gltf.scene);
      this.car = gltf.scene.children[0];
      this.car.scale.set(5, 5, 5);
      this.startPosX = this.car.rotation.x;
      this.startPosY = this.car.rotation.y;
      this.initialCarScale = this.car.scale.clone();

      const animations = gltf.animations;
      if (animations && animations.length) {
        const animationClip = animations[0];
        const action = this.mixer.clipAction(animationClip);
        action.play();
      }
      this.scene.add(gltf.scene);
      this.animate();
    });
  }

  @HostListener('mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent): void {
    this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = (event.clientY / window.innerHeight) * 2 - 1;

    const targetRotationY = this.mouseX * Math.PI;
    const targetRotationX = this.mouseY * Math.PI;

    const rotationSpeed = 0.1;
    this.car.rotation.z = this.startPosY + (targetRotationY - this.car.rotation.z) * rotationSpeed;
    this.car.rotation.x = ((targetRotationX - this.car.rotation.x) * rotationSpeed) + this.startPosX;
  }

  @HostListener('touchstart', ['$event'])
  onDocumentTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.mouseX = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
      this.mouseY = (event.touches[0].pageY / window.innerHeight) * 2 - 1;
    }
  }

  @HostListener('touchmove', ['$event'])
  onDocumentTouchMove(event: TouchEvent): void {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.mouseX = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
      this.mouseY = (event.touches[0].pageY / window.innerHeight) * 2 - 1;
    }
  }


  onWindowResize(): void {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.camera.lookAt(0, 1.2, 5);
    this.mixer.update(0.016);
    this.renderer.render(this.scene, this.camera);
  }
}

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shader/vertexShader.vert";
import fragmentShader from "./shader/fragmentShader.frag";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.querySelector(".webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

// const textureLoader = new THREE.TextureLoader();

const widthSegments = 30;
const heightSegments = 30;
const depthSegments = 30;
const geometry = new THREE.BoxGeometry(
  1,
  1,
  1,
  widthSegments,
  heightSegments,
  depthSegments
);

const count = geometry.attributes.position.count;

const aRandom = new Float32Array(count);
for (let i = 0; i < count; i++) {
  aRandom[i] = Math.random();
}
geometry.setAttribute("aRandom", new THREE.BufferAttribute(aRandom, 1));
geometry.setAttribute(
  "aNormal",
  new THREE.BufferAttribute(geometry.attributes.normal.array, 3)
);
geometry.setAttribute(
  "aWidthSegments",
  new THREE.BufferAttribute(new Float32Array(widthSegments), 1)
);

const material = new THREE.RawShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
  side: THREE.DoubleSide,
  uniforms: { uTime: { value: 0.0 } },
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0.25, -0.25, 1);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  material.uniforms.uTime.value = elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();

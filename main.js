import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('canvas-container').appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
const woodTexture = loader.load('images/wood.jpeg');
const geometry = new THREE.IcosahedronGeometry(1);
const material = new THREE.MeshStandardMaterial({
  map: woodTexture,
  roughness: 0.9,
  metalness: 0.0,
  bumpMap: woodTexture,
  bumpScale: 0.05
});

const twenty = new THREE.Mesh(geometry, material);
twenty.position.y = 1.0;
scene.add(twenty);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const boarderMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0x000000,
  transparent: true,
  opacity: 0.5,
});

const boarder = new THREE.Mesh(geometry, boarderMaterial);
twenty.add(boarder);

camera.position.z = 3.25;

let isRolling = false;
let isShowingResult = false;

function animate() {
  if (isRolling) {
    twenty.rotation.x += 0.2;
    twenty.rotation.y += 0.2;
  } else if (isShowingResult) {
    twenty.rotation.x = Math.PI * 0.5; 
    twenty.rotation.y = 0;
    twenty.rotation.z = 0;
    if (!window.redirectTimeoutSet) {
      window.redirectTimeoutSet = true;
      const index = Math.floor(Math.random() * 2);
      setTimeout(() => {
        if(index == 0)
        {
          window.location.href = 'https://sds2311.github.io/sds231.github.io/';
        }
        else if(index == 1)
        {
          window.location.href = 'https://sds2311.github.io/project2/';
        }
      }, 500);
  }
  } else {
    twenty.rotation.x += 0.02;
    twenty.rotation.y += 0.02;
  }
  
  renderer.render(scene, camera);
}

function roll() {
  if (!isRolling && !isShowingResult) {
    isRolling = true;
    setTimeout(() => {
      isRolling = false;
      isShowingResult = true;
    }, 2000);
  }
}

renderer.setAnimationLoop(animate);

window.roll = roll;


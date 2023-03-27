//Imports
import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';

//Variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, 3/2.5, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, (window.innerHeight/3) );
document.body.appendChild( renderer.domElement );
const light = new THREE.DirectionalLight( 0xffffff, 1 );
const modelsLoader = new GLTFLoader();

const planeGeometry = new THREE.PlaneGeometry( 300, 300, 32, 32 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xaaaaaa } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );

//Shrek Loader
modelsLoader.load('./models/Shrek.gltf', function (gltf) {
    const shrek = gltf.scene;
    shrek.scale.set(0.7, 0.7, 0.7);
    shrek.position.y = -32;
    shrek.position.x = 0;
    shrek.position.z = -100;
    scene.add(shrek);
});

//Light Arguments
light.position.set( 1, 0, 7 );
light.castShadow = true; // default false
light.shadow.radius = 20;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add( light );

plane.receiveShadow = true;
plane.castShadow = true;
plane.position.y = -25;
plane.position.x = 0;
plane.position.z = -140;
scene.add( plane );


renderer.shadowMap.enabled = true;


camera.position.z = 7;

function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}

render();
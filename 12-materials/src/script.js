import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';


/**
 * GUI
 */
const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matcapTexture1 = textureLoader.load('/textures/matcaps/1.png');
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png');
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png');
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png');
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png');
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png');
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png');
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png');
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg');
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

// The order of the textures is important
const environmentMapTexture = new THREE.CubeTextureLoader()
    .load([
        '/textures/environmentMaps/2/nx.jpg',
        '/textures/environmentMaps/2/px.jpg',
        '/textures/environmentMaps/2/py.jpg',
        '/textures/environmentMaps/2/ny.jpg',
        '/textures/environmentMaps/2/pz.jpg',
        '/textures/environmentMaps/2/nz.jpg',
    ])

/**
 * Objects
 */
// We can use on Material for multiple Geometries
// const material = new THREE.MeshBasicMaterial();
// material.map = gradientTexture;
// material.color = new THREE.Color('#0000ff');
// material.color = new THREE.Color(0xffff00);
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide; // To see all sides of an object

// Normal Material
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true;

// Matcap Material
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture8;

// MeshDepth Material
// const material = new THREE.MeshDepthMaterial()

// Meshlambert Material
// const material = new THREE.MeshLambertMaterial();

// Mesh Phong
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0xff0000)

// MeshToon
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// Mesh Standard
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.45;
// material.roughness = 0.65;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// Environment Map
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0;
material.envMap = environmentMapTexture;

// GUI for Mesh Standard
gui.add(material, 'metalness').min(0).max(1).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.01);
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 64, 64),
    material
)
sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
sphere.position.set(-1.5, 0, 0)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
plane.position.set(0, 0, 0);
// plane.rotation.set((Math.PI*0,5), 0, 0)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
    material
)
torus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
torus.position.set(1.5, 0, 0);

scene.add(sphere, plane, torus);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(-1, -1, 2);

scene.add(ambientLight, pointLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Objects
    sphere.rotation.set(0.15 * elapsedTime, 0.15 * elapsedTime, 0);
    plane.rotation.set(0.15 * elapsedTime, 0.15 * elapsedTime, 0);
    torus.rotation.set(0.15 * elapsedTime, 0.15 * elapsedTime, 0);

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
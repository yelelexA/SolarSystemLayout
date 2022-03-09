// Инфа:
// Соотношение: 1 / 100 000


import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Setup
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  45, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
)
camera.position.set(-90, 140, 140)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.listenToKeyEvents( window ) // optional

controls.enableDamping = true
controls.dampingFactor = 0.05

controls.screenSpacePanning = false

controls.minDistance = 3
controls.maxDistance = 500

controls.maxPolarAngle = Math.PI / 2

// renderer.render(scene, camera);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

// Textures
const textureLoader = new THREE.TextureLoader()

const starsTexture = ('./textures/starsTexture.jpeg')
const sunTexture = ('./textures/sunTexture.jpg')
// const sunTexture = ('./textures/obamaFace.jpg')
const mercuryTexture = ('./textures/mercuryTexture.jpg')
const venusTexture = ('./textures/venusTexture.jpg')
const earthTexture = ('./textures/earthTexture.jpg')
const marsTexture = ('./textures/marsTexture.jpg')
const jupiterTexture = ('./textures/jupiterTexture.jpg')
const saturnTexture = ('./textures/saturnTexture.jpg')
const saturnRingTexture = ('./textures/saturnRingTexture.png')
const uranusTexture = ('./textures/uranusTexture.jpg')
const uranusRingTexture = ('./textures/uranusRingTexture.png')
const neptuneTexture = ('./textures/neptuneTexture.jpg')

// BackGround
scene.background = new THREE.CubeTextureLoader().load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
])

// Create Sun
const sunGeo = new THREE.SphereGeometry(16, 30, 30)
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
})
const sun = new THREE.Mesh(sunGeo, sunMat)

sun.position.set(0, 0, 0) // The center of the Solar system
scene.add(sun)

// function for Create Planets
function createPlanet(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 64, 64)
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geo, mat)
  const obj = new THREE.Object3D()
  obj.add(mesh)
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    )
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj)
  mesh.position.x = position
  return { mesh, obj }
}

// Create Planets
const mercury = createPlanet(3.2, mercuryTexture, 28)
const venus = createPlanet(5.8, venusTexture, 44)
const earth = createPlanet(6, earthTexture, 62)
const mars = createPlanet(4, marsTexture, 78)
const jupiter = createPlanet(12, jupiterTexture, 100)
const uranus = createPlanet(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
})
const neptune = createPlanet(7, neptuneTexture, 200)
const saturn = createPlanet(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
})

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 2, 300)
scene.add(pointLight)

function animate() {
  //Self-rotation
  sun.rotateY(0.004)
  mercury.mesh.rotateY(0.004)
  venus.mesh.rotateY(-0.002)
  earth.mesh.rotateY(0.02)
  mars.mesh.rotateY(0.018)
  jupiter.mesh.rotateY(0.04)
  saturn.mesh.rotateY(0.038)
  uranus.mesh.rotateY(0.03)
  neptune.mesh.rotateY(0.032)

  //Around-sun-rotation
  mercury.obj.rotateY(0.04)
  venus.obj.rotateY(0.015)
  earth.obj.rotateY(0.01)
  mars.obj.rotateY(0.008)
  jupiter.obj.rotateY(0.002)
  saturn.obj.rotateY(0.0009)
  uranus.obj.rotateY(0.0004)
  neptune.obj.rotateY(0.0001)
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
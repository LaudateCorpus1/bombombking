// Creeper and Three.js setting
let renderer, scene, camera
let stats, gui
let controls
let explosion = []
let boxes = []
let boxMeshes = []

const scale = 1;

// Cannon.js
let world
let physicsMaterial
let groundBody
const dt = 1.0 / 60.0 // seconds
let time = Date.now()

function initCannon() {
  // 初始化 cannon.js、重力、碰撞偵測
  world = new CANNON.World()
  world.gravity.set(0, -20, 0)
  world.broadphase = new CANNON.NaiveBroadphase()

  // 解算器設定
  const solver = new CANNON.GSSolver()
  solver.iterations = 7
  solver.tolerance = 0.1
  const split = true
  if (split) world.solver = new CANNON.SplitSolver(solver)
  else world.solver = solver

  // 接觸材質相關設定（摩擦力、恢復係數）
  world.defaultContactMaterial.contactEquationStiffness = 1e9
  world.defaultContactMaterial.contactEquationRelaxation = 4
  physicsMaterial = new CANNON.Material('slipperyMaterial')
  const physicsContactMaterial = new CANNON.ContactMaterial(
    physicsMaterial,
    physicsMaterial,
    0.0, // 摩擦力
    0.3 // 恢復係數
  )
  world.addContactMaterial(physicsContactMaterial)

  // 鼠標控制器剛體
  createPlayer();
}

function initStats() {
  const stats = new Stats()
  stats.setMode(0)
  document.getElementById('stats').appendChild(stats.domElement)
  return stats
}

function initScene() {
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.0008)
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  // camera.position.set(20, 20, 20)
  // camera.lookAt(scene.position)
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setClearColor(0x80adfc, 1.0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = 2 // THREE.PCFSoftShadowMap
}

function initLight() {
  // 設置環境光提供輔助柔和白光
  let ambientLight = new THREE.AmbientLight(0x404040)
  scene.add(ambientLight)

  // 點光源
  pointLight = new THREE.PointLight(0xf0f0f0, 1, 100) // 顏色, 強度, 距離
  pointLight.castShadow = true // 投影
  pointLight.position.set(-30, 30, 30)
  // scene.add(pointLight)
  light = new THREE.SpotLight(0xffffff)
  light.position.set(10, 30, 20)
  light.target.position.set(0, 0, 0)
  if (true) {
    light.castShadow = true
    light.shadow.camera.near = 20
    light.shadow.camera.far = 50 //camera.far;
    light.shadow.camera.fov = 40
    light.shadowMapBias = 0.1
    light.shadowMapDarkness = 0.7
    light.shadow.mapSize.width = 2 * 512
    light.shadow.mapSize.height = 2 * 512
    //light.shadowCameraVisible = true;
  }
  scene.add(light)
}

function initHelper() {
  // let axes = new THREE.AxesHelper(20)
  // scene.add(axes)
}

function createGround() {
  // 建立地板剛體
  let groundShape = new CANNON.Plane()
  let groundCM = new CANNON.Material()
  groundBody = new CANNON.Body({
    mass: 0,
    shape: groundShape,
    material: groundCM
  })
  // setFromAxisAngle 旋轉 x 軸 -90 度
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
  world.add(groundBody)

  const groundGeometry = new THREE.PlaneGeometry(15*scale, 13*scale, 15, 13)
  const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xa5a5a5 })
  let ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  ground.name = 'floor'
  scene.add(ground)
}

function createBazzi() {/*
  creeperObj = new Creeper()
  // tweenHandler()
  creeperObj.creeper.position.set(10, 0, 0)
  scene.add(creeperObj.creeper)*/
  BazziObj = new Bazzi(scale)
  world.addBody(BazziObj.bodyBody)
  scene.add(BazziObj.Bazzi)
  BazziObj.Bazzi.position.set(-7, 0, 0)
  BazziObj.bodyBody.position.set(-7, 0, 0)
}

// Three.js init setting
function init() {
  initCannon()
  initScene()
  initCamera()
  initPointerLockControls()
  initRenderer()
  initLight()
  initHelper()
  // initDatGUI()
  stats = initStats()

  createGround()
  //createBazzi()
  createScene()
  //createPointsScene()

  document.body.appendChild(renderer.domElement)
}

function render() {
  requestAnimationFrame(render)
  stats.update()
  //pointsSceneAnimation()

  if (controls.enabled) {
    world.step(dt)
    // Update box mesh positions
    for (let i = 0; i < boxes.length; i++) {
      boxMeshes[i].position.copy(boxes[i].position)
      boxMeshes[i].quaternion.copy(boxes[i].quaternion)
    }
    
    // Update shooting ball positions
    if(playerBody.first) playerBody.firstAmmoMesh.position.copy(playerBody.firstAmmo.position)
    if(playerBody.second) playerBody.secondAmmoMesh.position.copy(playerBody.secondAmmo.position)
    if(playerBody.third) playerBody.thirdAmmoMesh.position.copy(playerBody.thirdAmmo.position)
  }
  controls.update(Date.now() - time)
  time = Date.now()
  // TWEEN.update()
  // explosion
  
  if (explosion) {
    const len = explosion.length
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        explosion[i].update()
      }
    }
  }

  renderer.render(scene, camera)
}

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

init()
render()

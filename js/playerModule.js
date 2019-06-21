// 睏寶
class Player {
  constructor(scale_) {
    this.walkOffset = 0
    const headGeo = new THREE.BoxGeometry(0.5*scale_, 0.4*scale_, 0.45*scale_)
    const earGeo = new THREE.BoxGeometry(0.2*scale_, 0.2*scale_, 0.2*scale_)
    const bodyGeo = new THREE.BoxGeometry(0.24*scale_, 0.24*scale_, 0.25*scale_)
    const handGeo = new THREE.BoxGeometry(0.1*scale_, 0.2*scale_, 0.1*scale_)
    const footGeo = new THREE.BoxGeometry(0.12*scale_, 0.15*scale_, 0.1*scale_)

    const textureLoader = new THREE.TextureLoader()
    const headMap = textureLoader.load('./img/face.png')
    const skinMap = textureLoader.load('./img/belly.png')
    const normalMap = textureLoader.load('./img/normal.png')
    const normalMat = new THREE.MeshPhongMaterial({ color: 0xD70000 })

    const headMaterials = []
    const skinMaterials = []
    for (let i = 0; i < 6; i++) {
      let map
      if (i === 4) map = headMap
      else map = normalMap
      headMaterials.push(new THREE.MeshPhongMaterial({ map: map }))
    }

    for (let i = 0; i < 6; i++) {
      let map
      if (i === 4) map = skinMap
      else map = normalMap
      skinMaterials.push(new THREE.MeshPhongMaterial({ map: map }))
    }

    this.head = new THREE.Mesh(headGeo, headMaterials)
    this.head.position.set(0, 0.19*scale_, 0)

    this.body = new THREE.Mesh(bodyGeo, skinMaterials)
    this.body.position.set(0, -0.13*scale_, 0)

    this.ear1 = new THREE.Mesh(earGeo, normalMat)
    this.ear1.position.set(0.25*scale_, 0.35*scale_, -0.225*scale_)
    this.ear2 = this.ear1.clone()
    this.ear2.position.set(-0.25*scale_, 0.35*scale_, -0.225*scale_)

    this.foot1 = new THREE.Mesh(handGeo, normalMat)
    this.foot1.position.set(-0.17*scale_, -0.11*scale_, 0)
    this.foot2 = this.foot1.clone()
    this.foot2.position.set(0.17*scale_, -0.11*scale_, 0)
    this.foot3 = new THREE.Mesh(footGeo, normalMat)
    this.foot3.position.set(0.055*scale_, -0.325*scale_, 0)
    this.foot4 = this.foot3.clone()
    this.foot4.position.set(-0.055*scale_, -0.325*scale_, 0)


    this.ear = new THREE.Group()
    this.ear.add(this.ear1) // 前腳左
    this.ear.add(this.ear2) // 後腳左
    this.feet = new THREE.Group()
    this.feet.add(this.foot1) // 前腳左
    this.feet.add(this.foot2) // 後腳左
    this.feet.add(this.foot3) // 前腳右
    this.feet.add(this.foot4) // 後腳右

    this.Player = new THREE.Group()
    this.Player.add(this.head)
    this.Player.add(this.body)
    this.Player.add(this.feet)
    this.Player.add(this.ear)
    this.Player.name = 'Player'

    this.Player.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
  BazziFeetWalk() {
    this.walkOffset += 0.04
    
    this.foot1.rotation.x = Math.sin(this.walkOffset) / 2 // 右手
    this.foot2.rotation.x = -Math.sin(this.walkOffset) / 2 // 左手
    this.foot3.rotation.x = Math.sin(this.walkOffset) / 2 // 左腳
    this.foot4.rotation.x = -Math.sin(this.walkOffset) / 2 // 右腳
  }
}
let playerScale = 4
let playerObj
let playerShape, playerBody
function createPlayer(){/*
  playerShape = new CANNON.Box(
    new CANNON.Vec3(0.25 * playerScale, 0.4 * playerScale, 0.225 * playerScale)
  )
  playerBody = new CANNON.Body({
    mass: 5 * playerScale/3,
    position: new CANNON.Vec3(0, 0, 0)
  })
  playerBody.addShape(playerShape)*/
  AShape = new CANNON.Sphere(0.4)
  playerBody = new CANNON.Body({ mass: 5 })
  playerBody.addShape(AShape)

  world.addBody(playerBody)

  playerBody.position.set(7*scale, 0.4*playerScale, 6*scale)
  playerBody.linearDamping = 0.9
  
  playerBody.len = 1
  playerBody.bomb = 0;
  playerBody.maxBomb = 1
  playerBody.first = false;
  playerBody.second = false;
  playerBody.third = false;
}

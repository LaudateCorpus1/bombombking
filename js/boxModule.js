// 道具
class Box {
    constructor(scale) {
        const halfExtents = new CANNON.Vec3(0.3, 0.3, 0.3)
        const boxShape = new CANNON.Box(halfExtents)
        const boxGeometry = new THREE.BoxGeometry(
            halfExtents.x,
            halfExtents.y,
            halfExtents.z
        )
        const ammoMap = textureLoader.load('./img/question.jpg')
        const ammoMaterials = []
        for (let i = 0; i < 6; i++) {
            let map = ammoMap
            ammoMaterials.push(new THREE.MeshPhongMaterial({ map: map }))
        }
        this.ammoMesh = new THREE.Mesh(boxGeometry, ammoMaterials)
        this.ammoBody = new CANNON.Body({ mass: 0, material: physicsMaterial })
        this.ammoBody.addShape(boxShape)
    
        this.ammoMesh.castShadow = true
        this.ammoMesh.receiveShadow = true
    }
  }
  
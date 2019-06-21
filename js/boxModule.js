// 道具
class Box {
    constructor(scale) {
        const halfExtents = new CANNON.Vec3(scale, scale, scale)
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
        this.walkOffset = 0
        this.scaleOffset = 0

        this.boxType = Math.floor(Math.random()*2)
    }

    playAnimation() {
        this.walkOffset += 0.0001
        this.ammoMesh.rotation.y = Math.sin(this.walkOffset)*360
        this.ammoMesh.position.y = 0.5 + Math.sin(this.walkOffset*5000)*0.05
        //this.ammoMesh.rotation.x = Math.sin(this.walkOffset/2)*360
        //this.ammoMesh.rotation.y = Math.sin(this.walkOffset) / 2
        //let scaleRate = Math.sin(scaleHeadOffset)
        //this.ammoMesh.scale.set(scaleRate, scaleRate, scaleRate)


    }
  }
  
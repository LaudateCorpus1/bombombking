// 樂高物件
class Ball {
  constructor(scale_) {
    const ballShape = new CANNON.Sphere(0.5*scale_)
    const ballGeometry = new THREE.SphereGeometry(0.5*scale_, 32, 32)
    const ammoMaterial = new THREE.MeshPhongMaterial({ color: 0x32baec , transparent: true, opacity: 0.8})
    this.ammoMesh = new THREE.Mesh(ballGeometry, ammoMaterial)
    this.ammoBody = new CANNON.Body({ mass: 0 })
    this.ammoBody.addShape(ballShape)

    this.ammoMesh.castShadow = true
    this.ammoMesh.receiveShadow = true
    this.walkOffset = 0
  }
  playAnimation() {
    this.walkOffset += 0.001
    //this.ammoMesh.position.y = 0.5 + Math.sin(this.walkOffset*1000)*0.1
    //this.ammoBody.position.y = 0.5 + Math.sin(this.walkOffset*1000)*0.1
    let scaleRate = this.walkOffset*1.5+1//+Math.sin(this.walkOffset*500)*0.1
    this.ammoMesh.scale.set(scaleRate, scaleRate, scaleRate)
    //console.log("Play animation", this.ammoMesh.position.y)
  }
}

// 樂高物件
class Lego {
  constructor(legoGeo, boxShape, creeperMat) {
    this.box = new THREE.Mesh(legoGeo, creeperMat)
    this.boxBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, 0, 0)
    })
    this.boxBody.addShape(boxShape)
    this.lego = new THREE.Object3D()
    this.lego.add(this.box)
    this.lego.name = 'lego'
    this.lego.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}

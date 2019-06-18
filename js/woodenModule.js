// 樂高物件
class Wooden {
  constructor(scale_, boxGeo, headMaterials, boxShape) {
    this.box = new THREE.Mesh(boxGeo, headMaterials)
    this.box.position.set(0, 0, 0)

    this.boxBody = new CANNON.Body({
      mass: 100 * scale_/5,
      position: new CANNON.Vec3(0, 0, 0)
    })
    this.boxBody.addShape(boxShape)
    this.boxBody.position.copy(this.box.position)

    this.Wooden = new THREE.Object3D()
    this.Wooden.add(this.box)
    this.Wooden.name = 'Wooden'
    this.Wooden.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}

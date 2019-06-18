// 樂高物件
class House {
  constructor(scale_, boxGeo, roofGeo, creeperMat, headMaterials, boxShape) {
    this.box = new THREE.Mesh(boxGeo, headMaterials)
    this.box.position.set(0, -0.2*scale_, 0)

    
    this.boxBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, 0, 0)
    })
    this.boxBody.addShape(boxShape)
    this.boxBody.position.set(0, -0.2*scale_, 0)

    this.roof = new THREE.Mesh(roofGeo, creeperMat)
    this.roof.position.set(0, 0.5*scale_, 0)


    this.House = new THREE.Object3D()
    this.House.add(this.box)
    this.House.add(this.roof)
    this.House.add(this.smoke)
    this.House.name = 'House'
    this.House.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}

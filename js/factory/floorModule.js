// 樂高物件
class Floor {
  constructor(boxGeo_floor, floorMat) {
    this.box = new THREE.Mesh(boxGeo_floor, floorMat)
    this.floor = new THREE.Object3D()
    this.floor.add(this.box)
    this.floor.name = 'floor'
    this.floor.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}

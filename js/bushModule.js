// 樂高物件
class Bush {
  constructor(boxGeo, creeperMat) {
    this.box = new THREE.Mesh(boxGeo, creeperMat)

    this.Bush = new THREE.Object3D()
    this.Bush.add(this.box)
    this.Bush.name = 'Bush'
    this.Bush.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}

// 樂高物件
class Warn {
    constructor(boxGeo, headMaterials, boxShape) {
      this.box = new THREE.Mesh(boxGeo, headMaterials)
      this.box.position.set(0, 0, 0)
  
      this.boxBody = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(0, 0, 0)
      })
      this.boxBody.addShape(boxShape)
      this.boxBody.position.copy(this.box.position)
  
      this.Warn = new THREE.Object3D()
      this.Warn.add(this.box)
      this.Warn.name = 'Warn'
      this.Warn.traverse(function(object) {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true
          object.receiveShadow = true
        }
      })
    }
  }
  
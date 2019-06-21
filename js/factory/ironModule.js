// 樂高物件
class Iron {
    constructor(IronGeo, IronMat, boxShape) {
      this.box = new THREE.Mesh(IronGeo, IronMat)
  
      this.boxBody = new CANNON.Body({
        mass: 0,
      })
      this.boxBody.addShape(boxShape)
      this.boxBody.position.copy(this.box.position)
  
      this.Iron = new THREE.Object3D()
      this.Iron.add(this.box)
      this.Iron.name = 'Iron'
      this.Iron.traverse(function(object) {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true
          object.receiveShadow = true
        }
      })
    }
  }
  
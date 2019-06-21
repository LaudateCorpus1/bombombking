// 樂高物件
class Col2 {
    constructor(ColGeo, ColMat, boxShape) {
      this.box = new THREE.Mesh(ColGeo, ColMat)
  
      this.boxBody = new CANNON.Body({
        mass: 0,
      })
      this.boxBody.addShape(boxShape)
      this.boxBody.position.copy(this.box.position)
  
      this.Col2 = new THREE.Object3D()
      this.Col2.add(this.box)
      this.Col2.name = 'Col2'
      this.Col2.traverse(function(object) {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true
          object.receiveShadow = true
        }
      })
    }
  }
  
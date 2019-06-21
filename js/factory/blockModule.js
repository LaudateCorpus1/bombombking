// 樂高物件
class Block {
    constructor(boxGeo, downGeo, blockMat, downMat, boxShape) {
      this.box = new THREE.Mesh(boxGeo, blockMat)
  
      this.boxBody = new CANNON.Body({
        mass: 20,
      })
      this.boxBody.addShape(boxShape)
      this.boxBody.position.copy(this.box.position)
      
      this.down = new THREE.Mesh(downGeo, downMat)
      this.down.position.set(0, -0.5, 0)
  
      this.Block = new THREE.Object3D()
      this.Block.add(this.box)
      this.Block.add(this.down)
      this.Block.name = 'Block'
      this.Block.traverse(function(object) {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true
          object.receiveShadow = true
        }
      })
    }
  }
  
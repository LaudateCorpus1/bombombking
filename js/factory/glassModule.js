// 樂高物件
class Light {
    constructor(scale_, colGeo, upGeo, downGeo, colMat, creeperMat, boxShape) {
      
      this.col = new THREE.Mesh(colGeo, creeperMat)
  
      this.boxBody = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(0, 0, 0)
      })
  
  
      this.up1 = new THREE.Mesh(upGeo, colMat)
      this.up1.position.set(0, 0.85*scale_, 0)
      this.down = new THREE.Mesh(downGeo, colMat)
      this.down.position.set(0, -0.9*scale_, 0)
      this.Light = new THREE.Object3D()
      this.Light.add(this.col)
      this.Light.add(this.up1)
      this.Light.add(this.down)
      this.Light.name = 'Light'
      this.boxBody.addShape(boxShape)
      this.boxBody.position.copy(this.Light.position)
      this.Light.traverse(function(object) {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true
          object.receiveShadow = true
        }
      })
    }
  }
  
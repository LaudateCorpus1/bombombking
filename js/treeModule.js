// 樂高物件
class Tree {
  constructor(scale_, branchGeo, leafGeo, branchMat, creeperMat, boxShape) {
    
    this.branch = new THREE.Mesh(branchGeo, branchMat)

    this.boxBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, 0, 0)
    })


    this.up1 = new THREE.Mesh(leafGeo, creeperMat)
    this.up1.position.set(0, -0.3125*scale_, 0)
    this.Tree = new THREE.Object3D()
    this.Tree.add(this.branch)
    this.Tree.add(this.up1)
    this.Tree.name = 'Tree'
    this.boxBody.addShape(boxShape)
    this.boxBody.position.copy(this.Tree.position)
    this.Tree.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}

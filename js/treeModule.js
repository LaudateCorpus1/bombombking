// 樂高物件
class Tree {
  constructor(scale_) {/*
    var loader = new THREE.OBJLoader();
    loader.load('../obj/box1.obj', function(obj) {
        obj.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshLambertMaterial({
                    color: 0xffff00,
                    side: THREE.DoubleSide
                });      
                child.castShadow = true;
                child.receiveShadow = true;
            }
            obj.position.set(100, 100, 100);
            this.lego = obj
        });
    });*/
    const branchGeo = new THREE.CylinderGeometry(0.15*scale_, 0.1*scale_, 2*scale_)
    const leaf1Geo = new THREE.CylinderGeometry(0.45*scale_, 0.5*scale_, 0.375*scale_)
    const leaf2Geo = new THREE.CylinderGeometry(0.35*scale_, 0.4*scale_, 0.375*scale_)
    const leaf3Geo = new THREE.CylinderGeometry(0.25*scale_, 0.3*scale_, 0.375*scale_)
    const leaf4Geo = new THREE.CylinderGeometry(0.15*scale_, 0.2*scale_, 0.38*scale_)
    const branchMat = new THREE.MeshPhongMaterial({ color: 0xC77D33 })
    const creeperMat = new THREE.MeshPhongMaterial({ color: 0x00B500 })
    
    this.branch = new THREE.Mesh(branchGeo, branchMat)
    this.branch.position.set(0, 0, 0)

    
    const boxShape = new CANNON.Box(
      new CANNON.Vec3(0.45 * scale_, 1 * scale_, 0.45 * scale_)
    )
    this.boxBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, 0, 0)
    })


    this.up1 = new THREE.Mesh(leaf1Geo, creeperMat)
    this.up1.position.set(0, -0.3125*scale_, 0)
    this.up2 = new THREE.Mesh(leaf2Geo, creeperMat)
    this.up2.position.set(0, 0.0625*scale_, 0)
    this.up3 = new THREE.Mesh(leaf3Geo, creeperMat)
    this.up3.position.set(0, 0.4375*scale_, 0)
    this.up4 = new THREE.Mesh(leaf4Geo, creeperMat)
    this.up4.position.set(0, 0.8125*scale_, 0)
    this.feet = new THREE.Group()
    this.feet.add(this.up1) // 前腳左
    this.feet.add(this.up2) // 後腳左
    this.feet.add(this.up3) // 前腳右
    this.feet.add(this.up4) // 後腳右
    this.Tree = new THREE.Group()
    this.Tree.add(this.branch)
    this.Tree.add(this.feet)
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

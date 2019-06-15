// 樂高物件
class Lego {
  constructor(color_, scale_) {/*
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
    const boxGeo = new THREE.BoxGeometry(1*scale_, 1*scale_, 1*scale_)
    const upGeo = new THREE.CylinderGeometry(0.15*scale_, 0.15*scale_, 0.3*scale_)
    const creeperMat = new THREE.MeshPhongMaterial({ color: color_ })
    
    this.box = new THREE.Mesh(boxGeo, creeperMat)
    this.box.position.set(0, 0, 0)

    
    const boxShape = new CANNON.Box(
      new CANNON.Vec3(0.45 * scale_, 0.495 * scale_, 0.45 * scale_)
    )
    this.boxBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, 0, 0)
    })
    this.boxBody.addShape(boxShape)
    this.boxBody.position.copy(this.box.position)


    this.up1 = new THREE.Mesh(upGeo, creeperMat)
    this.up1.position.set(0.25*scale_, 0.5*scale_, 0.25*scale_)
    this.up2 = this.up1.clone()
    this.up2.position.set(0.25*scale_, 0.5*scale_, -0.25*scale_)
    this.up3 = this.up1.clone()
    this.up3.position.set(-0.25*scale_, 0.5*scale_, 0.25*scale_)
    this.up4 = this.up1.clone()
    this.up4.position.set(-0.25*scale_, 0.5*scale_, -0.25*scale_)
    this.feet = new THREE.Group()
    this.feet.add(this.up1) // 前腳左
    this.feet.add(this.up2) // 後腳左
    this.feet.add(this.up3) // 前腳右
    this.feet.add(this.up4) // 後腳右
    this.lego = new THREE.Group()
    this.lego.add(this.box)
    this.lego.add(this.feet)
    this.lego.name = 'lego'
    this.lego.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}

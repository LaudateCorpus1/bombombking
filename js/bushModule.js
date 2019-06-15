// 樂高物件
class Bush {
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
    const boxGeo = new THREE.BoxGeometry(0.2*scale_, 0.2*scale_, 0.2*scale_)
    const bigGeo = new THREE.BoxGeometry(0.3*scale_, 0.3*scale_, 0.3*scale_)
    const crueGeo = new THREE.BoxGeometry(0.5*scale_, 0.5*scale_, 0.5*scale_)
    const creeperMat = new THREE.MeshPhongMaterial({ color: 0x00B500 })


    this.up1 = new THREE.Mesh(boxGeo, creeperMat)
    this.up1.position.set(0.35*scale_, 0.6*scale_, 0.35*scale_)
    this.up2 = this.up1.clone()
    this.up2.position.set(-0.3*scale_, 0.5*scale_, 0.3*scale_)
    this.up3 = this.up1.clone()
    this.up3.position.set(-0.35*scale_, 0.4*scale_, 0.25*scale_)
    this.up4 = this.up1.clone()
    this.up4.position.set(0, 0, -0.25*scale_)
    this.up5 = this.up1.clone()
    this.up5.position.set(-0.25*scale_, 0.45*scale_, -0.25*scale_)

    this.big1 = new THREE.Mesh(bigGeo, creeperMat)
    this.big1.position.set(0.2*scale_, 0.1*scale_, 0.2*scale_)
    this.big2 = this.big1.clone()
    this.big2.position.set(-0.2*scale_, 0.5*scale_, -0.15*scale_)
    this.big3 = this.big1.clone()
    this.big3.position.set(-0.15*scale_, -0.1*scale_, 0.2*scale_)
    this.big4 = this.big1.clone()
    this.big4.position.set(0.2*scale_, 0.2*scale_, -0.2*scale_)
    this.big5 = this.big1.clone()
    this.big5.position.set(0.3*scale_, 0.15*scale_, -0.2*scale_)
    this.big6 = this.big1.clone()
    this.big6.position.set(-0.25*scale_, -0.25*scale_, 0.25*scale_)

    this.crue1 = new THREE.Mesh(crueGeo, creeperMat)
    this.crue1.position.set(0, 0, 0)
    this.crue2 = this.crue1.clone()
    this.crue2.position.set(0.1*scale_, 0.4*scale_, 0.15*scale_)
    this.crue3 = this.crue1.clone()
    this.crue3.position.set(-0.15*scale_, 0.2*scale_, 0.1*scale_)
    this.crue4 = this.crue1.clone()
    this.crue4.position.set(-0.1*scale_, -0.25*scale_, -0.1*scale_)


    this.Bush = new THREE.Group()
    this.Bush.add(this.box)
    this.Bush.add(this.up1) 
    this.Bush.add(this.up2) 
    this.Bush.add(this.up3) 
    this.Bush.add(this.up4) 
    this.Bush.add(this.up5) 
    this.Bush.add(this.big1) 
    this.Bush.add(this.big2) 
    this.Bush.add(this.big3) 
    this.Bush.add(this.big4) 
    this.Bush.add(this.big5) 
    this.Bush.add(this.big6) 
    this.Bush.add(this.crue1) 
    this.Bush.add(this.crue2) 
    this.Bush.add(this.crue3) 
    this.Bush.add(this.crue4) 
    this.Bush.name = 'Bush'
    this.Bush.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}

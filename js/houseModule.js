// 樂高物件
class House {
  constructor(color_, scale_) {
    const boxGeo = new THREE.BoxGeometry(1*scale_, 1*scale_, 1*scale_)
    const roofGeo = new THREE.BoxGeometry(1*scale_, 0.4*scale_, 1*scale_)
    const upGeo = new THREE.BoxGeometry(0.25*scale_, 0.3*scale_, 0.25*scale_)
    const creeperMat = new THREE.MeshPhongMaterial({ color: color_ })
    
    const textureLoader = new THREE.TextureLoader()
    const winsowMap = textureLoader.load('./img/window.png')
    const otherMap = textureLoader.load('./img/window_other.png')

    const headMaterials = []
    for (let i = 0; i < 6; i++) {
      let map

      if (i === 4) map = winsowMap
      else map = otherMap

      headMaterials.push(new THREE.MeshPhongMaterial({ map: map }))
    }
    this.box = new THREE.Mesh(boxGeo, headMaterials)
    this.box.position.set(0, -0.2*scale_, 0)

    
    const boxShape = new CANNON.Box(
      new CANNON.Vec3(0.45 * scale_, 0.65 * scale_, 0.45 * scale_)
    )
    this.boxBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, 0, 0)
    })
    this.boxBody.addShape(boxShape)
    this.boxBody.position.copy(this.box.position)


    this.roof = new THREE.Mesh(roofGeo, creeperMat)
    this.roof.position.set(0, 0.5*scale_, 0)

    this.smoke = new THREE.Mesh(upGeo, creeperMat)
    this.smoke.position.set(0.25*scale_, 0.75*scale_, 0)

    this.House = new THREE.Group()
    this.House.add(this.box)
    this.House.add(this.roof)
    this.House.add(this.smoke)
    this.House.name = 'House'
    this.House.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}

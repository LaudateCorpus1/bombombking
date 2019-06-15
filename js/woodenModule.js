// 樂高物件
class Wooden {
  constructor(scale_) {
    const boxGeo = new THREE.BoxGeometry(1*scale_, 1*scale_, 1*scale_)
    const textureLoader = new THREE.TextureLoader()
    const headMap = textureLoader.load('./img/box_up.png')
    const skinMap = textureLoader.load('./img/box_other.png')

    const headMaterials = []
    for (let i = 0; i < 6; i++) {
      let map

      if (i === 2 | i === 3) map = headMap
      else map = skinMap

      headMaterials.push(new THREE.MeshPhongMaterial({ map: map }))
    }
    this.box = new THREE.Mesh(boxGeo, headMaterials)
    this.box.position.set(0, 0, 0)

    
    const boxShape = new CANNON.Box(
      new CANNON.Vec3(0.45 * scale_, 0.5 * scale_, 0.45 * scale_)
    )
    this.boxBody = new CANNON.Body({
      mass: 100 * scale_/5,
      position: new CANNON.Vec3(0, 0, 0)
    })
    this.boxBody.addShape(boxShape)
    this.boxBody.position.copy(this.box.position)

    this.Wooden = new THREE.Group()
    this.Wooden.add(this.box)
    this.Wooden.name = 'Wooden'
    this.Wooden.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}

//001215003571707_063634300410000_002125033573737_363634300421212_121215003573737_262624330012121_454545003545454_121210300416161_838385033521212_212124300436363_808385003512120_001214330436360_808185003521200
const valley = "00121500357170706363430041000000212503357373736363430042121212121500357373726262433001212145454500354545412121030041616183838503352121212124300436363808385003512120001214330436360808185003521200"

function createLego(x, y, z, color, scale) {
  legoObj = new Lego(color, scale)
  world.addBody(legoObj.boxBody)
  scene.add(legoObj.lego)
  legoObj.lego.position.set(x*scale, y*scale, z*scale)
  legoObj.boxBody.position.set(x*scale, y*scale, z*scale)
  boxes.push(legoObj.boxBody)
  boxMeshes.push(legoObj.lego)
}
function createHouse(x, z, color, scale) {
  houseObj = new House(color, scale)
  world.addBody(houseObj.boxBody)
  scene.add(houseObj.House)
  houseObj.House.position.set(x*scale, 0.705*scale, z*scale)
  houseObj.boxBody.position.set(x*scale, 0.705*scale, z*scale)
}
function createWooden(x ,z, scale) {
  woodenObj = new Wooden(scale)
  world.addBody(woodenObj.boxBody)
  scene.add(woodenObj.Wooden)
  woodenObj.Wooden.position.set(x*scale, 0.5*scale, z*scale)
  woodenObj.boxBody.position.set(x*scale, 0.5*scale, z*scale)
  boxes.push(woodenObj.boxBody)
  boxMeshes.push(woodenObj.Wooden)
}
function createTree(x ,z, scale) {
  treeObj = new Tree(scale)
  world.addBody(treeObj.boxBody)
  scene.add(treeObj.Tree)
  treeObj.Tree.position.set(x*scale, 1*scale, z*scale)
  treeObj.boxBody.position.set(x*scale, 1*scale, z*scale)
}
function createBush(x ,z, scale) {
  bushObj = new Bush(scale)
  scene.add(bushObj.Bush)
  bushObj.Bush.position.set(x*scale, 0.5*scale, z*scale)
}

function createScene() {
  for(let now=0; now<195; now++){
    if(valley[now]==1) createLego(now%15-7, 0.5, Math.floor(now/15)-6, 0xff0000, scale)
    else if(valley[now]==2) createLego(now%15-7, 0.5, Math.floor(now/15)-6, 0xff8800, scale)
    else if(valley[now]==3) createWooden(now%15-7, Math.floor(now/15)-6, scale)
    else if(valley[now]==4) createTree(now%15-7, Math.floor(now/15)-6, scale)
    else if(valley[now]==5) createBush(now%15-7, Math.floor(now/15)-6, scale)
    else if(valley[now]==6) createHouse(now%15-7, Math.floor(now/15)-6, 0xff8800, scale)
    else if(valley[now]==7) createHouse(now%15-7, Math.floor(now/15)-6, 0xfadc2e, scale)
    else if(valley[now]==8) createHouse(now%15-7, Math.floor(now/15)-6, 0x51a7f5, scale)
}
  for(let i=-7; i<=7; i++){
    for(let j=-6; j<=6; j++){
      if(i<-1 | i>1) createLego(i, -0.495, j, 0x7Eff00, scale)
    }
  }
  createWall(0, 1)
  createWall(0, -1)
  createWall(1, 1)
  createWall(1, -1)
}

function createWall(IsRotate, x){
  let wallShape = new CANNON.Box(
    new CANNON.Vec3(7.5 * scale, 4 * scale, 0.5 * scale)
  )
  wallBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, 0, 0)
  })
  wallBody.addShape(wallShape)

  // setFromAxisAngle 旋轉 y 軸 -90 度
  if(IsRotate) wallBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  wallBody.position.set(x*8*IsRotate* scale, 4*scale, x*7*!IsRotate* scale)
  world.add(wallBody)
}
/*let explores = []
let exploreMeshes = []
let exploreKind = []
let delete_ = []

let sphereShape = new CANNON.Sphere(1.5)

function explore(thing1, thing2, what) {
  if(what == 'ammo'){
    const xx = thing1.position.x
    const yy = thing1.position.y
    const zz = thing1.position.z

    if (explosion) {
      const len = explosion.length
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          explosion[i].destroy()
        }
      }
      explosion.length = 0
    }

    // 產生爆炸
    explosion[0] = new Explosion(xx, yy, zz, 0x000000)
    explosion[1] = new Explosion(xx + 5, yy + 5, zz + 5, 0x333333)
    explosion[2] = new Explosion(xx - 5, yy + 5, zz + 10, 0x666666)
    explosion[3] = new Explosion(xx - 5, yy + 5, zz + 5, 0x999999)
    explosion[4] = new Explosion(xx + 5, yy + 5, zz - 5, 0xcccccc)

    thing2.geometry.dispose()
    world.remove(thing1)
    scene.remove(thing2)
  }
  else if(what == 'box'){
    thing2.geometry.dispose()
    world.remove(thing1)
    scene.remove(thing2)
  }
}
//x是玩家的座標 
//xx是水球的座標
//xxx是其他可能被炸掉的東西的座標
function check_explore(ammoBody) {
  const xx = ammoBody.position.x
  const yy = ammoBody.position.y
  const zz = ammoBody.position.z
  var x = playerBody.position.x;
  var y = playerBody.position.y;
  var z = playerBody.position.z;
  if((x-xx)*(x-xx) + (y-yy)*(y-yy) + (z-zz)*(z-zz) <= 125*scale*scale){
    var die = setInterval(function(){
      handleEndGame();
      clearInterval(die);
    }, 300);
    //handleEndGame();
  }
  if(playerBody.first == true){
    var xxx = playerBody.firstAmmo.position.x
    var yyy = playerBody.firstAmmo.position.y
    var zzz = playerBody.firstAmmo.position.z
    if((xxx-xx)*(xxx-xx) + (yyy-yy)*(yyy-yy) + (zzz-zz)*(zzz-zz) <= 125*scale*scale){
      console.log('first bomb')
      playerBody.first = false
      explores.push(playerBody.firstAmmo)
      exploreMeshes.push(playerBody.firstAmmoMesh)
      exploreKind.push('ammo')
      check_explore(playerBody.firstAmmo)
    }
  }
  if(playerBody.second == true){
    var xxx = playerBody.secondAmmo.position.x
    var yyy = playerBody.secondAmmo.position.y
    var zzz = playerBody.secondAmmo.position.z
    if((xxx-xx)*(xxx-xx) + (yyy-yy)*(yyy-yy) + (zzz-zz)*(zzz-zz) <= 125*scale*scale){
      console.log('second bomb')
      playerBody.second = false
      explores.push(playerBody.secondAmmo)
      exploreMeshes.push(playerBody.secondAmmoMesh)
      exploreKind.push('ammo')
      check_explore(playerBody.secondAmmo)
    }
  }
  if(playerBody.third == true){
    var xxx = playerBody.thirdAmmo.position.x
    var yyy = playerBody.thirdAmmo.position.y
    var zzz = playerBody.thirdAmmo.position.z
    if((xxx-xx)*(xxx-xx) + (yyy-yy)*(yyy-yy) + (zzz-zz)*(zzz-zz) <= 125*scale*scale){
      console.log('third bomb')
      playerBody.third = false
      explores.push(playerBody.thirdAmmo)
      exploreMeshes.push(playerBody.thirdAmmoMesh)
      exploreKind.push('ammo')
      check_explore(playerBody.thirdAmmo)
    }
  }
  for(var i=0; i<boxes.length; i++){
    var xxx = boxes[i].position.x
    var yyy = boxes[i].position.y
    var zzz = boxes[i].position.z
    if((xxx-xx)*(xxx-xx) + (yyy-yy)*(yyy-yy) + (zzz-zz)*(zzz-zz) <= 125*scale*scale){
      explores.push(boxes[i])
      exploreMeshes.push(boxMeshes[i])
      exploreKind.push('box')
    }
  }
  for(var i=0; i < explores.length; i++){
    explore(explores[i], exploreMeshes[i], exploreKind[i])
  }
  explores.length = 0;
  exploreMeshes.length = 0;
  exploreKind.length = 0;
}

// shooting related settings
let shootDirection = new THREE.Vector3()
let raycaster = new THREE.Raycaster() // create once
let mouse = new THREE.Vector2() // create once

function getShootDir(event, targetVec) {
  // 取得滑鼠在網頁上 (x, y) 位置
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // 透過 raycaster 取得目前玩家朝向方向
  raycaster.setFromCamera(mouse, camera)

  // 取得 raycaster 方向並決定發射方向
  targetVec.copy(raycaster.ray.direction)
}

// shooting event
window.addEventListener('click', function(e) {
  if (controls.enabled == true) {
    // 取得目前玩家位置
    let x = playerBody.position.x
    let y = playerBody.position.y
    let z = playerBody.position.z

    // 左鍵（1）射擊與右鍵（3）疊磚
    if (e.which === 1) {
      if(playerBody.bomb >= 3) return; 
      console.log(x, y, z)
  
      // 子彈剛體與網格
      const ammoObj = new Ball(scale)
      world.addBody(ammoObj.ammoBody)
      scene.add(ammoObj.ammoMesh)

      explores.push(ammoObj.ammoBody)
      exploreMeshes.push(ammoObj.ammoMesh)
      exploreKind.push('ammo')
      
      var nowBomb = playerBody.first ? playerBody.second ? 3 : 2 :  1;
      if(nowBomb == 1){
        playerBody.firstAmmo = ammoObj.ammoBody;
        playerBody.firstAmmoMesh = ammoObj.ammoMesh;
        playerBody.first = true;
      }
      else if(nowBomb == 2){
        playerBody.secondAmmo = ammoObj.ammoBody;
        playerBody.secondAmmoMesh = ammoObj.ammoMesh;
        playerBody.second = true;
      }
      else if(nowBomb == 3){
        playerBody.thirdAmmo = ammoObj.ammoBody;
        playerBody.thirdAmmoMesh = ammoObj.ammoMesh;
        playerBody.third = true;
      }
      playerBody.bomb = playerBody.bomb + 1;

      // 讓水球再產生過後5秒消失
      var id = setInterval(async function() {  
        if((nowBomb==1 && playerBody.first) || (nowBomb==2 && playerBody.second) || (nowBomb==3 && playerBody.third)) await check_explore(ammoObj.ammoBody)
        playerBody.bomb = playerBody.bomb - 1;
        clearInterval(id)
      }, 5000);

      getShootDir(e, shootDirection)
      // Move the ball outside the player sphere
      x += shootDirection.x * (0.75*scale)
      y = 0.5*scale
      z += shootDirection.z * (0.75*scale)
      ammoObj.ammoBody.position.set(x, y, z)
      ammoObj.ammoMesh.position.set(x, y, z)

    }
  }
})*/
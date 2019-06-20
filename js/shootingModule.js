let explores = []
let exploreMeshes = []
let exploreKind = []
let delete_ = []
let item = []
let item_exist = []

let sphereShape = new CANNON.Sphere(1.5)

function explore(xx, zz) {
  //explosion[ex_now++] = new Explosion(xx, 0.5*scale, zz, 0x000000, scale)
  let yy = 0.5*scale
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
  let b, bmesh, bkind
  let ex = []
  let exm = []
  let exk = ['n', 'n', 'n', 'n']
  let dir_len =[-1, -1, -1, -1]
  for(var i=0; i < explores.length; i++){
    if (Math.round(exploreMeshes[i].position.z)==zz && Math.round(exploreMeshes[i].position.x)==xx){
      b=explores[i]
      bmesh=exploreMeshes[i]
      bkind=exploreKind[i]
    }
    else if (Math.abs(Math.round(exploreMeshes[i].position.x)-xx)<=playerBody.len && Math.round(exploreMeshes[i].position.z)==zz) {
      if(Math.round(exploreMeshes[i].position.x)-xx>0) {
        if (dir_len[0]==-1 | dir_len[0]>Math.abs(Math.round(exploreMeshes[i].position.x)-xx)){
          dir_len[0] = Math.abs(Math.round(exploreMeshes[i].position.x)-xx)
          ex[0]=explores[i]
          exm[0]=exploreMeshes[i]
          exk[0]=exploreKind[i]
        }
      }else if (Math.round(exploreMeshes[i].position.x)-xx<0){
        if (dir_len[1]==-1 | dir_len[1]>Math.abs(Math.round(exploreMeshes[i].position.x)-xx)){
          dir_len[1] = Math.abs(Math.round(exploreMeshes[i].position.x)-xx)
          ex[1]=explores[i]
          exm[1]=exploreMeshes[i]
          exk[1]=exploreKind[i]
        }
      }
    }
    if (Math.abs(Math.round(exploreMeshes[i].position.z)-zz)<=playerBody.len && Math.round(exploreMeshes[i].position.x)==xx) {
      if(Math.round(exploreMeshes[i].position.z)-zz>0) {
        if (dir_len[2]==-1 | dir_len[2]>Math.abs(Math.round(exploreMeshes[i].position.z)-zz)){
          dir_len[2] = Math.abs(Math.round(exploreMeshes[i].position.z)-zz)
          ex[2]=explores[i]
          exm[2]=exploreMeshes[i]
          exk[2]=exploreKind[i]
        }
      }else if (Math.round(exploreMeshes[i].position.z)-zz<0){
        if (dir_len[3]==-1 | dir_len[3]>Math.abs(Math.round(exploreMeshes[i].position.z)-zz)){
          dir_len[3] = Math.abs(Math.round(exploreMeshes[i].position.z)-zz)
          ex[3]=explores[i]
          exm[3]=exploreMeshes[i]
          exk[3]=exploreKind[i]
        }
      }
    }
  }
  if (b){
    var index = explores.indexOf(b);
    if (index> -1){
      explores.splice(index, 1);
      exploreMeshes.splice(index, 1);
      exploreKind.splice(index, 1);
    }
    if(bmesh.geometry) bmesh.geometry.dispose()
    world.remove(b)
    scene.remove(bmesh)
  }
  for (let i=0; i<4; i++){
    if(dir_len[i]==-1 || exk[i]=='n' || exk[i]=='Tree' || exk[i] == 'House') continue
    if(Math.random() > 0){
      let boxObj = new Box(scale);
      scene.add(boxObj.ammoMesh)
      boxObj.ammoBody.position.set(ex[i].position.x, 0.5, ex[i].position.z)
      boxObj.ammoMesh.position.set(ex[i].position.x, 0.5, ex[i].position.z)
      item.push(boxObj)
      item_exist.push(true)
    }
    var index = explores.indexOf(ex[i]);
    if (index> -1){
      explores.splice(index, 1);
      exploreMeshes.splice(index, 1);
      exploreKind.splice(index, 1);
    }
    if(exm[i].geometry) exm[i].geometry.dispose()
    world.remove(ex[i])
    scene.remove(exm[i])
  }
}
//x是玩家的座標 
//xx是水球的座標
//xxx是其他可能被炸掉的東西的座標
function check_explore(ammoBody) {
  playerBody.bomb--
  const xx = ammoBody.position.x
  const yy = ammoBody.position.y
  const zz = ammoBody.position.z
  var x = playerBody.position.x;
  var y = playerBody.position.y;
  var z = playerBody.position.z;/*
  if((x-xx)*(x-xx) + (y-yy)*(y-yy) + (z-zz)*(z-zz) <= 125*scale*scale){
    var die = setInterval(function(){
      handleEndGame();
      clearInterval(die);
    }, 300);
    //handleEndGame();
  }*/
  if(playerBody.first == true){
    var xxx = playerBody.firstAmmo.position.x
    var yyy = playerBody.firstAmmo.position.y
    var zzz = playerBody.firstAmmo.position.z
    if( (Math.abs(xxx-xx)<=playerBody.len && zzz==zz) || 
         (Math.abs(zzz-zz)<=playerBody.len && xxx==xx) ){
      let jump = false
      for(var i=0; i < explores.length; i++){
        if ( ((zzz-zz)==0 && Math.round(exploreMeshes[i].position.z)-zz==0 && (xxx-xx)*(Math.round(exploreMeshes[i].position.x)-xx)>0 && Math.abs(Math.round(exploreMeshes[i].position.x)-xx) < Math.abs(xxx-xx)) ||
             ((xxx-xx)==0 && Math.round(exploreMeshes[i].position.x)-xx==0 && (zzz-zz)*(Math.round(exploreMeshes[i].position.z)-zz)>0 && Math.abs(Math.round(exploreMeshes[i].position.z)-zz) < Math.abs(zzz-zz)) ){
          jump = true
          break
        }
      }
      if(!jump){
        console.log('first bomb')
        playerBody.first = false
        check_explore(playerBody.firstAmmo)
        playerBody.firstAmmoMesh.geometry.dispose()
        world.remove(playerBody.firstAmmo)
        scene.remove(playerBody.firstAmmoMesh)
      }
    }
  }
  if(playerBody.second == true){
    var xxx = playerBody.secondAmmo.position.x
    var yyy = playerBody.secondAmmo.position.y
    var zzz = playerBody.secondAmmo.position.z
    if( (Math.abs(xxx-xx)<=playerBody.len && zzz==zz) || 
         (Math.abs(zzz-zz)<=playerBody.len && xxx==xx) ){
      let jump = false
      for(var i=0; i < explores.length; i++){
        if ( ((zzz-zz)==0 && Math.round(exploreMeshes[i].position.z)-zz==0 && (xxx-xx)*(Math.round(exploreMeshes[i].position.x)-xx)>0 && Math.abs(Math.round(exploreMeshes[i].position.x)-xx) < Math.abs(xxx-xx)) ||
             ((xxx-xx)==0 && Math.round(exploreMeshes[i].position.x)-xx==0 && (zzz-zz)*(Math.round(exploreMeshes[i].position.z)-zz)>0 && Math.abs(Math.round(exploreMeshes[i].position.z)-zz) < Math.abs(zzz-zz)) ){
          jump = true
          break
        }
      }
      if(!jump){
        console.log('second bomb')
        playerBody.second = false
        check_explore(playerBody.secondAmmo)
        playerBody.secondAmmoMesh.geometry.dispose()
        world.remove(playerBody.secondAmmo)
        scene.remove(playerBody.secondAmmoMesh)
      }
    }
  }
  if(playerBody.third == true){
    var xxx = playerBody.thirdAmmo.position.x
    var yyy = playerBody.thirdAmmo.position.y
    var zzz = playerBody.thirdAmmo.position.z
    if( (Math.abs(xxx-xx)<=playerBody.len && zzz==zz) || 
         (Math.abs(zzz-zz)<=playerBody.len && xxx==xx) ){
      let jump = false
      for(var i=0; i < explores.length; i++){
        if ( ((zzz-zz)==0 && Math.round(exploreMeshes[i].position.z)-zz==0 && (xxx-xx)*(Math.round(exploreMeshes[i].position.x)-xx)>0 && Math.abs(Math.round(exploreMeshes[i].position.x)-xx) < Math.abs(xxx-xx)) ||
             ((xxx-xx)==0 && Math.round(exploreMeshes[i].position.x)-xx==0 && (zzz-zz)*(Math.round(exploreMeshes[i].position.z)-zz)>0 && Math.abs(Math.round(exploreMeshes[i].position.z)-zz) < Math.abs(zzz-zz)) ){
          jump = true
          break
        }
      }
      if(!jump){
        console.log('third bomb')
        playerBody.third = false
        check_explore(playerBody.thirdAmmo)
        playerBody.thirdAmmoMesh.geometry.dispose()
        world.remove(playerBody.thirdAmmo)
        scene.remove(playerBody.thirdAmmoMesh)
      }
    }
  }
  explore(xx, zz)
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

window.addEventListener('mousedown', function(e) {
  this.console.log("mouse down")
  x = playerBody.position.x
  y = playerBody.position.y
  z = playerBody.position.z
  getShootDir(e, shootDirection)
  target_shootDirection = shootDirection
  x += shootDirection.x * (sphereShape.radius*0.5)
  z += shootDirection.z * (sphereShape.radius*0.5)
  target_x = x
  target_y = y
  target_z = z
 
  isTarget = true
})
window.addEventListener('mousemove', function(e){
  getShootDir(e, shootDirection)
  target_shootDirection = shootDirection
})
// shooting event
window.addEventListener('mouseup', function(e) {
  isTarget = false
  if (controls.enabled == true) {
    // 取得目前玩家位置
    let x = playerBody.position.x
    let y = playerBody.position.y
    let z = playerBody.position.z
    getShootDir(e, shootDirection)
    x += shootDirection.x * (sphereShape.radius*0.5)
    z += shootDirection.z * (sphereShape.radius*0.5)

    // 左鍵（1）射擊與右鍵（3）疊磚
    if (e.which === 1) {
      for(var i=0; i < explores.length; i++){
        if (Math.round(exploreMeshes[i].position.z)==Math.round(z) && Math.round(exploreMeshes[i].position.x)==Math.round(x)){
          if (exploreKind[i] == 'Bush') continue
          return
        }
      }
      //判斷水球數量、以及是否超出地圖
      if(playerBody.bomb >= 3 || Math.abs(Math.round(x))>7 || Math.abs(Math.round(z))>6) return; 
      //console.log(x, y, z)
  
      // 子彈剛體與網格
      const ammoObj = new Ball(scale)
      scene.add(ammoObj.ammoMesh)
      world.addBody(ammoObj.ammoBody)
/*
      explores.push(ammoObj.ammoBody)
      exploreMeshes.push(ammoObj.ammoMesh)
      exploreKind.push('ammo')*/
      
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
        if (nowBomb==1 && playerBody.first) {
          playerBody.first = false
          await check_explore(ammoObj.ammoBody)
        }
        else if (nowBomb==2 && playerBody.second) {
          playerBody.second = false
          await check_explore(ammoObj.ammoBody)
        }
        else if (nowBomb==3 && playerBody.third) {
          playerBody.third = false
          await check_explore(ammoObj.ammoBody)
        } 
        ammoObj.ammoMesh.geometry.dispose()
        world.remove(ammoObj.ammoBody)
        scene.remove(ammoObj.ammoMesh)
        clearInterval(id)
      }, 5000);

      ammoObj.ammoBody.position.set(Math.round(x), 0.5*scale, Math.round(z))
      ammoObj.ammoMesh.position.set(Math.round(x), 0.5*scale, Math.round(z))

    }
  }
})
function moveAndLookAt(camera, dstpos, dstlookat, options) {
  options || (options = {duration: 300});

  var origpos = new THREE.Vector3().copy(camera.position); // 初始位置
  var origrot = new THREE.Euler().copy(camera.rotation); // 初始欧拉角

  camera.position.set(dstpos.x, dstpos.y, dstpos.z);
  camera.lookAt(dstlookat);
  var dstrot = new THREE.Euler().copy(camera.rotation);//先设置到最终位置得到终点位置的欧拉角

  // 重设相机初始位置与初始四元数
  camera.position.set(origpos.x, origpos.y, origpos.z);
  camera.rotation.set(origrot.x, origrot.y, origrot.z);
  //
  // 定义tween
  //
  
  // 位置函数
  new TWEEN.Tween(camera.position).to({
    x: dstpos.x,
    y: dstpos.y,
    z: dstpos.z
  }, options.duration).start();

  // 旋转 (运用球形插值法)
  (function () {
    var qa = camera.quaternion; // 相机的四元数
    var qb = new THREE.Quaternion().setFromEuler(dstrot); // 终点四元数值
    var qm = new THREE.Quaternion();//空的四元数
    camera.quaternion = qm;
    
    var o = {t: 0};
    new TWEEN.Tween(o).to({t: 0.3}, options.duration).onUpdate(function () {
      THREE.Quaternion.slerp(qa, qb, qm, o.t);
      camera.quaternion.set(qm.x, qm.y, qm.z, qm.w);
    }).start();
  }).call(this);
}
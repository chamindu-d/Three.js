// SIMULATE the moon's orbit around the earth
function runMoonEarthOrbit(environment) {

  const light = new THREE.PointLight('white', 2, 0, 2);
  light.position.set(0, 0, 500);
  environment.scene.add(light);

  const earth = new PhysicsBody(6.371, 5.972 * Math.pow(10, 7), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('resources/img/earth_texture.jpg')
  }));

  earth.mesh.position.set(0, 0, 0);
  environment.scene.add(earth.mesh);

  const moon = new PhysicsBody(1.737, 7.348 * Math.pow(10, 5), new THREE.MeshLambertMaterial({
    color: 'lightgray'
  }));

  moon.mesh.position.set(0, 0, 384.4);
  moon.velocity = new THREE.Vector3(2, 0, 0);
  environment.scene.add(moon.mesh);

  environment.handleRendering(function () {

    moon.stagePhysicsAround(earth);

    earth.mesh.rotation.y += 0.0025;

    environment.renderer.render(environment.scene, environment.camera);

  });

}

// SIMULATE Hohmann transfer motion
function runHohmannTransfer(environment, boost) {

  environment.handleRendering(function () {

    console.log(boost);

    environment.renderer.render(environment.scene, environment.camera);

  });

}

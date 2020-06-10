const keys = [];

function main() {

  if (graphicsAvailable() == true) {

    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);

    handleEnvironment();

  } else {

    console.log("WebGL Graphics are not available.");
    alert("WebGL Graphics are not available.");

  }

}

function handleEnvironment() {

  const environment = new Environment('white');

  const controls = new THREE.OrbitControls(environment.camera, environment.renderer.domElement);
  controls.target = new THREE.Vector3(0, 0, 0);
  controls.minDistance = 15;
  controls.maxDistance = 700;
  controls.enablePan = false;
  environment.camera.position.y = 200;
  controls.update();

  const backgroundTexture = new THREE.CubeTextureLoader().load([
      'resources/img/background_map_horizontal.jpg',
      'resources/img/background_map_horizontal.jpg',
      'resources/img/background_map_vertical.jpg',
      'resources/img/background_map_vertical.jpg',
      'resources/img/background_map_horizontal.jpg',
      'resources/img/background_map_horizontal.jpg'
  ]);

  backgroundTexture.minFilter = THREE.LinearFilter;
  environment.scene.background = backgroundTexture;

  const light = new THREE.PointLight('white', 2, 0, 2);
  light.position.set(0, 0, 500);
  environment.scene.add(light);

  const earth = new PhysicsBody(6.371, 5.972 * Math.pow(10, 7), new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('resources/img/earth_texture.jpg')}));
  earth.mesh.position.set(0, 0, 0);
  environment.scene.add(earth.mesh);

  const moon = new PhysicsBody(1.737, 7.348 * Math.pow(10, 5), new THREE.MeshLambertMaterial({color: 'lightgray'}));
  moon.mesh.position.set(0, 0, 384.4);
  moon.velocity = new THREE.Vector3(2, 0, 0);
  environment.scene.add(moon.mesh);

  environment.handleRendering(function () {

    moon.stagePhysicsAround(earth);

    // Rotate earth around its axis
    earth.mesh.rotation.y += 0.0025;

    environment.renderer.render(environment.scene, environment.camera);

  });

}

function keydown(event) {
  keys[event.keyCode] = true;
}

function keyup(event) {
  keys[event.keyCode] = false;
}

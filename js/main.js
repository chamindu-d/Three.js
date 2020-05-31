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

  const light = new THREE.DirectionalLight('white', 1.5);
  light.position.set(0, 0, -100);
  environment.scene.add(light);

  const earth = new PhysicsBody(new THREE.Mesh(new THREE.SphereGeometry(1, 40, 40), new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('resources/img/earth_texture.jpg')})), 10);
  earth.mesh.position.set(0, 0, 0);
  environment.scene.add(earth.mesh);

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

  // const controls = new THREE.OrbitControls(environment.camera, environment.renderer.domElement);
  // controls.enablePan = false;
  // environment.camera.position.z = 5;
  // controls.update();

  var cameraAngles = {x: 0, y: 0};
  var zoom = 5;

  environment.handleRendering(function () {

    // Rotate camera around earth
    cameraAngles = rotateAroundObject(environment.camera, earth.mesh, zoom, 0.02, cameraAngles, keys[37], keys[39], keys[38], keys[40]);

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

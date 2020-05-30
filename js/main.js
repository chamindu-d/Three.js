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

  const environment = new Environment();
  environment.setup('white');

  const controls = new THREE.OrbitControls(environment.camera, environment.renderer.domElement);

  const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 40), new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('resources/img/earth_texture.jpg')}));
  environment.scene.add(earth);

  const light = new THREE.DirectionalLight('white', 1.5);
  light.position.set(0, 0, -100);
  environment.scene.add(light);

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

  environment.camera.position.z = 5;
  controls.update();

  environment.handleRendering(function () {

    earth.rotation.y += 0.005
    environment.renderer.render(environment.scene, environment.camera);

  });

}

function keydown(event) {
  keys[event.keyCode] = true;
}

function keyup(event) {
  keys[event.keyCode] = false;
}

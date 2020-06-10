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

  const environment = new PhysicsEnvironment(new THREE.Vector3(0, 0, 100));

  // Set the space field scene background

  environment.setSceneBackground([
      'resources/img/background_map_horizontal.jpg',
      'resources/img/background_map_horizontal.jpg',
      'resources/img/background_map_vertical.jpg',
      'resources/img/background_map_vertical.jpg',
      'resources/img/background_map_horizontal.jpg',
      'resources/img/background_map_horizontal.jpg'
  ]);

  // Run a simulation
  // runHohmannTransfer(environment, (keys[38] == true));
  runMoonEarthOrbit(environment);

}

function keydown(event) {
  keys[event.keyCode] = true;
}

function keyup(event) {
  keys[event.keyCode] = false;
}

// Class for a Physics Environment
class PhysicsEnvironment {

  constructor(cameraPosition = new THREE.Vector3(0, 0, 0), backgroundColor = 'white') {

    // Configure Main Properties

    this.fps = 60;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(backgroundColor);

    // Configure Orbit Controls

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target = new THREE.Vector3(0, 0, 0);
    this.controls.minDistance = 15;
    this.controls.maxDistance = 700;
    this.controls.enablePan = false;
    this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    this.controls.update();

    document.body.appendChild(this.renderer.domElement);

  }

  // Set a cubemap background on the environment scene
  setSceneBackground(textures) {

    const backgroundTexture = new THREE.CubeTextureLoader().load(textures);
    backgroundTexture.minFilter = THREE.LinearFilter;

    this.scene.background = backgroundTexture;

  }

  // Handle the environment scene rendering loop
  handleRendering(timer) {

    setInterval(timer, 1000 / this.fps);

  }

}

// Class for a property orientated physical body
class PhysicsBody {

  constructor(radius, mass, material) {

    this.radius = radius;
    this.mass = mass;
    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 100, 100), material);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.gAcceleration = (6.67430 * Math.pow(10, -11)) * this.mass;

  }

  stagePhysicsAround(object) {

    const gravity = object.gAcceleration * (this.mass / Math.pow(distanceBetween(this, object), 2));

    this.acceleration = directionalVector(this, object, gravity);
    this.velocity.add(this.acceleration);
    this.mesh.position.add(this.velocity);

  }

}

// -------- Subroutines

// Rotate a camera around a specific point based on input
function rotateAroundObject(camera, object, radius, scale, anglePair, xPositive, xNegative, yPositive, yNegative) {

  anglePair.x += (xPositive == true) ? scale : 0;
  anglePair.x -= (xNegative == true) ? scale : 0;

  camera.position.x = radius * Math.sin(anglePair.x);
  camera.position.z = -radius * Math.cos(anglePair.x);

  camera.lookAt(object.position);

  return anglePair;

}

// Find a vector directed towards another PhysicsBody object given a magnitude
function directionalVector(source, destination, magnitude) {

  const xDistance = source.mesh.position.x - destination.mesh.position.x;
  const yDistance = source.mesh.position.y - destination.mesh.position.y;
  const zDistance = source.mesh.position.z - destination.mesh.position.z;
  const horizontalDistance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(zDistance, 2));

  const theta = Math.asin(xDistance / horizontalDistance) + (Math.PI / 2);
  const horizontalFactor = (zDistance != 0) ? -(zDistance / Math.abs(zDistance)) : 0;
  const verticalFactor = (yDistance != 0) ? -(yDistance / Math.abs(yDistance)) : 0;

  const directionalVector = new THREE.Vector3(magnitude * Math.cos(theta), verticalFactor * magnitude, horizontalFactor * magnitude * Math.sin(theta));

  return directionalVector;

}

// Find the distance between two PhysicsBody objects
function distanceBetween(a, b) {
  return a.mesh.position.distanceTo(b.mesh.position);
}

// Check if WebGL is supported on the client
function graphicsAvailable() {
  return (document.createElement('canvas').getContext('webgl') !=  null);
}

// (testing purposes only)
function displayVector(vector, isAlert) {
  (isAlert == true) ? alert(vector.x + "," + vector.y + "," + vector.z) : console.log(vector.x + "," + vector.y + "," + vector.z);
}

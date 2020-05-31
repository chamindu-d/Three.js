// Class for a Three.JS Environment
class Environment {

  constructor(backgroundColor) {

    this.fps = 60;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(backgroundColor);

    document.body.appendChild(this.renderer.domElement);

  }

  handleRendering(timer) {

    setInterval(timer, 1000 / this.fps);

  }

}

// Class for a property orientated physical body
class PhysicsBody {

  constructor(mesh, mass) {

    this.mesh = mesh;
    this.mass = mass;
    this.radius = this.mesh.geometry.parameters.radius;
    this.velocity = new THREE.Vector3(2, 3, 4);
    this.momentum = this.velocity.multiplyScalar(this.mass);
    this.gravityAcceleration = (6.67430 * Math.pow(10, -11)) * this.mass / Math.pow(this.radius, 2);

  }

}

// Rotate a camera around a specific point based on input
function rotateAroundObject(camera, object, radius, scale, anglePair, xPositive, xNegative, yPositive, yNegative) {

  anglePair.x += (xPositive == true) ? scale : 0;
  anglePair.x -= (xNegative == true) ? scale : 0;

  camera.position.x = radius * Math.sin(anglePair.x);
  camera.position.z = -radius * Math.cos(anglePair.x);

  camera.lookAt(object.position);

  return anglePair;

}

// Check if WebGL is supported on the client
function graphicsAvailable() {
  return (document.createElement('canvas').getContext('webgl') !=  null);
}

// Convert radians to degrees
function degrees(radians) {
  return radians * 180 / Math.PI;
}

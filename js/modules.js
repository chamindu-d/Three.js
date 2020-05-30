//Main Class
class Environment {

  setup(backgroundColor) {

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

// Other Classes
class Body {

  constructor(mesh, mass) {

    this.mesh = mesh;
    this.mass = mass;
    this.radius = mesh.radius;

  }

}

// Other Subroutines

function graphicsAvailable() {
  return (document.createElement('canvas').getContext('webgl') !=  null)
}

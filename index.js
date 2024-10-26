import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

document.body.style.margin = '0px';

// Configuración inicial del renderer
const render = new THREE.WebGLRenderer({ antialias: true });
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

// Configuración de la cámara
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

// Configuración de la escena
const scene = new THREE.Scene();

const geo = new THREE.IcosahedronGeometry(2, 2);
const geo2 = new THREE.BoxGeometry(2.33, 2.33, 2.33, 4, 4, 4);
const geo3 = new THREE.TorusKnotGeometry(1.2, 0.4, 32, 8);
const geo4 = new THREE.TorusGeometry(1, 0.4, 16, 12);
 

const mat = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    flatShading: false
});
const wireMat = new THREE.MeshNormalMaterial({
    wireframe: true
});
const mesh = new THREE.Mesh(geo, mat);
const wireMesh = new THREE.Mesh(geo, wireMat);  // Creamos un objeto con material de alambre

// Configuración de la iluminación
const hemiLight = new THREE.HemisphereLight(0xff00bb, 0x0808ff);
scene.add(hemiLight);

// Configuración de controles
const controls = new OrbitControls(camera, render.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Agregamos el objeto con material de alambre al objeto principal
scene.add(mesh);
mesh.add(wireMesh);

// Función de ajuste al redimensionar
function onWindowResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    render.setSize(w, h);  // Ajusta el tamaño del renderizador
    camera.aspect = w / h;  // Ajusta la relación de aspecto de la cámara
    camera.updateProjectionMatrix();  // Actualiza la matriz de proyección de la cámara
}

// Evento de escucha para redimensionar la ventana
window.addEventListener('resize', onWindowResize);

// Cambiar de geometría
function changeGeometry() {
    if (mesh.geometry === geo) {
        mesh.geometry = geo2;
        wireMesh.geometry = geo2;
    } else if (mesh.geometry === geo2) {
        mesh.geometry = geo3;
        wireMesh.geometry = geo3;
    } else if (mesh.geometry === geo3) {
        mesh.geometry = geo4;
        wireMesh.geometry = geo4;
    } else if (mesh.geometry === geo4) {
        mesh.geometry = geo;
        wireMesh.geometry = geo;
    }
}

// Cambiar el material de alambre
function changeMaterial() {
    if (mesh.material === mat) {
        mesh.material = wireMat;
    } else {
        mesh.material = mat;
    }
}

// Cambiar luces
function changeLight() {
    if (hemiLight.color.getHex() === 0xff00bb) {
        hemiLight.color.setHex(0x08ffff );
    } else if (hemiLight.color.getHex() === 0x08ffff) {
        hemiLight.color.setHex(0x2f0010);
    } else if (hemiLight.color.getHex() === 0x2f0010) {
        hemiLight.color.setHex(0x00ff00);
    } else {
        hemiLight.color.setHex(0xff00bb);
    }
}

// manual de uso
function manual() {
    alert(" Hi, kaio-rama's here! This is a simple 3D model viewer made with Three.js.\n" +
          "\n" +
          "How to use it:\n" +
          "1. Click on the button 'Change Geometry' to change the geometry of the model.\n" +
          "2. Click on the button 'Change Material' to change the material of the model.\n" +
          "3. Click on the button 'Change Light' to change the light of the model (only for the shaded model).\n" +
          "4. Interact with the model using your mouse :A ");
}

document.getElementById('changeGeometry').addEventListener('click', changeGeometry);
document.getElementById('changeMaterial').addEventListener('click', changeMaterial);
document.getElementById('changeLight').addEventListener('click', changeLight);
document.getElementById('manual').addEventListener('click', manual);

// Animación
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.003;
    mesh.rotation.x += 0.002;
    render.render(scene, camera);
    controls.update();
}

animate();

/*
**********************************************************
                INIT THE SCENE
**********************************************************
*/
// Init scene
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// Add Lights ( -- Not needed with Normal Shader -- )
let light = new THREE.DirectionalLight( 0xffffff, 3, 10 );
light.position.set( 0, 1, 0 );
light.castShadow = true;
scene.add( light );

let backLight = new THREE.DirectionalLight( 0xffffff, 3, 10 );
backLight.position.set( 1, 1, 1 );
backLight.castShadow = true;
scene.add( backLight );


var light2 = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
scene.add( light2 );

/*
**********************************************************
                INIT OF 3D MODS & SHADERS
**********************************************************
*/
// Create Normal Wireframe Shader
let normalWireMaterial = new THREE.MeshNormalMaterial({wireframe: false, side: THREE.DoubleSide} );
let trueNormalWireMaterial = new THREE.MeshLambertMaterial({wireframe: false, side: THREE.DoubleSide} );

// 1.
// Create Icosahedron
let icoGeometry = new THREE.IcosahedronGeometry( 2, 0 );
let icosahedron = new THREE.Mesh( icoGeometry, normalWireMaterial );
scene.add( icosahedron );
// Adjust Icosahedron
icosahedron.position.x = -1;
icosahedron.rotation.x = 90;

// 2.
// Create Box
let boxGeometry = new THREE.BoxGeometry( 2, 2, 2 );
let box = new THREE.Mesh( boxGeometry, normalWireMaterial );
// scene.add( box );
// Adjust Box
box.position.x = -1;
box.rotation.x = 90;

// 3.
// Create Sphere
let sphereGeometry = new THREE.SphereGeometry( 2, 8, 8 );;
let sphere = new THREE.Mesh( sphereGeometry, normalWireMaterial );
// scene.add( sphere );
// Adjust Sphere
sphere.position.x = -1;
sphere.rotation.x = 90;


// 4.
// Create Custom Model imported from BLENDER
let chairLoader = new THREE.GLTFLoader();
let potLoader = new THREE.GLTFLoader();
let gardenChairLoader = new THREE.GLTFLoader();

// Load a glTF resource
chairLoader.load(
    // resource URL
    'res/chair_wood.gltf',
    // called when the resource is loaded
    function ( gltf ) {

        blub = gltf.scene.children[0];
        // add Normal Wire Shader
        colorValue = 0.0;
        blub.material.emissive.r = colorValue;
        blub.material.emissive.g = colorValue;
        blub.material.emissive.b = colorValue;
        blub.material.roughness = 0.9;
        blub.position.x = -1;
        blub.position.y = -1;
        
        function animate() {
            requestAnimationFrame( animate ) 
                blub.rotation.y += 0.01;
        }

        animate();

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
    },
    // called while loading is progressing
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' );
    }
);
// Load a glTF resource
potLoader.load(
    // resource URL
    'res/chair_panton.gltf',
    // called when the resource is loaded
    function ( gltf ) {

        pot = gltf.scene.children[0];
        console.log(pot.material);
        pot.material.emissive.r = 0.1;
        pot.material.roughness = 0.5;
        // add Normal Wire Shader
        // pot.material = trueNormalWireMaterial;
        pot.position.x = -1;
        pot.position.y = -1;
        
        function animate() {
            requestAnimationFrame( animate ) 
                pot.rotation.y += 0.01;
        }

        animate();

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        
    },
    // called while loading is progressing
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' );
    }
);

// Load a glTF resource
gardenChairLoader.load(
    // resource URL
    'res/chair_metal.gltf',
    // called when the resource is loaded
    function ( gltf ) {

        gardenChair = gltf.scene.children[0];
        console.log(gardenChair.material);
        gardenChair.material.metalness = 0.4;
        gardenChair.material.roughness = 0.6;
        // add Normal Wire Shader
        // gardenChair.material = trueNormalWireMaterial;
        gardenChair.position.x = -1;
        gardenChair.position.y = -1;
        
        function animate() {
            requestAnimationFrame( animate ) 
                gardenChair.rotation.y += 0.01;
        }

        animate();

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        
    },
    // called while loading is progressing
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' );
    }
);


/*
**********************************************************
                RENDERING THE SCENE
**********************************************************
*/
// Render the scene in the HTML
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Change alpha for the canvas color
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
let canvas = document.getElementById('canvasBox');


// Updating the rendering function
function animate() {
    requestAnimationFrame( animate );

    icosahedron.rotation.z += 0.01;
    box.rotation.z += 0.01;
    sphere.rotation.z += 0.01;


    // cube.position.x += 0.001;
    // cube.position.y += 0.001;
    // cube.position.z += 0.002;
    // controls.update();
 	renderer.render( scene, camera );
}
animate();

/*
**********************************************************
                BUTTONS MESHES, CLEAR ...
**********************************************************
*/

let btnIco = document.getElementById('btn__ico');
let btnCube = document.getElementById('btn__cube');
let btnSphere = document.getElementById('btn__sphere');
let btnChair = document.getElementById('btn__chair');
let btnPot = document.getElementById('btn__pot');
let btnGardenChair = document.getElementById('btn__gardenChair');

// Choose Mesh to show
btnIco.addEventListener('click', addIco);
function addIco() {
    clear();
    scene.add( icosahedron );
}
btnCube.addEventListener('click', addCube);
function addCube() {
    clear();
    scene.add( box );
}
btnSphere.addEventListener('click', addSphere);
function addSphere() {
    clear();
    scene.add( sphere );
}
btnChair.addEventListener('click', addChair);
function addChair() {
    clear();
    scene.add( blub );
}
btnPot.addEventListener('click', addPot);
function addPot() {
    clear();
    scene.add( pot );
}
btnGardenChair.addEventListener('click', addGardenChair);
function addGardenChair() {
    clear();
    scene.add( gardenChair );
}

// Clear the scene
let btnClear = document.getElementById('btn__clear');
btnClear.addEventListener('click', clear);
// Clear function
function clear() {
    //console.log(Mesh.uuid)    
    scene.remove( icosahedron );
    scene.remove( box );
    scene.remove( sphere );
    scene.remove( blub );
    scene.remove( pot );
    scene.remove( gardenChair );
}

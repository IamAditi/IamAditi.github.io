var container, stats;
var camera, scene, renderer;
var controls;
var clock = new THREE.Clock();
init();
animate();
function init() {
    container = document.getElementById( 'canvas' );
    // camera
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / document.body.scrollHeight, 1, 15000 );
    camera.position.z = 2000;
    controls = new THREE.FlyControls( camera );
    controls.movementSpeed = 100;
    controls.domElement = container;
    controls.rollSpeed = Math.PI / 400;
    controls.autoForward = false;
    controls.dragToLook = false;
    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL( 0.51, 0.4, 0.01 );
    // world
    var s = 250;
    var geometry = new THREE.BoxBufferGeometry( s, s, s );
    var material = new THREE.MeshPhongMaterial( { color: 0x022c43, specular: 0xffffff, shininess: 100 } );
    for ( var i = 0; i < 3000; i ++ ) {
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = 8000 * ( 2.0 * Math.random() - 1.0 );
        mesh.position.y = 8000 * ( 2.0 * Math.random() - 1.0 );
        mesh.position.z = 8000 * ( 2.0 * Math.random() - 1.0 );
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        scene.add( mesh );
    }
    // lights
    var dirLight = new THREE.DirectionalLight( 0xffffff, 0.05 );
    dirLight.position.set( 0, - 1, 0 ).normalize();
    dirLight.color.setHSL( 0.1, 0.7, 0.5 );
    scene.add( dirLight );
    // lensflares
    var textureLoader = new THREE.TextureLoader();
    var textureFlare0 = textureLoader.load( 'assets/images/lensflare0.png' );
    var textureFlare3 = textureLoader.load( 'assets/images/lensflare3.png' );
    addLight( 0.55, 0.9, 0.5, 10000, 10000, - 1000 );
    addLight( 0.55, 0.9, 0.5, 400, 600, - 1000 );
    addLight( 0.55, 0.9, 0.5, -10000, -10000, - 1000 );

    function addLight( h, s, l, x, y, z ) {
        var light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
        light.color.setHSL( h, s, l );
        light.position.set( x, y, z );
        scene.add( light );
        var lensflare = new THREE.Lensflare();
        lensflare.addElement( new THREE.LensflareElement( textureFlare0, 700, 0, light.color ) );
        lensflare.addElement( new THREE.LensflareElement( textureFlare3, 60, 0.6 ) );
        lensflare.addElement( new THREE.LensflareElement( textureFlare3, 70, 0.7 ) );
        lensflare.addElement( new THREE.LensflareElement( textureFlare3, 120, 0.9 ) );
        lensflare.addElement( new THREE.LensflareElement( textureFlare3, 70, 1 ) );
        light.add( lensflare );
    }
    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( document.documentElement.clientWidth, document.body.scrollHeight );
    container.appendChild( renderer.domElement );
    //
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    // events
    window.addEventListener( 'resize', onWindowResize, false );
}
//
function onWindowResize() {
    renderer.setSize( document.documentElement.clientWidth, document.body.scrollHeight );
    camera.aspect = window.innerWidth / document.body.scrollHeight;
    camera.updateProjectionMatrix();
}
//
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    var delta = clock.getDelta();
    controls.update( delta );
    renderer.render( scene, camera );
}
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer;

var mesh,meshs;

var originColors;

var animationValues;

init();
animate();

function init() {

    container = document.getElementById( 'container' );

    //
    meshs = [];
    animationValues = [];

    camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
    camera.position.z = 2750;
    camera.position.y = 900;
    camera.lookAt(0,0,0);

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

    scene.add( new THREE.AmbientLight( 0x444444 ) );

    var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light1.position.set( 1, 1, 1 );
    scene.add( light1 );

    var light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light2.position.set( 0, -1, 0 );
    scene.add( light2 );

    var triangles = 3;


    originColors = [];

    for ( var i = 0; i < 50; i++ )
    {

        var positions = new Float32Array( triangles * 3 );
        var normals = new Float32Array( triangles * 3 );
        var colors = new Float32Array( triangles * 3 );

        var color = new THREE.Color();

        var n = 800, n2 = n/2;	// triangles spread in the cube
        var d = 200, d2 = d/2;	// individual triangle size

        var pA = new THREE.Vector3();
        var pB = new THREE.Vector3();
        var pC = new THREE.Vector3();

        var cb = new THREE.Vector3();
        var ab = new THREE.Vector3();

        // positions

        var x = 0;
        var y = 0 //Math.random() * n - n2;
        var z = 0;

        var ax = x + Math.random() * d - d2;
        var ay =  0;
        var az = z + Math.random() * d - d2;

        var bx = x + Math.random() * d - d2;
        var by =  0;
        var bz = z + Math.random() * d - d2;

        var cx = x + Math.random() * d - d2;
        var cy =  0;
        var cz = z + Math.random() * d - d2;

        positions[0] = ax;
        positions[1] = ay;
        positions[2] = az;

        positions[3] = bx;
        positions[4] = by;
        positions[5] = bz;

        positions[6] = cx;
        positions[7] = cy;
        positions[8] = cz;

        // flat face normals

        pA.set(ax, ay, az);
        pB.set(bx, by, bz);
        pC.set(cx, cy, cz);

        cb.subVectors(pC, pB);
        ab.subVectors(pA, pB);
        cb.cross(ab);

        cb.normalize();

        var nx = cb.x;
        var ny = cb.y;
        var nz = cb.z;

        normals[0] = nx;
        normals[1] = ny;
        normals[2] = nz;

        normals[3] = nx;
        normals[4] = ny;
        normals[5] = nz;

        normals[6] = nx;
        normals[7] = ny;
        normals[8] = nz;

        // colors

        var vx = ( x / n ) + 0.5;
        var vy = ( y / n ) + 0.5;
        var vz = ( z / n ) + 0.5;

        // var c = Math.random()*10;
        color.setRGB(Math.random()*0.6+0.4, Math.random()*0.5+0.1, Math.random()*0.6+0.4);

        colors[0] = color.r;
        colors[1] = color.g;
        colors[2] = color.b;

        colors[3] = color.r;
        colors[4] = color.g;
        colors[5] = color.b;

        colors[6] = color.r;
        colors[7] = color.g;
        colors[8] = color.b;


        originColors.push(colors);

        //}


        //var _geometry;
        var _geometry = new THREE.BufferGeometry();


        _geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        _geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
        _geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

        _geometry.computeBoundingSphere();

        var _material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
            side: THREE.DoubleSide, vertexColors: THREE.VertexColors
        });

        var _mesh = new THREE.Mesh(_geometry, _material);
        _mesh.position.set(Math.random() * 2000 - 1000, 0, Math.random() *1000);
        meshs.push(_mesh);
        scene.add(meshs[i]);

    }


    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setClearColor( scene.fog.color );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    container.appendChild( renderer.domElement );

    //

    stats = new Stats();
    container.appendChild( stats.dom );

    //

    window.addEventListener( 'resize', onWindowResize, false );

    controls = new THREE.OrbitControls( camera, container );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );

    for(var i = 0; i < meshs.length; i++)
    {
        // meshs[i].position.y ++;
        // meshs[i].rotation.y ++;

        var geomeyrycolors = meshs[i].geometry.attributes.color;
        // for(var j = 0; j < geomeyrycolors.array.length; j++){
        //
        //
        //
             //geomeyrycolors.setXYZ(j,0.3,0.3,0.3);
        // }

        for(var j = 0; j < geomeyrycolors.array.length/3; j++){



            geomeyrycolors.setXYZ(j,0.3,0.3,0.3);
        }
        geomeyrycolors.needsUpdate = true;
    }

    render();
    stats.update();


}


console.log(meshs);

function render() {

    var time = Date.now() * 0.001;

    // mesh.rotation.x = time * 0.25;
    // mesh.rotation.y = time * 0.5;

    renderer.render( scene, camera );

}
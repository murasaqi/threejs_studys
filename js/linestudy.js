
init();
animate();

var container, camera, scene,controls,group,renderer,stats,r;

var maxParticleCount;
var particlePositions;
var lines;
var lineMesh;
var particles;
var pointCloud;
var indices_array;
var NUM;
var linePos;
var rotate,nowRotate;
var preSec = 0;
var groupPos ,nowGroupPos;

function init() {


    container = document.getElementById( 'container' );
    rotate = new THREE.Vector3(0,0,0);
    nowRotate = new THREE.Vector3(0,0,0);
    groupPos = new THREE.Vector3(0,0,0);
    nowGroupPos = new THREE.Vector3(0,0,0);
    //

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 8000 );
    camera.position.z = 2000;

    controls = new THREE.OrbitControls( camera, container );

    scene = new THREE.Scene();

    // Groupでオブジェクトをまとめる
    group = new THREE.Group();
    scene.add( group );


    r = 800;

    // var helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( r, r, r ) ) );
    // helper.material.color.setHex( 0x080808 );
    // helper.material.blending = THREE.AdditiveBlending;
    // helper.material.transparent = true;
    // group.add( helper );



    // ====================== create particle line ====================== //

    particles = new THREE.BufferGeometry();
    lineGeometry = new THREE.BufferGeometry();
     NUM = 20;
    maxParticleCount = NUM*NUM;
    particlePositions = new Float32Array( maxParticleCount * 3 );
    var numIndices = maxParticleCount * (maxParticleCount-1);
    var counter = 0;
    for(var i = 1; i<= NUM; i++)
    {
        var phi = Math.PI*2/NUM * i;
        for(var j = 1; j<= NUM; j++)
        {
            var radius = r/2;
            var theta = Math.PI*2/NUM *j;
            var date = new Date();
            var x = radius * Math.sin(theta * date.getHours())*Math.cos(phi);
            var y = radius * Math.cos(theta * date.getSeconds() * 0.3);
            var z = radius * Math.sin(theta * date.getSeconds()) * Math.sin(phi);
            //mesh.addVertex(ofVec3f(x,y,z));
            //mesh.addColor(ofFloatColor(1.0,1.0,1.0,1.0));
            particlePositions[ counter * 3     ] = x;
            particlePositions[ counter * 3 + 1 ] = y;
            particlePositions[ counter * 3 + 2 ] = z;
            counter ++;
        }
    }

    // / for ( var i = 0; i < maxParticleCount; i++ ) {
    //
    //     var x = Math.random() * r - r / 2;
    //     var y = Math.random() * r - r / 2;
    //     var z = Math.random() * r - r / 2;
    //

    //
    //
    //
    //     // if(i < maxParticleCount-1){
    //     //     indices_array.push(i);
    //     //     indices_array.push(i+1);
    //     // }
    //
    //
    // }

    var pMaterial = new THREE.PointsMaterial( {
        color: 0xFFFFFF,
        size: 3,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: false
    } );


    var lMaterial = new THREE.PointsMaterial( {
        color: 0xFFFFFF,
        size: 1,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: false
    } );


    var indices = new THREE.BufferAttribute( new Uint16Array( numIndices ), 1 );
    for (var i = 0; i < numIndices; i++) {
        indices.array[i] = 0;
    }

    lineGeometry.setIndex(indices);
    lineGeometry.setDrawRange(0, 0);
    lineGeometry.setDrawRange(0,0);


    linePos = particlePositions;
    particles.addAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ).setDynamic( true ) );
    lineGeometry.addAttribute('position',new THREE.BufferAttribute( linePos, 3 ).setDynamic( true ));
    pointCloud = new THREE.Points( particles, pMaterial );
    lineMesh = new THREE.LineSegments(lineGeometry, lMaterial);
    group.add( pointCloud );
    group.add( lineMesh );






    // ===================== create renderer ======================= //



    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    container.appendChild( renderer.domElement );

    //

    stats = new Stats();
    container.appendChild( stats.dom );

    window.addEventListener( 'resize', onWindowResize, false );

}


// -------------------------------------- windowresize -------------------------------------- //

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    var counter = 0;
    var speed = 0.1;
    for(var i = 1; i<= NUM; i++)
    {
        var phi = Math.PI*2/NUM * i;
        for(var j = 1; j<= NUM; j++)
        {
            var radius = r/2;
            var theta = Math.PI*2/NUM *j;
            var date = new Date();
            var _x = radius * Math.sin(theta * date.getHours())*Math.cos(phi);
            var _y = radius * Math.cos(theta * date.getSeconds() * 0.3);
            var _z = radius * Math.sin(theta * date.getSeconds()) * Math.sin(phi);
            //mesh.addVertex(ofVec3f(x,y,z));
            //mesh.addColor(ofFloatColor(1.0,1.0,1.0,1.0));
            var x = particlePositions[ counter * 3     ];
            var y = particlePositions[ counter * 3  +1  ];
            var z = particlePositions[ counter * 3   +2  ];
            particlePositions[ counter * 3     ] += (_x - x)*speed;
            particlePositions[ counter * 3 + 1 ] += (_y - y)*speed;
            particlePositions[ counter * 3 + 2 ] += (_z - z)*speed;

            linePos[ counter * 3     ] += (_x - x)*speed;
            linePos[ counter * 3 + 1 ] += (_y - y)*speed;
            linePos[ counter * 3 + 2 ] += (_z - z)*speed;

            counter ++;
        }
    }


    var lIndicesCount = 0;
    var lIndices = lineMesh.geometry.index;
    for (var i = 0; i < maxParticleCount; i++) {
        for (var j = i + 1; j < maxParticleCount; j++) {
            var x1 = particlePositions[i * 3 + 0];
            var x2 = particlePositions[j * 3 + 0];
            var y1 = particlePositions[i * 3 + 1];
            var y2 = particlePositions[j * 3 + 1];
            var z1 = particlePositions[i * 3 + 2];
            var z2 = particlePositions[j * 3 + 2];
            //var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            var dist = Math.pow( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) + (z2-z1)*(z2-z1), 0.5 );

            if (dist > 20 && dist < 120) {
                lIndices.array[lIndicesCount++] = i;
                lIndices.array[lIndicesCount++] = j;
            }
        }
    }





    pointCloud.geometry.attributes.position.needsUpdate = true;
    lineMesh.geometry.attributes.position.needsUpdate = true;

    lineMesh.geometry.setDrawRange(0,lIndicesCount-1)
    lIndices.needsUpdate = true;
    //lineMesh.geometry.attributes.position.needsUpdate = true;
    //lineMesh.geometry.index.needsUpdate(true);








    requestAnimationFrame( animate );

    stats.update();
    render();

}

function render() {
    var date = new Date();
    if(preSec != date.getSeconds() && date.getSeconds() % 4 == 0){
        rotate.y = Math.random() * 5 - 2.5;
        rotate.x = Math.random() * 5 - 2.5;
        rotate.z = Math.random() * 5 - 2.5;

        groupPos.x = Math.random() * 100 - 50;
        groupPos.y = Math.random() * 100 -50;
        groupPos.z = Math.random() * 2000 -100;
    }

    nowRotate.y += (rotate.y - nowRotate.y) * 0.1;
    nowRotate.x += (rotate.x - nowRotate.x) * 0.1;
    nowRotate.z += (rotate.z - nowRotate.z) * 0.1;

    nowGroupPos.y += (groupPos.y - nowGroupPos.y) * 0.1;
    nowGroupPos.x += (groupPos.x - nowGroupPos.x) * 0.1;
    nowGroupPos.z += (groupPos.z - nowGroupPos.z) * 0.1;
    //var time = Date.now() * 0.001;

    group.rotation.y = nowRotate.y;
    group.rotation.x = nowRotate.x;
    group.rotation.z = nowRotate.z;


    group.position.set(nowGroupPos.x, nowGroupPos.y, nowGroupPos.z);


    renderer.render( scene, camera );

    preSec = date.getSeconds();



}
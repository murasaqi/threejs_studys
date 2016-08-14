window.onload = function()
{
    var date = new Date();
    var premill = date.getSeconds();
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera.position.z = 10;

    var controls = new THREE.OrbitControls( camera, renderer.domElement );


    //	BufferGeometry
    var _geometry = new THREE.BufferGeometry();

    var num = 100;
    var PARTICLES = num*num;

    var _position = new Float32Array( PARTICLES * 3 );
    var _index = new Float32Array( PARTICLES * 3 );
    var _color = new Float32Array( PARTICLES * 3 );
    var _vector = new Float32Array( PARTICLES * 3 );
    var counter = 0;
    for (var i = 0; i < num; i++)
    {
        var phi = Math.PI*2/num * i;
        for( var j = 0; j < num; j++ )
        {

            var radius = 1;
            var theta = Math.PI*2/num *j;
            var _x = radius * Math.sin(theta) * Math.cos(phi);
            var _y = radius * Math.cos(theta);
            var _z = radius * Math.sin(theta) * Math.sin(phi);

            // //Math.PI*2
            // var _x = ( Math.random() - .5 ) * 1;
            // var _y = ( Math.random() - .5 ) * 1;
            // var _z = ( Math.random() - .5 ) * 1;

            _position[ counter * 3 + 0 ] = _x;
            _position[ counter * 3 + 1 ] = _y;
            _position[ counter * 3 + 2 ] = _z;



            _color[ counter * 3 + 0 ] = 1;
            _color[ counter * 3 + 1 ] = 1;
            _color[ counter * 3 + 2 ] = 1;

            _vector[ counter * 3 + 0 ] = ( Math.random() - .5 ) * 1;
            _vector[ counter * 3 + 1 ] = ( Math.random() - .5 ) * 1;
            _vector[ counter * 3 + 2 ] = ( Math.random() - .5 ) * 1;


            _index[ counter * 3 + 0 ] = i;
            _index[ counter * 3 + 1 ] = j;
            _index[ counter * 3 + 2 ] = counter;


            counter++;
        }

    }



    //	Attributeを追加
    _geometry.addAttribute( 'position', new THREE.BufferAttribute( _position, 3 ) );
    _geometry.addAttribute( 'position_origin', new THREE.BufferAttribute( _position, 3 ) );
    _geometry.addAttribute( 'color', new THREE.BufferAttribute( _color, 3 ) );
    _geometry.addAttribute( 'vector', new THREE.BufferAttribute( _vector, 3 ) );
    _geometry.addAttribute( '_index', new THREE.BufferAttribute( _index, 3 ) );

    var _material = new THREE.ShaderMaterial({
        uniforms: {
            time: { type: 'f', value: 0 },
            timing: {type: 'f', value: 1.0 },
            seconds: { type: 'f', value: 0 },
            minutes: {type: 'f', value: 0.0 },
            hours: {type: 'f', value: 0.0 }
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent
    });

    var _points = new THREE.Points( _geometry, _material );
    scene.add( _points );




    window.onresize = resize;
    function resize()
    {
        var width  = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize( width, height );
        if( camera.aspect )
        {
            camera.aspect = width / height;
        } else {
            camera.left = - width * 0.5;
            camera.right = width * 0.5;
            camera.bottom = - height * 0.5;
            camera.top = height * 0.5;
        }

        camera.updateProjectionMatrix();
    }

    var render = function () {
        window.requestAnimationFrame(render);
        controls.update();
        date = new Date();
        console.log(date.getSeconds());


        _points.material.uniforms.seconds.value = date.getSeconds();
        _points.material.uniforms.minutes.value = date.getMinutes();

        _points.material.uniforms.hours.value = date.getHours();

        //_points.material.uniforms.time.value += 1 / 60;
        //console.log(_points.material.uniforms.time.value);
        if (date.getSeconds() != premill) {
            console.log('true!!');
            _points.material.uniforms.time.value = 0.01;
        } else {
            _points.material.uniforms.time.value += (1.0 - _points.material.uniforms.time.value) * 0.3;
        }

        var counter = 0;
        for (var i = 0; i < num; i++) {
            //var phi = Math.PI * 2 / num * i;
            for (var j = 0; j < num; j++) {


                counter ++;

            }
        }


        premill = date.getSeconds();
        renderer.render(scene, camera);
    };

    render();
}
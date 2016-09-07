

class Joint {
    constructor() {
        // this.name = name;
        // this.age = age;
        this.groups = [];
    }

    setup(meshs) {
        //console.log("Hello, I'm " + this.getName());
        for (var i = 0; i < meshs.length; i++)
        {
            if (i == 0) {
                var group = new THREE.Group();
                group.add(meshs[i]);
                group.position.set(0, 0, 0);
                this.groups.push(group);
            } else {
                var group = new THREE.Group();
                group.add(meshs[i]);
                group.position.set(0, -meshs[i].geometry.parameters.height - 20, 0);
                this.groups.push(group);
                this.groups[i - 1].add(this.groups[i]);
            }
        }
    }


    getArrayObj() {
        return this.groups;
    }
}


(window.onload = function() {


    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    var container, stats;

    var camera, scene, renderer;

    var boxMeshs = [];
    var armLeftMeshs = [];
    var body,leg,legRight,armLeft,armRight,shoulderLeft,shoulderRight,head,doll,body;
    var modelGroup;
    var controls

    var jointTest,armLeftJoint;
    init();
    animate();

    function init() {

        jointTest = new Joint();
        armLeftJoint = new Joint();


        container = document.createElement( 'div' );
        document.body.appendChild( container );


        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 15000 );
        camera.position.y = 0;
        camera.position.z =1000;

        //camera.lookAt(new THREE.Vector3(0,200,0))

        scene = new THREE.Scene();

        var light, object;

        scene.add( new THREE.AmbientLight( 0x404040 ) );

        light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 0, 1, 0 );
        scene.add( light );

    //        var map = new THREE.TextureLoader().load( 'textures/UV_Grid_Sm.jpg' );
    //        map.wrapS = map.wrapT = THREE.RepeatWrapping;
    //        map.anisotropy = 16;

        modelGroup = new THREE.Group();
        shoulderLeft = new THREE.Group();
        shoulderRight = new THREE.Group();
        armLeft = new THREE.Group();
        armRight = new THREE.Group();
        body = new THREE.Group();


        scene.add(modelGroup);
        //scene.add(shoulderLeft);
        scene.add(body);
        //scene.add(shoulderRight);
        //scene.add(armLeft);

        var material = new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                side: THREE.DoubleSide,
                wireframe:true,
                wireframeLinewidth:0.5
            }
        );



        var width = 50;
        var depth = width;
        var height = 30;
        for (var i = 0; i < 3; i++)
        {

            //boxGroups.push(new THREE.Group());
            //new THREE.BoxGeometry()
            var boxGeometry = new THREE.BoxGeometry(width,height,depth,1,1,1);
            var boxObj = new THREE.Mesh(boxGeometry, material);
            console.log(boxObj);
            boxObj.position.set(0,-height/2,0);
            boxMeshs.push(boxObj);

        }


        width = 20;
        depth = width;
        height = 50;
        for (var i = 0; i < 3; i++)
        {
            var boxGeometry = new THREE.BoxGeometry(width,height,depth,1,1,1);
            var boxObj = new THREE.Mesh(boxGeometry, material);
            //console.log(boxObj);
            boxObj.position.set(0,-height/2,0);
            armLeftMeshs.push(boxObj);

        }


        jointTest.setup(boxMeshs);
        armLeftJoint.setup(armLeftMeshs)
        //console.log(armLeftJoint.getArrayObj())
        //scene.add(armLeftJoint.getArrayObj()[0]);
        armLeftJoint.getArrayObj()[0].rotation.z = -0.5;
        armLeftJoint.getArrayObj()[0].position.x = -40;
        jointTest.getArrayObj()[0].add(armLeftJoint.getArrayObj()[0]);
        scene.add(jointTest.getArrayObj()[0]);
        //scene.add(boxGroups[0]);





        object = new THREE.Mesh( new THREE.OctahedronGeometry( 30, 2 ), material );
        object.position.set( -40, -100, 0 );
        modelGroup.add( object );


        object = new THREE.Mesh( new THREE.OctahedronGeometry( 20, 2 ), material );
        object.position.set( -70, -180, 0 );
        modelGroup.add( object );

        object = new THREE.Mesh( new THREE.OctahedronGeometry( 15, 2 ), material );
        object.position.set( -80, -260, 0 );
        modelGroup.add( object );


        object = new THREE.Mesh( new THREE.OctahedronGeometry( 30, 2 ), material );
        object.position.set( 0, 110, 0 );
        modelGroup.add( object );


        object = new THREE.Mesh( new THREE.OctahedronGeometry( 70, 2 ), material );
        object.position.set( 0, 0, 0 );
        modelGroup.add( object );


        // 左腕

        object = new THREE.Mesh( new THREE.OctahedronGeometry( 20, 2 ), material );
        object.position.set( -90, 40, 0 );
        modelGroup.add( object );

        object = new THREE.Mesh( new THREE.OctahedronGeometry( 20, 2 ), material );
        object.position.set( -120, -25, 0 );
        modelGroup.add( object );


        object = new THREE.Mesh( new THREE.OctahedronGeometry( 15, 2 ), material );
        object.position.set( -130, -80, 0 );
        modelGroup.add( object );

        // 右腕
        object = new THREE.Mesh( new THREE.OctahedronGeometry( 20, 2 ), material );
        object.position.set( 90, 40, 0 );
        modelGroup.add( object );

        object = new THREE.Mesh( new THREE.OctahedronGeometry( 20, 2 ), material );
        object.position.set( 120, -25, 0 );
        modelGroup.add( object );


        object = new THREE.Mesh( new THREE.OctahedronGeometry( 15, 2 ), material );
        object.position.set( 130, -80, 0 );
        modelGroup.add( object );


        // 左足
        object = new THREE.Mesh( new THREE.OctahedronGeometry( 30, 2 ), material );
        object.position.set( -40, -100, 0 );
        modelGroup.add( object );


        object = new THREE.Mesh( new THREE.OctahedronGeometry( 20, 2 ), material );
        object.position.set( -70, -180, 0 );
        modelGroup.add( object );

        object = new THREE.Mesh( new THREE.OctahedronGeometry( 15, 2 ), material );
        object.position.set( -80, -260, 0 );
        modelGroup.add( object );


        // 右足
        object = new THREE.Mesh( new THREE.OctahedronGeometry( 30, 2 ), material );
        object.position.set( 40, -100, 0 );
        modelGroup.add( object );


        object = new THREE.Mesh( new THREE.OctahedronGeometry( 20, 2 ), material );
        object.position.set( 70, -180, 0 );
        modelGroup.add( object );

        object = new THREE.Mesh( new THREE.OctahedronGeometry( 15, 2 ), material );
        object.position.set( 80, -260, 0 );
        modelGroup.add( object );


        modelGroup.position.x = -400;



        var _material = new THREE.MeshPhongMaterial(
            {
                color: "rgb(100,２00,100)",
                opacity: 0.1,
                blending:THREE[ "AdditiveBlending" ],
                side: THREE.DoubleSide,
                wireframe:true,
                side:THREE.FrontSide
            }
        );


        object = new THREE.Mesh( new THREE.PlaneGeometry( 2000,2000,30,30 ), _material );
        object.position.set( 0, 0, 0 );
        object.rotateX(180);

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        container.appendChild( renderer.domElement );

        stats = new Stats();
        container.appendChild( stats.dom );

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

        render();
        stats.update();

    }

    function render() {



        var timer = Date.now() * 0.001;

    //        camera.position.x = Math.cos( timer ) * 800;
    //        camera.position.z = Math.sin( timer ) * 800;

        camera.lookAt( scene.position );

    //        for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
    //
    //            var object = scene.children[ i ];
    //
    //            object.rotation.x = timer * 5;
    //            object.rotation.y = timer * 2.5;
    //
    //        }

        for(var i = 0; i < jointTest.getArrayObj().length; i++)
        {
            jointTest.getArrayObj()[i].rotation.z = 0.4*Math.sin(timer+i);

        }

        for(var i = 0; i < armLeftJoint.getArrayObj().length; i++)
        {
            //armLeftJoint.getArrayObj()[i].rotation.z = 0.6*Math.sin(timer+i);

        }

    //        boxGroups[0].rotation.z = 0.2;
    //        boxGroups[1].rotation.z = 0.2;
    //        boxGroups[2].rotation.z = 0.2;
        renderer.render( scene, camera );



    }

})();







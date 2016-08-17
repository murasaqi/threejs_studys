
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
var colors;
var groupPos ,nowGroupPos;

var renderColor;
var bWhite = false;
var nowbgcolor,nextbgcolor,whitebgcolor,blackbgcolor;
var click = false;
var arraynow,arraywhite,arrayblack, arraynext;
var planematerial;
// nowbgcolors = [

var textTexture;
var texture;
var textAlpha = 1.0;
var timer= 0.0;
var planeMesh;
var canvas;
var context;

var alphaTimer;
var textPos;




//console.log(nowbgcolor.push("aaa"));


function init() {

    //createCanvasTexture();
    console.log(textTexture);


    container = document.getElementById( 'container' );
    rotate = new THREE.Vector3(0,0,0);
    nowRotate = new THREE.Vector3(0,0,0);
    groupPos = new THREE.Vector3(0,0,0);
    nowGroupPos = new THREE.Vector3(0,0,0);
    renderColor = new THREE.Color(0,0,0);
    nowbgcolor = new Array(7);
    whitebgcolor = new Array(7);
    blackbgcolor = new Array(7);
    arraynow = new Float32Array(7*3);
    arraynext = new Float32Array(7*3);
    arraywhite = new Float32Array(7*3);
    arrayblack = new Float32Array(7*3);

    alphaTimer = new Float32Array(2);
    alphaTimer[0] = 0.0;
    alphaTimer[1] = 0.0;


    nowbgcolor[0] = new THREE.Color(250,250,250);
    nowbgcolor[1] = new THREE.Color(240,240,240);
    nowbgcolor[2] = new THREE.Color(230,230,230);
    nowbgcolor[3] = new THREE.Color(220,220,220);
    nowbgcolor[4] = new THREE.Color(200,200,200);
    nowbgcolor[5] = new THREE.Color(180,180,180);
    nowbgcolor[6] = new THREE.Color(140,140,140);

    whitebgcolor[0] = new THREE.Color(250,250,250);
    whitebgcolor[1] = new THREE.Color(240,240,240);
    whitebgcolor[2] = new THREE.Color(230,230,230);
    whitebgcolor[3] = new THREE.Color(220,220,220);
    whitebgcolor[4] = new THREE.Color(200,200,200);
    whitebgcolor[5] = new THREE.Color(180,180,180);
    whitebgcolor[6] = new THREE.Color(140,140,140);


    blackbgcolor[0] = new THREE.Color(140,140,140);
    blackbgcolor[1] = new THREE.Color(130,130,130);
    blackbgcolor[2] = new THREE.Color(120,120,120);
    blackbgcolor[3] = new THREE.Color(90,90,90);
    blackbgcolor[4] = new THREE.Color(80,80,80);
    blackbgcolor[5] = new THREE.Color(70,70,70);
    blackbgcolor[6] = new THREE.Color(60,60,60);
    nextbgcolor = whitebgcolor;


    for(var i = 0; i < nowbgcolor.length; i++){
        arraynow[i*3 + 0] = nowbgcolor[i].r;
        arraynow[i*3 + 1] = nowbgcolor[i].r;
        arraynow[i*3 + 2] = nowbgcolor[i].r;

        arraywhite[i*3 + 0] = whitebgcolor[i].r;
        arraywhite[i*3 + 1] = whitebgcolor[i].r;
        arraywhite[i*3 + 2] = whitebgcolor[i].r;

        arrayblack[i*3 + 0] = blackbgcolor[i].r;
        arrayblack[i*3 + 1] = blackbgcolor[i].r;
        arrayblack[i*3 + 2] = blackbgcolor[i].r;

        arraynext[i*3 + 0] = whitebgcolor[i].r;
        arraynext[i*3 + 1] = whitebgcolor[i].r;
        arraynext[i*3 + 2] = whitebgcolor[i].r;


    }


    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 8000 );
    camera.position.z = 2000;

    //controls = new THREE.OrbitControls( camera, container );

    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog("rgb(240,200,240)",0,3000);

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
    colors = new Float32Array(maxParticleCount * 3 );
    for(var i = 1; i<= NUM; i++)
    {
        //var color = new THREE.Color();
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
            colors[counter*3+0] = 1.0;
            colors[counter*3+1] = 0.0;
            colors[counter*3+2] = 0.0;

            // colors[3] = 0.0;
            // colors[4] = 0.0;
            // colors[5] = 0.0;

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
        color: "rgb(30,30,30)",
        size: 3,
        transparent: true,
        sizeAttenuation: false
    } );


    var lMaterial = new THREE.LineBasicMaterial( {
        color: "rgb(0,0,0)",
        transparent: true,

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
    //particles.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    lineGeometry.addAttribute('position',new THREE.BufferAttribute( linePos, 3 ).setDynamic( true ));

    pointCloud = new THREE.Points( particles, pMaterial );
    lineMesh = new THREE.LineSegments(lineGeometry, lMaterial);
    group.add( pointCloud );
    group.add( lineMesh );






    // ===================== create renderer ======================= //



    renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 0 );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    container.appendChild( renderer.domElement );

    //

    // stats = new Stats();
    window.addEventListener( 'resize', onWindowResize, false );



    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext('2d');
    textPos = new THREE.Vector2(Math.random()*window.innerWidth,  Math.random()*window.innerHeight/2);

    createTexture('test', "rgba(255,255,255,0.1)");

    texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    planematerial = new THREE.MeshBasicMaterial({map: texture,alpha:true});
    planematerial.transparent = true;
    planematerial.blending = THREE["AdditiveBlending"];

    var planegeometry = new THREE.PlaneGeometry(100*window.innerWidth/window.innerHeight,100,8,8);
    planeMesh = new THREE.Mesh(planegeometry,planematerial);
    planeMesh.position.z = 1900;
    scene.add(planeMesh);




}

function createTexture(text,color)
{

    context.clearRect(0,0,canvas.width,canvas.height);
    context.textAlign = "center";
    context.beginPath();
    context.fillStyle = color
    context.font = " bold 300px 'Source Sans Pro'";
    context.fillText(text, textPos.x,  textPos.y);
    context.fill();



}



// -------------------------------------- windowresize -------------------------------------- //

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {
    timer += 0.1;
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

    var date = new Date();

    //timer += 0.1;
    //alphaTimer[0] += (Math.PI*2 - alphaTimer[0])*0.02;

    if(alphaTimer[0] <= Math.PI*2){
        alphaTimer[0] += 0.1;
    }

    textAlpha = Math.sin(alphaTimer[0]);
    var rgb = "rgba(255,255,255," + String(textAlpha*0.4) + ")";
    var textureText = String(date.getHours()) + ":" + String(date.getMinutes()) + ":" + String(date.getSeconds());
    createTexture(textureText, rgb);
    texture.needsUpdate = true;



    //planeMesh.material.map.image = texture;



    //console.log($('#container'));

        // var geometrycolors = pointCloud.geometry.attributes.color;
        var nowColor =  pointCloud.material.color;
    //console.log(renderColor.r - nowColor.r);
         nowColor.r += (renderColor.r - nowColor.r) * 0.05;
         nowColor.g += (renderColor.g - nowColor.g) * 0.05;
         nowColor.b += (renderColor.b - nowColor.b) * 0.05;
        //console.log(renderColor);
        pointCloud.material.color = nowColor;
        lineMesh.material.color = nowColor;
        //
        //
        // for(var j = 0; j < geometrycolors.array.length/3; j++){
        //
        //
        //
        //     geometrycolors.setXYZ(j,0.0,0.0,0.0);
        // }
        // geometrycolors.needsUpdate = true;


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

    for(var i = 0; i < nowbgcolor.length; i++)
    {
        //console.log("ok");

        // nowbgcolor[i].r += (nextbgcolor[i].r - nowbgcolor[i].r) * 0.1;
        // nowbgcolor[i].g += (nextbgcolor[i].g - nowbgcolor[i].g) * 0.1;
        // nowbgcolor[i].b += (nextbgcolor[i].b - nowbgcolor[i].b) * 0.1;

        arraynow[i*3+0] += (arraynext[i*3+0] - arraynow[i*3+0]) * 0.05;
        arraynow[i*3+1] += (arraynext[i*3+1] - arraynow[i*3+1]) * 0.05;
        arraynow[i*3+2] += (arraynext[i*3+2] - arraynow[i*3+2]) * 0.05;
    }

    $("body").css("background","radial-gradient(rgb("+
        Math.round(arraynow[0]) + "," + Math.round(arraynow[1]) + "," + Math.round(arraynow[2]) + ")0%,rgb(" +
        Math.round(arraynow[3]) + "," + Math.round(arraynow[4]) + "," + Math.round(arraynow[5]) + ")40%,rgb(" +
        Math.round(arraynow[6]) + "," + Math.round(arraynow[7]) + "," + Math.round(arraynow[8]) + ")50%,rgb(" +
        Math.round(arraynow[9]) + "," + Math.round(arraynow[10]) + "," + Math.round(arraynow[11]) + ")70%,rgb(" +
        Math.round(arraynow[12]) + "," + Math.round(arraynow[13]) + "," + Math.round(arraynow[14]) + ")80%,rgb(" +
        Math.round(arraynow[15]) + "," + Math.round(arraynow[16]) + "," + Math.round(arraynow[17]) + ")90%,rgb(" +
        Math.round(arraynow[18]) + "," + Math.round(arraynow[19]) + "," + Math.round(arraynow[20]) + ")100%)");



    pointCloud.geometry.attributes.position.needsUpdate = true;
    lineMesh.geometry.attributes.position.needsUpdate = true;

    lineMesh.geometry.setDrawRange(0,lIndicesCount-1)
    lIndices.needsUpdate = true;
    //lineMesh.geometry.attributes.position.needsUpdate = true;
    //lineMesh.geometry.index.needsUpdate(true);








    requestAnimationFrame( animate );

    //stats.update();
    render();

}
console.log(pointCloud);

function render() {
    var date = new Date();
    //if(preSec != date.getSeconds() && date.getSeconds() % 7 == 0 || click){
    if(click){
        rotate.y = Math.random() * 5 - 2.5;
        rotate.x = Math.random() * 5 - 2.5;
        rotate.z = Math.random() * 5 - 2.5;

        groupPos.x = Math.random() * 500 - 250;
        groupPos.y = Math.random() * 500 - 250;
        groupPos.z = (Math.random() * 2000 )-500;
        //console.log(groupPos);
        bWhite = !bWhite;
        //console.log(bWhite);
        if(bWhite){
            renderColor = new THREE.Color(0.9,0.9,0.9);
            nextbgcolor = blackbgcolor;
            arraynext = arrayblack;

        } else{
            renderColor = new THREE.Color(0.02,0.02,0.02);
            nextbgcolor = whitebgcolor;
            arraynext = arraywhite;
        }
        console.log(arraynext);

        alphaTimer[0] = 0.0;

        var _x = window.innerWidth/2 + Math.random()*window.innerWidth*0.4 - Math.random()*window.innerWidth*0.4;
        var _y = window.innerHeight/2 + Math.random()*window.innerHeight*0.4 - Math.random()*window.innerHeight*0.2;
        textPos.set(_x,_y);


        click = false;


    }
    // if(click){
    //     alphaTimer[0] = 0.0;
    //
    //     var _x = window.innerWidth/2 + Math.random()*window.innerWidth*0.4 - Math.random()*window.innerWidth*0.4;
    //     var _y = window.innerHeight/2 + Math.random()*window.innerHeight*0.4 - Math.random()*window.innerHeight*0.2;
    //     textPos.set(_x,_y);
    //
    //
    //     click = false;
    // }

    //rgb(250,250,250)0%,rgb(240,240,240)40%,rgb(230,230,230)50%,rgb(220,220,220)70%,rgb(200,200,200)80%,rgb(180,180,180)90%,rgb(140,140,140)100%)




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
console.log(    planeMesh
);
var elem = document.getElementById("container");

elem.addEventListener("click", function(){
    click = true;

}, false);
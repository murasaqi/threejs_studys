///<reference path="typings/index.d.ts" />
var ThreeJSTest = (function () {
    // ================= init ================= // 
    function ThreeJSTest() {
        var _this = this;
        // レンダラーを作成
        this.createScene();
        // シーンを作成
        this.createRenderer();
        this.handleResize();
        window.addEventListener("resize", function () {
            _this.handleResize();
        });
    }
    ThreeJSTest.prototype.handleResize = function () {
        this.resize();
    };
    // ================= create renderer ================= //
    ThreeJSTest.prototype.createRenderer = function () {
        // create webGL renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xffffff);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // set size
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        document.body.appendChild(this.renderer.domElement);
    };
    // ================= scene ================= //
    ThreeJSTest.prototype.createScene = function () {
        // create scene
        this.scene = new THREE.Scene();
        //this.scene.fog = new THREE.Fog( 0xffffff, 0, 3500 );
        // this.perlin = new Perlin();


        console.log(noise);
        this.noiseSeed = new Array();
        // -------- light ---------- //
        var light = new THREE.DirectionalLight(0x888888);
        light.position.set(0, 20, 0);
        this.scene.add(light);
        var light1 = new THREE.PointLight(0xff0040, 2, 50);
        //light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
        light1.position.set(0, 40, -10);
        this.scene.add(light1);
        // -------- user setting -------- //
        // // 立方体のジオメトリーを作成
        // this.geometry = new THREE.CubeGeometry( 1, 1, 1 );
        // // 緑のマテリアルを作成
        // this.material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        // // 上記作成のジオメトリーとマテリアルを合わせてメッシュを生成
        // this.cube = new THREE.Mesh( this.geometry, this.material );
        // this.cube.castShadow = true;
        // this.cube.position.set(0,0,0);
        // // メッシュをシーンに追加
        // this.scene.add( this.cube );
        // this.scene.add(new THREE.AmbientLight( 0x444444));
        // ---- buffer geometry --- //
        var triangles = 160000;
        var geometry = new THREE.BufferGeometry();
        var positions = new Float32Array(triangles * 3 * 3);
        var normals = new Float32Array(triangles * 3 * 3);
        var colors = new Float32Array(triangles * 3 * 3);
        var color = new THREE.Color();
        var n = 800, n2 = n / 2; // triangles spread in the cube
        var d = 12, d2 = d / 2; // individual triangle size
        var pA = new THREE.Vector3();
        var pB = new THREE.Vector3();
        var pC = new THREE.Vector3();
        var cb = new THREE.Vector3();
        var ab = new THREE.Vector3();
        for (var i = 0; i < positions.length; i += 9) {
            // positions
            var x = Math.random() * n - n2;
            var y = Math.random() * n - n2;
            var z = Math.random() * n - n2;
            var ax = x + Math.random() * d - d2;
            var ay = y + Math.random() * d - d2;
            var az = z + Math.random() * d - d2;
            var bx = x + Math.random() * d - d2;
            var by = y + Math.random() * d - d2;
            var bz = z + Math.random() * d - d2;
            var cx = x + Math.random() * d - d2;
            var cy = y + Math.random() * d - d2;
            var cz = z + Math.random() * d - d2;
            positions[i] = ax;
            positions[i + 1] = ay;
            positions[i + 2] = az;
            positions[i + 3] = bx;
            positions[i + 4] = by;
            positions[i + 5] = bz;
            positions[i + 6] = cx;
            positions[i + 7] = cy;
            positions[i + 8] = cz;
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
            normals[i] = nx;
            normals[i + 1] = ny;
            normals[i + 2] = nz;
            normals[i + 3] = nx;
            normals[i + 4] = ny;
            normals[i + 5] = nz;
            normals[i + 6] = nx;
            normals[i + 7] = ny;
            normals[i + 8] = nz;
            // colors
            var vx = (x / n) + 0.5;
            var vy = (y / n) + 0.5;
            var vz = (z / n) + 0.5;
            color.setRGB(vx, vy, vz);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
            colors[i + 3] = color.r;
            colors[i + 4] = color.g;
            colors[i + 5] = color.b;
            colors[i + 6] = color.r;
            colors[i + 7] = color.g;
            colors[i + 8] = color.b;
        }
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
        geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.computeBoundingSphere();
        var material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
            side: THREE.DoubleSide, vertexColors: THREE.VertexColors
        });
        this.mesh = new THREE.Mesh(geometry, material);
        //this.scene.add( this.mesh );
        // var terrainGeometry = new THREE.BufferGeometry();
        // var terrainPositions = new Float32Array(triangles * 3 * 3);
        // var terrainNormals = new Float32Array( triangles * 3 * 3 );
        // var terrainColors = new Float32Array( triangles * 3 * 3 );
        // var terrainColor = new THREE.Color();
        // -------- terrain ------- //
        var worldWidth = 256, worldDepth = 256;
        this.terrainGeometry = new THREE.PlaneGeometry(2000, 2000, 30, 30);
        this.terrainGeometry.rotateX(-Math.PI / 2);
        // ******** Clipping planes ********
        //var localPlane = new THREE.Plane(new THREE.Vector3(0,0,0),0.8)
        this.terrainMaterial = new THREE.MeshPhongMaterial({
            color: 0x111111 * Math.random(),
            specular: 0x111111,
            shininess: 20,
            shading: THREE.SmoothShading,
            transparent: true,
            side: THREE.DoubleSide,
        });
        this.terrainMesh = new THREE.Mesh(this.terrainGeometry, this.terrainMaterial);
        this.scene.add(this.terrainMesh);
        var _x, _y;
        _x = _y = 0.0;
        for (var i = 0; i < this.terrainGeometry.vertices.length; i++) {
            _x += 0.2;
            _y += 0.3;
            this.noiseSeed.push({ x: _x, y: _y });
        }
        // -------- cicle ------- //
        // this.circleGeometry = new THREE.CircleGeometry( 50, 20, 0, Math.PI * 2 );
        // this.circleGeometry.rotateX (-Math.PI/2);
        // this.cirlceMesh = new THREE.Mesh( this.circleGeometry, material );
        // this.cirlceMesh.position.set( 0, 0, 0 );
        // this.scene.add( this.cirlceMesh );
        console.log(this.circleGeometry);
        console.log(this.cirlceMesh);
        //new THREE.CircleGeometry()
        // -------- camera -------- //
        // カメラを作成
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 7000);
        // カメラ位置を設定
        this.camera.position.z = 1000;
        this.controls = new THREE.TrackballControls(this.camera);
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
        this.controls.keys = [65, 83, 68];
        console.log(Math.floor(Math.abs(noise.perlin2(0.4, 0.3) * 100)));
        //this.controls.addEventListener( 'change', this.render );
        //window.addEventListener( 'resize', this.onWindowResize, false );
        // animation setting;
        this.center = new THREE.Vector3;
        this.center.x = 0;
        this.center.y = 0;
        this.center.z = 0;
        this.radius = 0.0;
        this.timer = 0.0;
    };
    ThreeJSTest.prototype.resize = function () {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.controls.handleResize();
    };
    ThreeJSTest.prototype.render = function () {
        this.timer += 0.01;
        this.radius = 1400 * Math.sin(this.timer);
        requestAnimationFrame(this.render.bind(this));
        var time = Date.now() * 0.001;
        this.mesh.rotation.x = time * 0.25;
        this.mesh.rotation.y = time * 0.5;
        // 立方体メッシュを自転
        //this.cube.rotation.x += 0.01;
        //this.cube.rotation.y += 0.01;
        this.controls.update();
        // レンダリング
        //console.log(this.scene);
        for (var i = 0; i < this.terrainGeometry.vertices.length; i++) {
            this.vector = this.terrainGeometry.vertices[i];
            //var perlin = noise.perlin2(this.terrainGeometry.vertices[ i ].x,this.terrainGeometry.vertices[ i ].y);
            //console.log(perlin);
            //var value = Math.abs(noise.perlin2(this.terrainGeometry.vertices[ i ].x / 100, this.terrainGeometry.vertices[ i ].y / 100));
            //value *= 256;
            //console.log(Math.floor(value));
            //console.log(this.vector);
            var value = Math.floor(Math.abs(noise.perlin2(this.noiseSeed[i].x, this.noiseSeed[i].y) * 700));
            if (this.vector.distanceTo(this.center) < this.radius + 40 && this.vector.distanceTo(this.center) > this.radius - 40) {
                this.terrainGeometry.vertices[i].y += (value - this.vector.y) * 0.2;
            }
            else {
                this.terrainGeometry.vertices[i].y += (0 - this.vector.y) * 0.2;
            }
        }
        //this.terrainGeometry.computeFaceNormals();
        this.terrainGeometry.computeVertexNormals();
        this.terrainMesh.geometry.verticesNeedUpdate = true;
        //this.scene.
        this.renderer.render(this.scene, this.camera);
    };
    return ThreeJSTest;
}());
// ウィンドウがロードされた時
window.addEventListener("load", function () {
    // アプリケーションの起動
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
}, false);
//# sourceMappingURL=main.js.map
//===================================CUSTOM FUNCTIONS================================
function HashTable(obj) {
    this.length = 0;
    this.items = {};
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }

    this.setItem = function(key, value) {
        let previous = undefined;
        if (this.hasItem(key)){
            previous = this.items[key];
        } else {
            this.length++;
        }
        this.items[key] = value;
        return previous;
    }

    this.getItem = function(key) {
        return this.hasItem(key) ? this.items[key] : undefined;
    }

    this.hasItem = function(key) {
        return this.items.hasOwnProperty(key);
    }

    this.removeItem = function(key) {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        } else{
            return undefined;
        }
    }

    this.keys = function() {
        let keys = [];
        for (let k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

    this.values = function() {
        let values = [];
        for (let k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    this.each = function(fn) {
        for (let k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    }

    this.clear = function() {
        this.items = {}
        this.length = 0;
    }
}

    /*
        función para generar las líneas

        función para desplegar cada parametro individualmente:
        p1: scr address,
        p2: dest address,
        p3: dest port

        CHANGES:
        3ro hasta 1400, static,
         recibo un array [p1, p2, p3] o mejor un json y tambien recibo #p1, #p2, #p3.
        */

var lineP2;
function Lines(material2, flow, scrIP, destIP, destPort) {
    //summon a geometry object
     geometryP2 = new THREE.Geometry();

     //summon the vector lines with fixed x coordinates and moving y coordinates
                             //p1: scr address
     geometryP2.vertices.push(new THREE.Vector3(-4, scrIP.getItem(flow[0]), 0),
                             //p2: dest address
                              new THREE.Vector3(0, destIP.getItem(flow[1]), 0),
                             //p3: dest port
                              new THREE.Vector3(4, destPort.getItem(flow[2]), 0));

for (let i = 0; i < geometryP2.vertices.length; i += 2 ) {
    geometryP2.colors[i]= new THREE.Color(Math.random(), Math.random(), Math.random());
    geometryP2.colors[i + 1] = geometryP2.colors[i];
}

    //summon the line
    lineP2 = new THREE.Line(geometryP2, material2, THREE.LineSegments);
    //return the mapped flow, and the updated variables
    return lineP2;
}



        //a cada parametro individual se le asigna un yDest unico, el resto de las coordenadas son fijas
        //cada scrIP debe contener: size, nombre destIP y port
             //cada destIP debe contener: size, nombre y port
                     //cada port debe contener: size y nombre
                     //.keys() para sacar el size

function flowing(val1, val2, val3) {
    return new Array(val1,val2,val3);

}

function readData(flows) {
  let scrIPArr = [];
  let destIPArr = [];
  let destPortArr = [];
  let fixedFlow = [];

for (i in flows) {
  scrIPArr[i] = flows[i].sip;
  destIPArr[i] = flows[i].dip;
  destPortArr[i] = flows[i].dport;
  fixedFlow[i] = flowing(scrIPArr[i], destIPArr[i], destPortArr[i]);
}

//filters repetitions
scrIPArr = scrIPArr.filter( function(item, index, inputArray) {
    return inputArray.indexOf(item) == index;
    });
destIPArr = destIPArr.filter( function(item, index, inputArray) {
    return inputArray.indexOf(item) == index;
    });
destPortArr = destPortArr.filter( function(item, index, inputArray) {
    return inputArray.indexOf(item) == index;
    });

return [fixedFlow, scrIPArr, destIPArr, destPortArr];
  }


function textRange(x, y, f, text) {
    text1 = document.createElement('div');
    text1.style.position = 'absolute';
    text1.style.fontFamily="arial";
    text1.style.width = 150;
    text1.style.height = 150;
    text1.style.fontSize = f +'px';
    text1.innerHTML = text;
    text1.style.top = y + 'px';
    text1.style.left = x + 'px';
    text1.style.color = "#000000";
    text1.style.backgroundColor ="rgba(255, 175, 10)";

    return text1;
}

//converts any given IP to a non-dotted integer
function ipToInt(ip) {
let parts = ip.split(".");
let res = 0;

res += parseInt(parts[0], 10) << 24;
res += parseInt(parts[1], 10) << 16;
res += parseInt(parts[2], 10) << 8;
res += parseInt(parts[3], 10);

return res;
}
//converts any given integer to an IP address
function intToIP(int) {
  let part1 = int & 255;
  let part2 = ((int >> 8) & 255);
  let part3 = ((int >> 16) & 255);
  let part4 = ((int >> 24) & 255);

  return part4 + "." + part3 + "." + part2 + "." + part1;
}

function getMaxOfArray(list) {
  res = [];
  for(let i = 0; i < list.length; i++) {
      res[i] = ipToInt(list[i]);
  }
  return Math.max.apply(null, res);
}

function sortIP(list) {
  res = [];
  for(let i = 0; i < list.length; i++) {
      res[i] = ipToInt(list[i]);
  }

  res.sort(function(a, b){return b - a});
  for(let j = 0; j < list.length; j++) {
      res[j] = intToIP(res[j]);
  }
  return res;
}

//transform one range for another for mouse coordinates
//there have to be 2 transform
function transformX(x) {
  return ((x - 50) * (8 / 1618) - 4);
}

function transformY(y) {
  return -1 * ((y - 76) * (5.6 / 329) - 2.7);
}

function boldLines(x, y, list, constX) {

    for(let i = 0; i < list.length; i++) {
        if((x == constX) && (y == list[i])) {
            console.log("good");
        }
    }
}


//==========================END OF CUSTOM FUNCTIONS=================================
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
        window.onload = function() {
            let renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth - 30, window.innerHeight - 30);
            document.body.appendChild(renderer.domElement);

            let scene = new THREE.Scene();

            let camera = new THREE.PerspectiveCamera(
                35,             // Field of view
                800 / 600,      // Aspect ratio
                0.1,            // Near plane
                10000           // Far plane
            );
            camera.position.set( 0, 0, 10 );
            //camera.position.z=10;
            // camera.position.set( 20, 21, 0 );
            camera.lookAt( scene.position );

//===================================CANVAS=================================================
//Manage the material of the lines
let material = new THREE.LineBasicMaterial( {
    color: 0xffbb33 , linewidth: 10
});

let material2 = new THREE.LineBasicMaterial( {
    linewidth: 2, color: 0xffbb33, vertexColors: THREE.VertexColors
});

  // PermanentLine1 and border
  let geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(-4, 2.80, 0));
  geometry.vertices.push(new THREE.Vector3(-4, -2.50, 0));
  geometry.vertices.push(new THREE.Vector3(4, -2.50, 0));
  geometry.vertices.push(new THREE.Vector3(4, 2.80, 0));
  let line = new THREE.Line(geometry, material);
  line.addEventListener()
  //PermanentLine2
  let geometry2 = new THREE.Geometry();
  geometry2.vertices.push(new THREE.Vector3(0,2.80,0))
  geometry2.vertices.push(new THREE.Vector3(0,-2.50,0))
   let line2 = new THREE.Line(geometry2, material);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>MODIFYIER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Generates ScrIP as a hash table, after recieving array list input it generates the y coordinates in a list.

var data =[{"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.350000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:00:35.154000", "nhip": "0.0.0.0", "dport": 39915, "output": 0, "sport": 80, "dip": "130.225.192.100", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:00:35.504000", "nhip": "0.0.0.0", "dport": 39937, "output": 0, "sport": 80, "dip": "130.225.192.100", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 6, "finnoack": false, "bytes": 497, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:05:11.852000", "nhip": "0.0.0.0", "dport": 56521, "output": 0, "sport": 80, "dip": "69.164.59.195", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 6, "finnoack": false, "bytes": 497, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:05:12.052000", "nhip": "0.0.0.0", "dport": 56549, "output": 0, "sport": 80, "dip": "69.164.59.195", "uniform_packets": false}, {"sip": "136.145.231.43", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:00:55.518000", "nhip": "0.0.0.0", "dport": 41469, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.37", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:03.450000", "packets": 3, "finnoack": false, "bytes": 669, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:06:00.852000", "nhip": "0.0.0.0", "dport": 33829, "output": 0, "sport": 80, "dip": "92.97.199.192", "uniform_packets": false}, {"sip": "136.145.231.37", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:06", "packets": 4, "finnoack": false, "bytes": 729, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:06:06.934000", "nhip": "0.0.0.0", "dport": 39464, "output": 0, "sport": 80, "dip": "92.97.199.192", "uniform_packets": false}, {"sip": "136.145.231.37", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 1, "finnoack": false, "bytes": 557, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:06:07.984000", "nhip": "0.0.0.0", "dport": 33829, "output": 0, "sport": 80, "dip": "92.97.199.192", "uniform_packets": false}, {"sip": "136.145.231.25", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:01:14.356000", "nhip": "0.0.0.0", "dport": 51452, "output": 0, "sport": 80, "dip": "162.210.107.5", "uniform_packets": false}, {"sip": "136.145.231.25", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:01:14.356000", "nhip": "0.0.0.0", "dport": 61250, "output": 0, "sport": 80, "dip": "162.210.107.5", "uniform_packets": false}, {"sip": "136.145.231.25", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:01:14.356000", "nhip": "0.0.0.0", "dport": 54038, "output": 0, "sport": 80, "dip": "162.210.107.5", "uniform_packets": false}, {"sip": "136.145.231.25", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:01:14.356000", "nhip": "0.0.0.0", "dport": 57562, "output": 0, "sport": 80, "dip": "162.210.107.5", "uniform_packets": false}, {"sip": "136.145.231.37", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 1, "finnoack": false, "bytes": 557, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:06:19.984000", "nhip": "0.0.0.0", "dport": 39464, "output": 0, "sport": 80, "dip": "92.97.199.192", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.300000", "packets": 7, "finnoack": false, "bytes": 598, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:10:16.896000", "nhip": "0.0.0.0", "dport": 40407, "output": 0, "sport": 80, "dip": "129.63.205.113", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:10:17.346000", "nhip": "0.0.0.0", "dport": 40427, "output": 0, "sport": 80, "dip": "129.63.205.113", "uniform_packets": false}, {"sip": "136.145.231.10", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:05:23.458000", "nhip": "0.0.0.0", "dport": 45624, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.35", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:06:31.208000", "nhip": "0.0.0.0", "dport": 39937, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.31", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:07:03.824000", "nhip": "0.0.0.0", "dport": 50111, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.52", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:18:06.032000", "nhip": "0.0.0.0", "dport": 45966, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.44", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:13:28.216000", "nhip": "0.0.0.0", "dport": 60704, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.37", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.650000", "packets": 4, "finnoack": false, "bytes": 345, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:19:55.764000", "nhip": "0.0.0.0", "dport": 51642, "output": 0, "sport": 80, "dip": "139.162.13.205", "uniform_packets": false}, {"sip": "136.145.231.15", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:16:36.824000", "nhip": "0.0.0.0", "dport": 58611, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:25:33.490000", "nhip": "0.0.0.0", "dport": 56254, "output": 0, "sport": 80, "dip": "192.83.252.60", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:25:33.640000", "nhip": "0.0.0.0", "dport": 56272, "output": 0, "sport": 80, "dip": "192.83.252.60", "uniform_packets": false}, {"sip": "136.145.231.25", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:01.150000", "packets": 4, "finnoack": false, "bytes": 599, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:37:03.818000", "nhip": "0.0.0.0", "dport": 54913, "output": 0, "sport": 80, "dip": "24.182.49.5", "uniform_packets": false}, {"sip": "136.145.231.12", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.500000", "packets": 5, "finnoack": false, "bytes": 783, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:38:59.646000", "nhip": "0.0.0.0", "dport": 59174, "output": 0, "sport": 80, "dip": "177.53.116.2", "uniform_packets": false}, {"sip": "136.145.231.12", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:01.950000", "packets": 21, "finnoack": false, "bytes": 25071, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:39:00.246000", "nhip": "0.0.0.0", "dport": 59177, "output": 0, "sport": 80, "dip": "177.53.116.2", "uniform_packets": false}, {"sip": "136.145.231.37", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:20.850000", "packets": 4, "finnoack": false, "bytes": 214, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:39:14.388000", "nhip": "0.0.0.0", "dport": 25964, "output": 0, "sport": 80, "dip": "88.105.37.59", "uniform_packets": false}, {"sip": "136.145.231.37", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:20.850000", "packets": 4, "finnoack": false, "bytes": 214, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:40:56.540000", "nhip": "0.0.0.0", "dport": 50809, "output": 0, "sport": 80, "dip": "120.188.3.91", "uniform_packets": false}, {"sip": "136.145.231.25", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:38:41.644000", "nhip": "0.0.0.0", "dport": 55712, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:43:49.362000", "nhip": "0.0.0.0", "dport": 49852, "output": 0, "sport": 80, "dip": "199.109.17.48", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:43:49.512000", "nhip": "0.0.0.0", "dport": 49864, "output": 0, "sport": 80, "dip": "199.109.17.48", "uniform_packets": false}, {"sip": "136.145.231.37", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:45:41.366000", "nhip": "0.0.0.0", "dport": 50503, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.47", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:46:46.500000", "nhip": "0.0.0.0", "dport": 54451, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.300000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:54:44.690000", "nhip": "0.0.0.0", "dport": 46844, "output": 0, "sport": 80, "dip": "147.155.106.25", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:54:45.090000", "nhip": "0.0.0.0", "dport": 46902, "output": 0, "sport": 80, "dip": "147.155.106.25", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:55:09.728000", "nhip": "0.0.0.0", "dport": 46174, "output": 0, "sport": 80, "dip": "147.155.106.30", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:55:09.978000", "nhip": "0.0.0.0", "dport": 46220, "output": 0, "sport": 80, "dip": "147.155.106.30", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.300000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:55:50.502000", "nhip": "0.0.0.0", "dport": 36250, "output": 0, "sport": 80, "dip": "147.155.106.44", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:55:44.802000", "nhip": "0.0.0.0", "dport": 34950, "output": 0, "sport": 80, "dip": "147.155.106.41", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:55:45.052000", "nhip": "0.0.0.0", "dport": 34986, "output": 0, "sport": 80, "dip": "147.155.106.41", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:55:50.824000", "nhip": "0.0.0.0", "dport": 36294, "output": 0, "sport": 80, "dip": "147.155.106.44", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.350000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:56:05.806000", "nhip": "0.0.0.0", "dport": 37794, "output": 0, "sport": 80, "dip": "147.155.106.45", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:56:06.156000", "nhip": "0.0.0.0", "dport": 37852, "output": 0, "sport": 80, "dip": "147.155.106.45", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:56:31.852000", "nhip": "0.0.0.0", "dport": 47178, "output": 0, "sport": 80, "dip": "147.155.106.29", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:56:32.252000", "nhip": "0.0.0.0", "dport": 47230, "output": 0, "sport": 80, "dip": "147.155.106.29", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:58:35.174000", "nhip": "0.0.0.0", "dport": 40488, "output": 0, "sport": 80, "dip": "152.3.117.30", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:58:35.324000", "nhip": "0.0.0.0", "dport": 40516, "output": 0, "sport": 80, "dip": "152.3.117.30", "uniform_packets": false}, {"sip": "136.145.231.11", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 00:58:59.172000", "nhip": "0.0.0.0", "dport": 51720, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:fe5a:7ded", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 9, "finnoack": false, "bytes": 5166, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:00:37.854000", "nhip": "::", "dport": 60745, "output": 0, "sport": 80, "dip": "2001:878:300:500::100", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:feb8:4f40", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 6, "finnoack": false, "bytes": 666, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:00:38.054000", "nhip": "::", "dport": 47986, "output": 0, "sport": 80, "dip": "2001:878:300:500::100", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:fe5a:7ded", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 7, "finnoack": false, "bytes": 2379, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:00:38.154000", "nhip": "::", "dport": 60773, "output": 0, "sport": 80, "dip": "2001:878:300:500::100", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:feb8:4f40", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 6, "finnoack": false, "bytes": 666, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:00:37.754000", "nhip": "::", "dport": 47961, "output": 0, "sport": 80, "dip": "2001:878:300:500::100", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:fe5a:7ded", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00", "packets": 9, "finnoack": false, "bytes": 5062, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:05:17.142000", "nhip": "::", "dport": 58176, "output": 0, "sport": 80, "dip": "2607:f4e8:121:404:a9f0:4637:de9b:9e64", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:fe5a:7ded", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 7, "finnoack": false, "bytes": 2299, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:05:17.342000", "nhip": "::", "dport": 58193, "output": 0, "sport": 80, "dip": "2607:f4e8:121:404:a9f0:4637:de9b:9e64", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:feb8:4f40", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 6, "finnoack": false, "bytes": 598, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:05:14.442000", "nhip": "::", "dport": 56321, "output": 0, "sport": 80, "dip": "2607:f4e8:121:404:a9f0:4637:de9b:9e64", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:feb8:4f40", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 6, "finnoack": false, "bytes": 598, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:05:14.642000", "nhip": "::", "dport": 56336, "output": 0, "sport": 80, "dip": "2607:f4e8:121:404:a9f0:4637:de9b:9e64", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:feb8:4f40", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 6, "finnoack": false, "bytes": 666, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:43:51.108000", "nhip": "::", "dport": 50335, "output": 0, "sport": 80, "dip": "2620:f:1:1102:250:56ff:feb8:72d5", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:feb8:4f40", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 6, "finnoack": false, "bytes": 666, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:43:51.208000", "nhip": "::", "dport": 50350, "output": 0, "sport": 80, "dip": "2620:f:1:1102:250:56ff:feb8:72d5", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:fe5a:7ded", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 9, "finnoack": false, "bytes": 5166, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:43:53.808000", "nhip": "::", "dport": 46925, "output": 0, "sport": 80, "dip": "2620:f:1:1102:250:56ff:feb8:72d5", "uniform_packets": false}, {"sip": "2607:2000:100:116:92e2:baff:fe5a:7ded", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 7, "finnoack": false, "bytes": 2379, "tcpflags": "", "sensor_id": 0, "classtype_id": 7, "stime": "2016-10-25 00:43:53.958000", "nhip": "::", "dport": 46937, "output": 0, "sport": 80, "dip": "2620:f:1:1102:250:56ff:feb8:72d5", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:00:32.136000", "nhip": "0.0.0.0", "dport": 47902, "output": 0, "sport": 80, "dip": "74.81.99.210", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:00:32.536000", "nhip": "0.0.0.0", "dport": 47934, "output": 0, "sport": 80, "dip": "74.81.99.210", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 5, "finnoack": false, "bytes": 783, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:04:06.430000", "nhip": "0.0.0.0", "dport": 49675, "output": 0, "sport": 80, "dip": "62.201.222.248", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.800000", "packets": 21, "finnoack": false, "bytes": 25071, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:04:06.880000", "nhip": "0.0.0.0", "dport": 49676, "output": 0, "sport": 80, "dip": "62.201.222.248", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.500000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:07:13.498000", "nhip": "0.0.0.0", "dport": 47492, "output": 0, "sport": 80, "dip": "116.193.10.38", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.600000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:07:14.148000", "nhip": "0.0.0.0", "dport": 47558, "output": 0, "sport": 80, "dip": "116.193.10.38", "uniform_packets": false}, {"sip": "136.145.231.9", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:07:52.890000", "nhip": "0.0.0.0", "dport": 41386, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.10", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 2, "finnoack": false, "bytes": 112, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:08:37.060000", "nhip": "0.0.0.0", "dport": 36597, "output": 0, "sport": 80, "dip": "159.203.173.177", "uniform_packets": false}, {"sip": "136.145.231.45", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:08:35.178000", "nhip": "0.0.0.0", "dport": 39855, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.62", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:14:51.358000", "nhip": "0.0.0.0", "dport": 50566, "output": 0, "sport": 80, "dip": "74.82.47.20", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.300000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:19:59.574000", "nhip": "0.0.0.0", "dport": 56686, "output": 0, "sport": 80, "dip": "109.105.124.86", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:19:59.912000", "nhip": "0.0.0.0", "dport": 56722, "output": 0, "sport": 80, "dip": "109.105.124.86", "uniform_packets": false}, {"sip": "136.145.231.47", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:03.950000", "packets": 4, "finnoack": false, "bytes": 326, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:20:17.420000", "nhip": "0.0.0.0", "dport": 48633, "output": 0, "sport": 80, "dip": "198.20.99.130", "uniform_packets": false}, {"sip": "136.145.231.47", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.500000", "packets": 3, "finnoack": false, "bytes": 274, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:20:18.566000", "nhip": "0.0.0.0", "dport": 48831, "output": 0, "sport": 80, "dip": "198.20.99.130", "uniform_packets": false}, {"sip": "136.145.231.62", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:15:26.934000", "nhip": "0.0.0.0", "dport": 34372, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.47", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:05.300000", "packets": 3, "finnoack": false, "bytes": 274, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:20:18.120000", "nhip": "0.0.0.0", "dport": 48755, "output": 0, "sport": 80, "dip": "198.20.99.130", "uniform_packets": false}, {"sip": "136.145.231.21", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 4, "finnoack": false, "bytes": 220, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:25:16.040000", "nhip": "0.0.0.0", "dport": 40176, "output": 0, "sport": 80, "dip": "159.203.173.194", "uniform_packets": false}, {"sip": "136.145.231.62", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:21:26.336000", "nhip": "0.0.0.0", "dport": 33897, "output": 0, "sport": 80, "dip": "74.82.47.41", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:26:47.148000", "nhip": "0.0.0.0", "dport": 44394, "output": 0, "sport": 80, "dip": "147.155.106.26", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:26:47.398000", "nhip": "0.0.0.0", "dport": 44438, "output": 0, "sport": 80, "dip": "147.155.106.26", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.150000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:29:45.436000", "nhip": "0.0.0.0", "dport": 60856, "output": 0, "sport": 80, "dip": "200.17.30.135", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:29:45.836000", "nhip": "0.0.0.0", "dport": 60906, "output": 0, "sport": 80, "dip": "200.17.30.135", "uniform_packets": false}, {"sip": "136.145.231.25", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:59.950000", "packets": 5, "finnoack": false, "bytes": 683, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:31:45.006000", "nhip": "0.0.0.0", "dport": 64187, "output": 0, "sport": 80, "dip": "24.41.251.114", "uniform_packets": false}, {"sip": "136.145.231.21", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:28:36.896000", "nhip": "0.0.0.0", "dport": 45900, "output": 0, "sport": 80, "dip": "80.82.65.192", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:38:09.128000", "nhip": "0.0.0.0", "dport": 49100, "output": 0, "sport": 80, "dip": "137.216.132.51", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:38:09.378000", "nhip": "0.0.0.0", "dport": 49124, "output": 0, "sport": 80, "dip": "137.216.132.51", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:39:03.812000", "nhip": "0.0.0.0", "dport": 40217, "output": 0, "sport": 80, "dip": "193.62.53.2", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:39:04.112000", "nhip": "0.0.0.0", "dport": 40230, "output": 0, "sport": 80, "dip": "193.62.53.2", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.550000", "packets": 10, "finnoack": false, "bytes": 992, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:42:56.436000", "nhip": "0.0.0.0", "dport": 10015, "output": 0, "sport": 80, "dip": "24.104.152.122", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.250000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:42:56.986000", "nhip": "0.0.0.0", "dport": 35352, "output": 0, "sport": 80, "dip": "24.104.152.122", "uniform_packets": false}, {"sip": "136.145.231.47", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:03", "packets": 2, "finnoack": false, "bytes": 106, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:46:14.994000", "nhip": "0.0.0.0", "dport": 59161, "output": 0, "sport": 80, "dip": "202.207.240.35", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.100000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:47:56.610000", "nhip": "0.0.0.0", "dport": 56092, "output": 0, "sport": 80, "dip": "109.105.124.86", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.300000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:47:56.960000", "nhip": "0.0.0.0", "dport": 56132, "output": 0, "sport": 80, "dip": "109.105.124.86", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.200000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:54:24.422000", "nhip": "0.0.0.0", "dport": 56546, "output": 0, "sport": 80, "dip": "128.112.102.63", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:54:24.572000", "nhip": "0.0.0.0", "dport": 56563, "output": 0, "sport": 80, "dip": "128.112.102.63", "uniform_packets": false}, {"sip": "136.145.231.37", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.350000", "packets": 4, "finnoack": false, "bytes": 345, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:58:08.302000", "nhip": "0.0.0.0", "dport": 9016, "output": 0, "sport": 80, "dip": "46.23.74.150", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:59:57.274000", "nhip": "0.0.0.0", "dport": 42640, "output": 0, "sport": 80, "dip": "69.94.164.5", "uniform_packets": false}, {"sip": "136.145.231.61", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 6, "finnoack": false, "bytes": 546, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:59:57.474000", "nhip": "0.0.0.0", "dport": 42664, "output": 0, "sport": 80, "dip": "69.94.164.5", "uniform_packets": false}, {"sip": "136.145.231.21", "protocol": 6, "input": 0, "timeout_started": false, "application": 0, "timeout_killed": false, "duration": "0:00:00.050000", "packets": 1, "finnoack": false, "bytes": 46, "tcpflags": "", "sensor_id": 0, "classtype_id": 3, "stime": "2016-10-25 01:56:03.960000", "nhip": "0.0.0.0", "dport": 44162, "output": 0, "sport": 80, "dip": "178.62.199.206", "uniform_packets": false}];
var geometryP2;
var flowResult = readData(data);
var scrIPList = flowResult[1];
sortIP(scrIPList);
var scrIP = new HashTable();
var scrIPY = [scrIPList.length];
var offset1 = ((10.5 / scrIPList.length) / 2);
var res = 2.8;
for(let i = 0; i < scrIPList.length; i++) {
  res -= offset1;
  scrIPY[i] = res;
}
for(let i = 0; i < scrIPList.length; i++) {
    scrIP.setItem(scrIPList[i], scrIPY[i]);
    console.log(scrIPY[i]);
}

var destIPList = flowResult[2];
sortIP(destIPList);
var destIP = new HashTable();
var destIPY = [destIPList.length];
var offset2 = ((10.5 / destIPList.length) / 2);
var res = 2.8;
for(let i = 0; i < destIPList.length; i++) {
  res -= offset2;
  destIPY[i] = res;
}

for(let i = 0; i < destIPList.length; i++) {
    destIP.setItem(destIPList[i], destIPY[i]);
}

var destPortList=flowResult[3];
destPortList.sort(function(a, b){return b - a});
var destPort = new HashTable();
var destPortY = [destPortList.length];
var offset3 = ((10.5 / destPortList.length) / 2);
var res = 2.8;
for(let i = 0; i < destPortList.length; i++) {
  res -= offset3;
  destPortY[i] = res;
}

for(let i = 0; i < destPortList.length; i++) {
  destPort.setItem(destPortList[i], destPortY[i]);
}


  //holds the result of the function call
   var result;
   var input=flowResult[0];
  //iterates per flow
  //NEED: total number of flows
   for(let i = 0; i < data.length; i++) {
  //function call
      result = Lines(material2, input[i], scrIP, destIP, destPort);

  //adds the line to the scene
     scene.add(result);
  }
//for(var i=0; i<destPortList.length;i++)

 //Adds the permanent lines
  scene.add(line);
  scene.add(line2);

  // text performance
  document.body.appendChild(textRange(window.innerWidth - (window.innerWidth - 47), window.innerHeight - (window.innerHeight - 30), 20, scrIPList[0]));//ScrIP max
  document.body.appendChild(textRange(window.innerWidth - (window.innerWidth - 47), window.innerHeight - 100, 20, scrIPList[scrIPList.length - 1]));//ScrIP min

  document.body.appendChild(textRange(window.innerWidth - ((window.innerWidth / 2) + 70), window.innerHeight - (window.innerHeight - 30), 20, destIPList[0]));//destIP max
  document.body.appendChild(textRange(window.innerWidth - ((window.innerWidth / 2) + 70), window.innerHeight - 100, 20, destIPList[destIPList.length - 1]));//destIP min

  document.body.appendChild(textRange(window.innerWidth - 120, window.innerHeight - (window.innerHeight - 30), 20, destPortList[0]));//destPort max
  document.body.appendChild(textRange(window.innerWidth - 120, window.innerHeight - 100, 20, destPortList[destPortList.length - 1]));//destPort min

  document.body.appendChild(textRange(window.innerWidth - (window.innerWidth - 47), window.innerHeight - 80, 20, "source IP address"));//ScrIP label
  document.body.appendChild(textRange(window.innerWidth - ((window.innerWidth / 2 + 100)), window.innerHeight - 80, 20, "destination IP address"));//destIP label
  document.body.appendChild(textRange(window.innerWidth - 200, window.innerHeight - 80, 20, "destination Port"));//destPort label

  document.body.appendChild(textRange(window.innerWidth - (window.innerWidth - 7), window.innerHeight - (window.innerHeight - 35), 20, "Max"));//left max
  document.body.appendChild(textRange(window.innerWidth - (window.innerWidth - 7), window.innerHeight - 105, 20, "Min"));//left min
  document.body.appendChild(textRange(window.innerWidth - 50, window.innerHeight - (window.innerHeight - 35), 20, "Max"));//right max
  document.body.appendChild(textRange(window.innerWidth - 50, window.innerHeight - 105, 20, "Min"));//right min


//===================================CODE HERE =======================================
//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
/*var mouse = new THREE.Vector2();
var raycater,parentTransform;
    raycaster = new THREE.Raycaster();
    raycaster.linePrecision = 5; //precision on mouse click

//var intersects = raycaster.intersectObjects( parentTransform, true);

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse.clone(), camera );

    console.log("HERE IS A MOUSE X: "+mouse.x);
    console.log("HERE IS A MOUSE Y: "+mouse.y);

    var objects =raycaster.intersectObjects(scene.children);
    for(var i=0; i<objects.length;i++)*/



 window.onMouseClick= function(event) {
// calculate mouse position in normalized device coordinates
// (-1 to +1) for both components
mouse.x = (( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.width ) * 2 - 1;
mouse.y = - (( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.height ) * 2 + 1;
console.log("transformed X => "+ (mouse.x) * (8 / 1.901176470588235));
console.log("transformed Y => "+ ((mouse.y) * (8.8 / 1.693333333333333) - 1.63));
let x = mouse.x * (8 / 1.901176470588235);
let y = mouse.y * ((8.8 / 1.693333333333333) - 1.63);


    //mouse onclick
       /* window.onclick = function(e){

           //var evt = window.event || e;

           var x=transformX(e.clientX);
           var y=transformY(e.clientY);

            var d= document.createElement("DIV");

           // boldLines(x , y, scrIPY, -4);
            d.style.position = "absolute";
            d.style.left = (e.clientX - 10)+ "px";
            d.style.top = (e.clientY-10)+ "px";
            d.style.width="20px";
            d.style.height="100000px";
            d.style.cursor = "pointer";
           // d.style.backgroundColor="black"
           document.body.appendChild(d);
           */
           //using raycaster
   for(let i = 0; i < scrIPList.length; i++) {
    //console.log("Los ips: "+scrIPY[i]);
   let done = scrIPY[i];
 //  if((x<-4+0.09  && x>-4-0.09) && (y<done+0.09  && y>done-0.09)){
    if((x < -4 + 0.09 && x > -4 - 0.01) && (y < (done + 0.09) && y > (done - 0.09))) {
        console.log("x: "+ x);
        console.log("y: "+ y);
        console.log("done para y: "+ done);
        console.log("GUT!!!1");
    }
  }
}

  let light = new THREE.PointLight(0xFFFF00);
  light.position.set(10, 0, 10);
  scene.add(light);

  renderer.setClearColor( 0xffffff, 1);
  renderer.render(scene, camera);
  window.addEventListener('mousedown', onMouseClick, false);
//    scene.add( parentTransform );

};

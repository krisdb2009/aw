var canvas = null;
var ctx = null;
var scaleX = 0;
onload = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    
    requestAnimationFrame(drawLoop);

    canvas.width = 1366;
    scaleX = canvas.width / document.body.clientWidth;

    canvas.height = 768;
    scaleY = canvas.height / document.body.clientHeight;

    onresize();
    
    canvas.onclick = canvas_click;
};

function canvas_click(e) {
    console.log(e);
    mapLoop(function(tile, x, y) {
        tile.clicked = false;
        var mouse_x = e.clientX * scaleX;
        var mouse_y = e.clientY * scaleY;
        if(
            (mouse_x > x && mouse_x < x + tile.type.bitmap.width) && 
            (mouse_y > y && mouse_y < y + tile.type.bitmap.height)
        ) {
            tile.clicked = true;
        }
        
    });
}

onresize = function() {
    //canvas.width = document.body.clientWidth;
    //canvas.height = document.body.clientHeight;
};

var grass_bitmap = new Image();
grass_bitmap.src = 'sprites/grass.png';
var cursor_bitmap = new Image();
cursor_bitmap.src = 'sprites/cursor.png';
var hill_bitmap = new Image();
hill_bitmap.src = 'sprites/hill.png';

var grass = {
    bitmap: grass_bitmap
}
var hill = {
    bitmap: hill_bitmap
}


var map_width = 6;
var map = [
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: hill}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: hill}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass, clicked: true}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}
];



function drawLoop() {
    ctx.imageSmoothingEnabled = false;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPerformance();
    
    
        mapLoop(function(tile, x, y) {
            ctx.drawImage(tile.type.bitmap, x, y);
            if(tile.clicked) {
                ctx.drawImage(cursor_bitmap, x, y);
            } 
        });
        
    


    requestAnimationFrame(drawLoop);
}

function mapLoop(callback = function(tile, x, y) {}) {
    var row = 0;
    var col = 0;
    map.forEach(function(tile, index) {
        var y = row * tile.type.bitmap.height;
        var x = col * tile.type.bitmap.width;
        if(++col >= map_width) {
            row++;
            col = 0;
        }
        callback.call(null, tile, x, y);
    });
}

var perf_before = 0;
var perf_fps = 0;
var perf_count = 0;
function drawPerformance() {
    if((perf_count++ % 30) == 0) {
        perf_fps = Math.round(1000 / (performance.now() - perf_before));
    }
    perf_before = performance.now();
    ctx.fillStyle = 'black';
    ctx.fillRect(canvas.width - 210, 0, 210, 40);
    ctx.fillStyle = 'white';
    ctx.font = '12px Lucida Console';
    ctx.fillText('ba dev (AW) | ' + perf_fps + ' FPS', canvas.width - 200, 12);
    ctx.fillText('ver: 0.0.0.0', canvas.width - 200, 24);
    ctx.fillText('mem: ' + (performance.memory.usedJSHeapSize / 1024 / 1024).toPrecision(3) + ' mb', canvas.width - 200, 36);
}

function randBetween(x, y) {
    return Math.floor(Math.random() * y) + x;  
}
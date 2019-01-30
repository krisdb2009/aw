var canvas = null;
var ctx = null;
var scaleX = 0;
var scaleY = 0;
onload = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    

    
    requestAnimationFrame(drawLoop);


    onresize();
    
    canvas.onclick = canvas_click;
};

function canvas_click(e) {
    mapLoop(function(tile, x, y) {
        if(tile.clicked) {
            tile.clicked = false;
            tile.update = true;
        }
        var mouse_x = e.clientX * scaleX;
        var mouse_y = e.clientY * scaleY;
        if(
            (mouse_x > x && mouse_x < x + tile_width) && 
            (mouse_y > y && mouse_y < y + tile_height)
        ) {
            tile.clicked = true;
            tile.update = true;
        }
        
    });
}

onresize = function() {
    //canvas.width = 1366;
    canvas.width = document.body.clientWidth;
    scaleX = canvas.width / document.body.clientWidth;
    //canvas.height = 768;
    canvas.height = document.body.clientHeight;
    scaleY = canvas.height / document.body.clientHeight;
    mapLoop(function(tile) {
        tile.update = true;
    });
    ctx.imageSmoothingEnabled = false;
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


var map_width = 24;
var map_height = 18;
var tile_width = 120;
var tile_height = 120;
var map_pos_x = 0;
var map_pos_y = 0;
var map = [
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: hill}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: hill}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: hill}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: hill}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: hill}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: hill}, {type: grass}, {type: grass}, {type: grass}, {type: hill}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: hill}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass},
    {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}, {type: grass}
];

function drawLoop() {
    
    //ctx.fillStyle = 'white';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPerformance();
    
    drawMap();
        
        
    


    requestAnimationFrame(drawLoop);
}

function drawMap() {
    mapLoop(function(tile, x, y) {
        if(!tile.update && typeof tile.update !== 'undefined') {
            return;
        }
        if(x < 0 || x > canvas.width) {
            return;
        }
        if(y < 0 || y > canvas.height) {
            return;
        }
        ctx.drawImage(tile.type.bitmap, x, y, tile_width, tile_height);
        if(tile.clicked) {
            ctx.drawImage(cursor_bitmap, x, y, tile_width, tile_height);
        }
        tile.update = false;
    });
}

function scrollMap(x, y) {
    mapLoop(function(tile) {
        tile.update = true;
    });
    var width = map_width * tile_width;
    var height = map_height * tile_height;
    ctx.fillStyle = 'white';
    ctx.fillRect(map_pos_x, map_pos_y, width, height);
    map_pos_x = x;
    map_pos_y = y;
}

function mapLoop(callback = function(tile, x, y) {}) {
    var cur_row = 0;
    var cur_col = 0;
    map.forEach(function(tile, index) {
        var x = (cur_col * tile_width) + map_pos_x;
        var y = (cur_row * tile_height) + map_pos_y;
        if(++cur_col >= map_width) {
            cur_row++;
            cur_col = 0;
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
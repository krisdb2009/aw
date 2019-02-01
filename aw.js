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
    canvas.onmousemove = canvas_mousemove;
    onkeydown = canvas_keydown;
};

function canvas_keydown(e) {
    var left = 37;
    var up = 38;
    var right = 39;
    var down = 40;
    if(e.keyCode == left) {
        scrollMapLeft();
    }
    if(e.keyCode == up) {
        scrollMapUp();
    }
    if(e.keyCode == right) {
        scrollMapRight();
    }
    if(e.keyCode == down) {
        scrollMapDown();
    }
}

function scrollMapLeft() {
    scrollMap(map_pos_x + tile_width, map_pos_y);
}
function scrollMapUp() {
    scrollMap(map_pos_x, map_pos_y + tile_height);
}
function scrollMapRight() {
    scrollMap(map_pos_x + (tile_width * -1), map_pos_y);
}
function scrollMapDown() {
    scrollMap(map_pos_x, map_pos_y + (tile_height * -1));
}

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
var mouse_edge_interval_running = false;
var mouse_edge_interval_int = 0;
var mouse_edge_right = false;
function mouse_edge_interval_start() {
    if(!mouse_edge_interval_running) {
        mouse_edge_interval_running = true;
        mouse_edge_interval_int = setInterval(function() {
            if(mouse_edge_right) {
                scrollMapRight();
            }
        }, 300);
    }
}
function mouse_edge_interval_stop() {
    clearInterval(mouse_edge_interval_int);
    mouse_edge_top = false;
    mouse_edge_right = false;
    mouse_edge_bottom = false;
    mouse_edge_left = false;
    mouse_edge_interval_running = false;
}

function canvas_mousemove(e) {
    if(e.clientX > canvas.width - 50) {
        mouse_edge_right = true;
        mouse_edge_interval_start();
    } else {
        mouse_edge_interval_stop();
    }
    mapLoop(function(tile, x, y) {
        if(tile.hovered) {
            tile.hovered = false;
            tile.update = true;
        }
        var mouse_x = e.clientX * scaleX;
        var mouse_y = e.clientY * scaleY;
        if(
            (mouse_x > x && mouse_x < x + tile_width) && 
            (mouse_y > y && mouse_y < y + tile_height)
        ) {
            tile.hovered = true;
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
    map_pos_center_x = Math.round((canvas.width / 2) - (map_width * tile_width / 2));
    map_pos_center_y = Math.round((canvas.height / 2) - (map_height * tile_height / 2));
    ctx.imageSmoothingEnabled = false;
};

var grass_bitmap = new Image();
grass_bitmap.src = 'sprites/grass.png';
var cursor_bitmap = new Image();
cursor_bitmap.src = 'sprites/cursor.png';
var hover_bitmap = new Image();
hover_bitmap.src = 'sprites/hover.png';
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
var map_pos_center_x = 0;
var map_pos_center_y = 0;
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
        if(x < (0 - tile_width) || x > canvas.width) {
            return;
        }
        if(y < (0 - tile_height) || y > canvas.height) {
            return;
        }
        ctx.drawImage(tile.type.bitmap, x, y, tile_width, tile_height);
        if(tile.clicked) {
            ctx.drawImage(cursor_bitmap, x, y, tile_width, tile_height);
        } else if(tile.hovered) {
            ctx.drawImage(hover_bitmap, x, y, tile_width, tile_height);
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
    ctx.fillRect(map_pos_x + map_pos_center_x, map_pos_y + map_pos_center_y, width, height);
    map_pos_x = x;
    map_pos_y = y;
}

function mapLoop(callback = function(tile, x, y) {}) {
    var cur_row = 0;
    var cur_col = 0;
    map.forEach(function(tile, index) {
        var x = (cur_col * tile_width) + map_pos_x + map_pos_center_x;
        var y = (cur_row * tile_height) + map_pos_y + map_pos_center_y;
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
    ctx.fillRect(canvas.width - 190, 0, 190, 30);
    ctx.fillStyle = 'white';
    ctx.font = '12px Lucida Console';
    ctx.fillText('ba dev (AW) | ' + perf_fps + ' FPS', canvas.width - 185, 12);
    ctx.fillText('ver: 0.0.0.0', canvas.width - 185, 24);
}

function randBetween(x, y) {
    return Math.floor(Math.random() * y) + x;  
}
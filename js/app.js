$(document).ready(function() {
    $("#connect").on("click", function() {
       console.log("trying to connect");
       JP.connect("Joy2Button", function(device){
            console.log("connect" + device);
       });
    }) ;

    var keys = {
        up: false,
        down: false,
        left: false,
        right: false
    };

    var x_v=0, y_v=0;

    JP.onEvent(function(e) {

        if (e.event == "joystick") {
            x_v = e.x / 8;
            y_v = e.y / 8;
            return;
        }

        // for testing
        if (e.key == 'A') {
            e.key = 'left';
        }
        if (e.key == 'B') {
            e.key = 'right';
        }

        if (e.event == "keydown") {
            keys[e.key] = true;
        } else if (e.event == "keyup") {
           keys[e.key] = false;
        }
    });

    var $box = $("#box");
    var y = 200, x = 200;
    var refresh = function() {
        requestAnimationFrame(refresh, window);
        if (keys.right) {
            x++;
        }
        if (keys.up) {
            y--;
        }
        if (keys.left) {
            x--;
        }
        if (keys.down) {
            y++;
        }
        x += x_v;
        y += y_v;
        $box.css({
            left: x,
            top: y
        });
    };
    refresh();

});
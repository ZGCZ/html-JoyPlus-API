$(document).ready(function() {
    $("#connect").on("click", function() {
       console.log("trying to connect");
       JP.connect(function(device){
            console.log(device);
       });
    }) ;

    var keys = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    JP.onEvent(function(e) {
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
        $box.css({
            left: x,
            top: y
        });
    }
    refresh();

});
$(document).ready(function() {
   $("#connect").on("click", function() {
        console.log("trying to connect");
       JP.connect(function(device){
            console.log(device);
       });
   }) ;
});
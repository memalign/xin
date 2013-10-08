

// *** I figured this out by googling for "jquery follow mouse"
var lastX = 0;
// Follow the mouse
$(document).bind('mousemove', function(e){
    // Flip the marine to match the mouse movement
    
    var marineImage = "marine.png";
    var shouldChange = Math.abs(lastX - e.pageX) > 5; // change by at least 5 pixels before we switch direction

    if (shouldChange) {
        if (lastX > e.pageX) {
            marineImage = "marine-left.png";
        }
        // *** I figured this out by googling for "jquery update image"
        document.getElementById("marine").src = marineImage;
        lastX = e.pageX;
    }

    $('#tail').css({
        left:  e.pageX
    });
});

var jumping = false;

// *** I figured this out by googling for "jquery handle keyboard input" and "jquery spacebar"
// Handle keyboard input
$(document).keypress(function(e) {
    if (e.which == '32') { // Spacebar
        
        if (!jumping) {
            jumping = true;
            requestAnimationFrame(updateJump);
        }
    }
});


// *** More details on how animations work can be found in raf.js
var startTime = 0; // Time when the current jump started
function updateJump(time) {
    if (!jumping)
        return;

    var marine = document.getElementById("tail");

    var dt = 0;
    if (startTime > 0) {
        dt = time - startTime;
    } else {
        startTime = time;
    }

    var totalJumpTime = 1000; // milliseconds
    var initialYOffset = 2; // pixels, distance from the bottom
    var maxYOffset = 50; // pixels, occurs half way through totalJumpTime
    // *** I learned this in physics -- simple gravity that follows a parabola!
    // y(t) = maxYOffset - scaleFactor*((t-(totalJumpTime/2)))^2 
    var maxToSquareValue = (totalJumpTime/2);
    var timeScale = maxYOffset/(maxToSquareValue*maxToSquareValue);
    var toSquare = (dt-(totalJumpTime/2));
    var yOffset = initialYOffset + maxYOffset - timeScale*toSquare*toSquare;

    // Force the jump to be over
    if (dt > totalJumpTime) {
        yOffset = initialYOffset;
        jumping = false;
        startTime = 0;
    }

    // Update the position of our marine
    marine.style.bottom = yOffset + "px";

    console.log("dt " + dt + " updating jump to have yOffset " + yOffset);
    if (jumping) {
        requestAnimationFrame(updateJump);
    }
}


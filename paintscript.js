// Declare canvas, context, dragStartPoint, imgData variables.
var canvas;
var cntx;
var dragging = false;
var dragStartPoint;
var imgData;
 
function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

// Using getImageData function get the previous data and store in imgData variable.
function copy() {
    imgData = cntx.getImageData(0, 0, canvas.width, canvas.height);
}

// Put previous data using putImageData function.
function paste() {
    cntx.putImageData(imgData, 0, 0);
}

// Drawing Triangle using Mouse Co-ordinates.
  function drawTriangle(position)
 {   var coordinates = [];
     var angle = 100;
     var sides = 3;

     var radius = Math.sqrt(Math.pow((dragStartPoint.x - position.x), 2) + Math.pow((dragStartPoint.x - position.x), 2));
     var index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartPoint.x + radius * Math.cos(angle), y: dragStartPoint.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    } 

         cntx.beginPath();
    cntx.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        cntx.lineTo(coordinates[index].x, coordinates[index].y);
    }

    cntx.closePath();
     cntx.fill();
 }
      
 // Using draw function to draw triangle
     function draw(position) {
        drawTriangle(position);   
	}

  //randomColor function helps to assign different color to triangle everytime randomaly.
  function randomColor( )
  {  
    var r = Math.round(Math.random( )*256);
    var g = Math.round(Math.random( )*256);
    var b = Math.round(Math.random( )*256);

    return 'rgb( ' + r + ',' + g + ',' + b + ')';

  }

 // Using dragstart, drag, and dragStop function we find out where the  starting position, drag interval, and 
 // end position of the Mouse and it takes event as a perameter.
function dragStart(event) {
    dragging = true;
    dragStartPoint = getCanvasCoordinates(event);
    copy();
}

function drag(event) {
    var position;
    if (dragging === true) {
        paste();
        position = getCanvasCoordinates(event);
        cntx.fillStyle = randomColor( );
        draw(position);
    }
}

function dragStop(event) {
    dragging = false;
    paste();
    cntx.fillStyle = randomColor( );
    var position = getCanvasCoordinates(event);
    draw(position);
}  
// Find the canvas element using getElementById function,
// Using addEventListener function attack a click event to the Documents, when the User clicks anywhere in the Documents,
// Clear all the canvas elements using clearRect function.
function init() {
    canvas = document.getElementById("canvas");
    cntx = canvas.getContext('2d');
   
    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    document.getElementById("clear").addEventListener('mousedown',function(){
    cntx.clearRect(0,0,canvas.width, canvas.height); 
});  

}

window.addEventListener('load', init, false);

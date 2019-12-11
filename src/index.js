var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

let ballRadius = 10;

/*Random color
const cr =
  "rgb(" +
  Math.floor(Math.random() * 256) +
  "," +
  Math.floor(Math.random() * 256) +
  "," +
  Math.floor(Math.random() * 256) +
  ")";
  */

let color = randColor();

function randColor() {
  var letters = "ABCDE".split("");
  var color = "#";
  for (var i = 0; i < 3; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  // drawing code
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  //Subtracting the radius from one edge's width & adding it onto the other
  //gives impression of proper collision detection.
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    //Changes ball color each time it hits wall.
    color = randColor();
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
    //Changes ball color each time it hits wall.
    color = randColor();
  }

  x += dx;
  y += dy;
}

setInterval(draw, 5);

/*
ctx.beginPath();
ctx.rect(20, 40, 50, 50); //Define rectable using rect(); 1st two values specficy
//coordinates of top left; 2nd specify width & height
//In this case makes a perfect square.
ctx.fillStyle = "#FF0000";
//fillstyle stores a color that is used by fill() method
//to paint the square red.
ctx.fill();
ctx.closePath();

//Draws a green circle
ctx.beginPath();
ctx.arc(200, 130, 50, 0, Math.PI * 2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();
//6 parameters:
//x & y coordinates of the arc's center
//arc radius
//start angle & end angle (what angle to start & finish drawing the circle, in radians)
//Direction of drawing(false for clockwise, the default, or true for any-clockwise)
//the last parameter is apparently optional.

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.fillStyle = "cyan";
ctx.fill();
ctx.closePath();
*/
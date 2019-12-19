var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;

//Pressed buttons
let rightPressed = false;
let leftPressed = false;

// Number of rows & columns of bricks; height & width; padding between bricks
//and top and left offset so they're not drawn from edge of canvas.
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let score = 0;

let lives = 3;

// Loop for going through rows & columns to create new bricks.
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      // calculations
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;

          b.status = 0;
          score++; // Increment the score
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN PLAYA, CONGRATULATIONS!" + " Final Score: " + score);

            document.location.reload(); // Reloads game & starts game again
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Helvetica";
  ctx.fillStyle = "#a9a9a9";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Helvetica";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

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

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// drawBricks loops through rows & cols. to set x & y position of each brick.
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#8b0000";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  // drawing code
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  //Subtracting the radius from one edge's width & adding it onto the other
  //gives impression of proper collision detection.
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      color = randColor();
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER! " + "Final Score: " + score);
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  // Change pressed numbers if you want paddle to move faster.
  if (rightPressed) {
    paddleX += 9;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 9;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw); // draw() calls itself over & over
  //reqAniFrame significantly improves rendering framerate
}

draw();

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

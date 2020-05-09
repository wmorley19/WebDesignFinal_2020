/*
Javascript file for Snakeball. This file creates all the variables in the game, keeps track of the score, 
and calls the mysqlScores.php file to post to the database. 
*/
window.alert("Welcome to SnakeBall! Use the arrow keys to hit the baseball as many times as you can! Be careful, if you hit the wall or hit yourself, that is the 3rd out of the 9th inning! See how many hits you can get in a row! Play ball!");

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


const ballimg = new Image();
ballimg.src= "rbaseball.JPG";

const batimg = new Image();
batimg.src ="bat.jpg";

let dead = new Audio();
dead.src = "thatsall.mp3";

let hit = new Audio();
hit.src = "hit.mp3";

let bg = new Audio();
bg.src = "takemeout.mp3";

var player = prompt("Enter your name:");
var grid = 16;
var count = 0;
var score = 0;


//initalize snake
var snake = {
  x: 224,
  y: 224,
  dx: 0,
  dy: 0,
  cells: [],
  maxCells: 1
};

//initialize ball
var ball = {
  x: 320,
  y: 160
};

//reset the game
function PlayAgain(){
        bg.play();
        snake.x = 224;
        snake.y = 224;
        snake.cells = [];
        snake.maxCells = 1;
        snake.dx = 0;
        snake.dy = 0;
        score = 0;
        ball.x = MakeBalls(0, 30) * grid;
        ball.y = MakeBalls(0, 30) * grid;
}

//Creates random locations within the canvas
function MakeBalls(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Displays high scores on screen
function LeaderBoard(){
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange=function(){
    if(this.readyState == 4 && this.status == 200)
      document.getElementById("highscorestable").innerHTML = this.responseText;
      var modal = document.getElementById("highscorediv");
      modal.style.display = "block";
  };
   xmlhttp.open("GET","Leaderboard.php",true);
   xmlhttp.send();
}

//save scores to the database
function SaveScores(){
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status ==200){
    }
  };
  xmlhttp.open("GET", "mysqlScores.php?player="+ player + "&score=" +score);
  xmlhttp.send();
}

// pop up window to play again or post to the db. Boolean return value
function Retry(){
  var r = confirm("Play again?");
  if(r == true){
    PlayAgain();
  }
  if(r == false){
    SaveScores();
    LeaderBoard();
    //window.stop();
    window.cancelAnimationFrame();
  }
}

//starts the game. 
function play() {
  requestAnimationFrame(play);
  bg.play();
  // slow game loop to 15 fps instead of 60 (60/15 = 4)
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;

  // collsions with left side
  if (snake.x < 0) {
    bg.pause();
    dead.play();
    window.alert("Your score was:"+score);
    Retry();
  }
  //collisons with right side
  else if (snake.x >= canvas.width) {
    bg.pause();
    dead.play();
    window.alert("Your score was: "+score);
    Retry();
  }
  //collsions with bottom
  if (snake.y < 0) {
    bg.pause();
    dead.play();
    window.alert("Your score was:"+score);
    Retry();
  }
  //collisons with top
  else if (snake.y >= canvas.height) {
    bg.pause();
    dead.play();
    window.alert("Your score was:"+score);
    Retry();
  }

  // keep the head as begining of array
  snake.cells.unshift({x: snake.x, y: snake.y});

  // remove cells so it looks like we are moving
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // draw baseball
  context.drawImage(ballimg, ball.x, ball.y, grid-1, grid-1);
  //draw snake made of bats
  snake.cells.forEach(function(cell, index) {
    // drawing 1 px smaller than the grid creates gaps between snake elements
    context.drawImage(batimg,cell.x, cell.y, grid-1, grid-1);  

    // collision with ball
    if (cell.x == ball.x && cell.y == ball.y) {
      hit.play();
      snake.maxCells++;
      ball.x = MakeBalls(0, 30) * grid;
      ball.y = MakeBalls(0, 30) * grid;
      score++;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      // collision with body. Ends game. 
      if (cell.x == snake.cells[i].x && cell.y == snake.cells[i].y) {
        bg.pause();
        dead.play();
        window.alert("Your score was:"+score);
        Retry();
      }
    }
  });
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
  //left
  if (e.which == 37 && snake.dx == 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up
  else if (e.which == 38 && snake.dy == 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right 
  else if (e.which == 39 && snake.dx == 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down
  else if (e.which == 40 && snake.dy == 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// start the game
requestAnimationFrame(play);
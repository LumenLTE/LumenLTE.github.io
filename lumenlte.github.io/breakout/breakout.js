var canvas = document.getElementById("breakout");
var ctx = canvas.getContext("2d");
var lives = 3;
var score = 0;

var ball;

var paddle;

function brick(newX, newY, newWidth, newHeight, health, bounty)
{
	this.x = newX;
	this.y = newY;
	this.width = newWidth;
	this.height = newHeight;
	this.health = health;
	this.bounty = bounty;
}

var brickRow1 = [];
var brickRow2 = [];
var brickRow3 = [];

var row1Bounty = 400;
var row2Bounty = 300;
var row3Bounty = 200;

var prevPos = 0;

var blockCountRow = 10;

brickRow1[0] = new brick(2.5, 50, 70, 20, 3, row1Bounty)

for(i = 1; i < blockCountRow; i++)
{
	brickRow1[i] = new brick(prevPos + 80, 50, 70, 20, 3, row1Bounty);
	prevPos = brickRow1[i].x;
}

prevPos = 0;
brickRow2[0] =  new brick(2.5, 100, 70, 20, 2, row2Bounty)
for(i = 1; i < blockCountRow; i++)
{
	brickRow2[i] = new brick(prevPos + 80, 100, 70, 20, 2, row2Bounty)
	prevPos = brickRow2[i].x;
}

prevPos = 0;
brickRow3[0] =  new brick(2.5, 150, 70, 20, 1, row3Bounty)
for(i = 1; i < blockCountRow; i++)
{
	brickRow3[i] = new brick(prevPos + 80, 150, 70, 20, 1, row3Bounty)
	prevPos = brickRow3[i].x;
}


console.log(brickRow1);

var keysDown = {};

function render() {
  //clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw the ball
  if(lives > 0){
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fill();

	ctx.beginPath();
	ctx.arc(0, 0, 3, 0, Math.PI * 2);
	ctx.fill();
  
	//draw the paddle?
	ctx.fillStyle = "lightblue";
	ctx.beginPath();
	ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
	ctx.fill();
	
	ctx.fillStyle = "red";


	for(i = 1; i < blockCountRow; i++)
	{
		if(brickRow1[i].health > 0)
		{
			ctx.beginPath();
			ctx.rect(brickRow1[i].x, brickRow1[i].y, brickRow1[i].width, brickRow1[i].height);
			ctx.closePath();
			ctx.fill();
		}
	}

	if(brickRow1[0].health > 0)
	{
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.rect(brickRow1[0].x, brickRow1[0].y, brickRow1[0].width, brickRow1[0].height);
		ctx.fill();
	}

	ctx.fillStyle = "green";

	if(brickRow2[0].health > 0)
	{
		ctx.beginPath();
		ctx.rect(brickRow1[0].x, brickRow1[0].y, brickRow1[0].width, brickRow1[0].height);
		ctx.fill();
	}

	for(i = 1; i < blockCountRow; i++)
	{
		if(brickRow2[i].health > 0)
		{
			ctx.beginPath();
			ctx.rect(brickRow2[i].x, brickRow2[i].y, brickRow2[i].width, brickRow2[i].height);
			ctx.closePath();
			ctx.fill();
		}
	}

	ctx.fillStyle = "blue";

	if(brickRow3[0].health > 0)
	{
		ctx.beginPath();
		ctx.rect(brickRow3[0].x, brickRow3[0].y, brickRow3[0].width, brickRow3[0].height);
		ctx.fill();
	}

	for(i = 1; i < blockCountRow; i++)
	{
		if(brickRow3[i].health > 0)
		{
			ctx.beginPath();
			ctx.rect(brickRow3[i].x, brickRow3[i].y, brickRow3[i].width, brickRow3[i].height);
			ctx.closePath();
			ctx.fill();
		}
	}

	
	
	ctx.font = "30px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Lives: " + lives, 30, 30);

	ctx.fillText("Score: " + score, 300, 30);
	
	
  }
  else
  {
	  ctx.fillText("Game Over! Press Space to restart!", canvas.width / 2 - 250, canvas.height / 2);
  }
}

function update(elapsed) {
	if(lives > 0){
		//update the ball position according to the elapsed time
		ball.y += ball.ySpeed * elapsed;
		ball.x += ball.xSpeed * elapsed;

		//bounce the ball off* all edges
		if(ball.x <= 10) {
			ball.xSpeed *= -1;
			ball.x = 10;
		}
		else if(ball.x >= canvas.width - 10)
		{
			ball.xSpeed *= -1;
			ball.x = canvas.width - 10;
		}
		if(ball.y <= 10) {
			ball.ySpeed *= -1;
			ball.y = 10;
		}
		else if(ball.y >= canvas.height - 10)
		{
			ball.ySpeed *= -1;
			ball.y = canvas.height - 10;
			lives -= 1;
			ball.x = canvas.width / 2;
			ball.y = canvas.height / 2;
			ball.xSpeed = -250;
		}
		
		//bounce the ball off the padlde
		if(ball.x > paddle.x && ball.x < paddle.x + 100)
		{
			if(ball.y > paddle.y - 10 && ball.y < paddle.y + 10)
			{
				ball.ySpeed *= -1;
				ball.y -= 10;
			}
			
		}

		for(i = 0; i < blockCountRow; i++)
		{
			if(brickRow1[i].health > 0)
			{
				if(ball.x > brickRow1[i].x && ball.x < brickRow1[i].x + 80)
				{
					if((ball.y > brickRow1[i].y - 10 && ball.y < brickRow1[i].y))
					{
						ball.ySpeed *= -1;
						ball.y -= 5;
						//console.log("collided with the top of block" + i);	
						brickRow1[i].health -= 1;
						if(brickRow1[i].health == 0)
						{
							score += brickRow1[i].bounty;
						}
					}
					if((ball.y < brickRow1[i].y + 25 && ball.y > brickRow1[i].y))
					{
						ball.ySpeed *= -1;
						ball.y += 5;
						//console.log("collided with the bottom of block " + i);
						brickRow1[i].health -= 1;
						if(brickRow1[i].health == 0)
						{
							score += brickRow1[i].bounty;
						}
					}
				}
			}
		}

		for(i = 0; i < blockCountRow; i++)
		{
			if(brickRow2[i].health > 0)
			{
				if(ball.x > brickRow2[i].x && ball.x < brickRow2[i].x + 80)
				{
					if((ball.y > brickRow2[i].y - 10 && ball.y < brickRow2[i].y))
					{
						ball.ySpeed *= -1;
						ball.y -= 5;
						//console.log("collided with the top of block" + i);	
						brickRow2[i].health -= 1;
						if(brickRow2[i].health == 0)
						{
							score += brickRow1[i].bounty;
						}
					}
					if((ball.y < brickRow2[i].y + 25 && ball.y > brickRow2[i].y))
					{
						ball.ySpeed *= -1;
						ball.y += 5;
						//console.log("collided with the bottom of block " + i);
						brickRow2[i].health -= 1;
						if(brickRow2[i].health == 0)
						{
							score += brickRow1[i].bounty;
						}
					}
				}
			}
		}

		for(i = 0; i < blockCountRow; i++)
		{
			if(brickRow3[i].health > 0)
			{
				if(ball.x > brickRow3[i].x && ball.x < brickRow3[i].x + 80)
				{
					if((ball.y > brickRow3[i].y - 10 && ball.y < brickRow3[i].y))
					{
						ball.ySpeed *= -1;
						ball.y -= 5;
						//console.log("collided with the top of block" + i);	
						brickRow3[i].health -= 1;
						if(brickRow3[i].health == 0)
						{
							score += brickRow1[i].bounty;
						}
					}
					if((ball.y < brickRow3[i].y + 25 && ball.y > brickRow3[i].y))
					{
						ball.ySpeed *= -1;
						ball.y += 5;
						//console.log("collided with the bottom of block " + i);
						brickRow3[i].health -= 1;
						if(brickRow3[i].health == 0)
						{
							score += brickRow1[i].bounty;
						}
					}
				}
			}
		}

		//move the paddle
		if(37 in keysDown)
		{
			paddle.x -= paddle.speed * elapsed; 
		}
		if(39 in keysDown)
		{
			paddle.x += paddle.speed * elapsed; 
		}
	}
	//if u ded, then we wait for the player to press space before restarting.
	else{
		if(32 in keysDown)
		{
		  resetGame();
		}
	}
}

function resetGame()
{
	lives = 3;
	score = 0;
	ball = {
		x: canvas.width / 2,   //pixels
		y: canvas.height / 2 + 150,  //pixels
		xSpeed: 250,           //pixels per second
		ySpeed: -150,           //pixels per second
		radius: 10            //pixels
	}
	
	paddle = {
		x: canvas.width / 3,
		y: canvas.height - 40,
		speed: 500,
		width: 100,
		height: 15
	}
	console.log("Game is restarting...");
	
	
}

var previous;
function run(timestamp) {
  if (!previous) previous = timestamp;          //start with no elapsed time
  var elapsed = (timestamp - previous) / 1000;  //work out the elapsed time
  update(elapsed);                              //update the game with the elapsed time
  render();                                     //render the scene
  previous = timestamp;                         //set the (globally defined) previous timestamp ready for next time
  window.requestAnimationFrame(run);            //ask browser to call this function again, when it's ready
}

//trigger the game loop
window.addEventListener("keydown", function(event){
	keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event){
	delete keysDown[event.keyCode];
});

resetGame();
window.requestAnimationFrame(run);

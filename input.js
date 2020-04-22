var cv = document.getElementById("myCanvas");
var sc = document.getElementById("score");
var cnt = document.getElementById("content");
var c = cv.getContext("2d");
var step = 20;
var score = 1;
const height = 700;
const width = 700;
var size = step;
var pos = 0;

sc.innerHTML = score;

function CreatObject(x, y)
{
	this.x = x;
	this.y = y;
	var left;
	var right;
	var up;
	var down;
}

var head = new CreatObject(pos, pos);
head.left = true;
head.right = false;
head.up = false;
head.down = false;

var snake = [];
snake.push(head);

var bait = new CreatObject(Math.floor(Math.random() * 35) * step, Math.floor(Math.random() * 35) * step);

document.onkeydown = function(event)
{
	
	switch(event.keyCode)
	{
		case 37:
		{
			if(snake[0].up || snake[0].down)
			{
				snake[0].left = true;
				snake[0].right = false;
				snake[0].up = false;
				snake[0].down = false;
			}
			break;
		}

		case 38:
		{
			if(snake[0].left || snake[0].right)
			{
				snake[0].left = false;
				snake[0].right = false;
				snake[0].up = true;
				snake[0].down = false;
			}
			break;
		}

		case 39:
		{
			if(snake[0].up || snake[0].down)
			{
				snake[0].left = false;
				snake[0].right = true;
				snake[0].up = false;
				snake[0].down = false;
			}
			break;
		}

		case 40:
		{
			if(snake[0].left || snake[0].right)
			{
				snake[0].left = false;
				snake[0].right = false;
				snake[0].up = false;
				snake[0].down = true;
			}
			break;
		}
	}

}

function gameOver()
{
	for (var i = snake.length - 1; i > 0; i--)
	{
		if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
		{
			return true;
		}
	}
	return false;
}

function bait_eaten()
{
	if(snake[0].x == bait.x && snake[0].y == bait.y)
		return true;
	else
		return false;
}

var _frame = 0;

var id = setInterval(frame, 30);
function frame()
{
	if(gameOver())
	{
		clearInterval(id);
	}else{
		if(bait_eaten())
		{
			++score;
			sc.innerHTML = score;
			var new_tail = new CreatObject(snake[snake.length - 1].x, snake[snake.length - 1].y);
			new_tail.left = snake[snake.length - 1].left;
			new_tail.right = snake[snake.length - 1].right;
			new_tail.up = snake[snake.length - 1].up;
			new_tail.down = snake[snake.length - 1].down;
			if(snake[snake.length - 1].left)
			{
				new_tail.x += step;
			}else{
				if(snake[snake.length - 1].right)
					new_tail.x -= step;
				else
					if(snake[snake.length - 1].up)
						new_tail.y += step;
					else
						new_tail.y -= step;
			}

			snake.push(new_tail);

			bait.x = Math.floor(Math.random() * 35) * step;
			bait.y = Math.floor(Math.random() * 35) * step;
		}

		for (var i = snake.length - 1; i >= 0; i--)
		{
			if(snake[i].left)
			{
				snake[i].x -= step;
				if(snake[i].x <= -size)
					snake[i].x = width - size;
			}else{
				if(snake[i].right)
				{
					snake[i].x += step;
					if(snake[i].x >= width)
						snake[i].x = 0;
				}else{
					if(snake[i].up)
					{
						snake[i].y -= step;
						if(snake[i].y <= -size)
							snake[i].y = height - size;
					}else{
						snake[i].y += step;
						if(snake[i].y >= height)
							snake[i].y = 0;
					}
				}
			}
			
			if (i > 0)
			{
				snake[i].left = snake[i-1].left;
				snake[i].right = snake[i-1].right;
				snake[i].up = snake[i-1].up;
				snake[i].down = snake[i-1].down;
			}
		}

		//console.log(snake[0].x, snake[0].y);

		draw();

		++_frame;
	}
}

function draw()
{
	c.clearRect(0, 0, 1500, 700);
	c.beginPath()
	c.fillStyle = "#00ff00";
	c.fillRect(bait.x, bait.y, size, size);
	c.stroke();
	
	c.beginPath();
	c.fillStyle = "#ff0000";
	for (var i = snake.length - 1; i >= 0; i--)
		c.fillRect(snake[i].x, snake[i].y, size, size);
	c.stroke();
}
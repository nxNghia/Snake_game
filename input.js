var cv = document.getElementById("myCanvas");
var sc = document.getElementById("score");
var cnt = document.getElementById("content");
var c = cv.getContext("2d");
const step = 10;
var score = 0;
const height = cv.height;
const width = cv.width;
var left = true;
var right = false;
var up = false;
var down = false;
var finished = true;
sc.innerHTML = score;

function CreatObject(x, y)
{
	this.x = x;
	this.y = y;
}

document.onkeydown = function(event)
{
	
	switch(event.keyCode)
	{
		case 37:
		{
			if(up || down)
			{
				left = true;
				right = false;
				up = false;
				down = false;
			}
			break;
		}

		case 38:
		{
			if(left || right)
			{
				left = false;
				right = false;
				up = true;
				down = false;
			}
			break;
		}

		case 39:
		{
			if(up || down)
			{
				left = false;
				right = true;
				up = false;
				down = false;
			}
			break;
		}

		case 40:
		{
			if(left || right)
			{
				left = false;
				right = false;
				up = false;
				down = true;
			}
			break;
		}
	}

}

function gameOver(snake)
{
	for (var i = snake.length - 1; i > 2; i--)
	{
		if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
		{
			return true;
		}
	}
	return false;
}

function inSnake(snake, x, y)
{
	for (var i = snake.length - 1; i >= 0; i--)
		if(snake[i].x == x && snake[i].y == y)
			return true;
	return false;
}

function bait_generate(bait)
{
	var x, y;

	do
	{
		x = Math.floor(Math.random() * width / step) * step;
		y = Math.floor(Math.random() * height / step) * step;
	}while(inSnake(x, y) == true);

	bait.x = x;
	bait.y = y;
}

function bait_eaten(snake, bait)
{
	if(snake[0].x == bait.x && snake[0].y == bait.y)
		return true;
	else
		return false;
}

function draw(snake, bait)
{
	c.clearRect(0, 0, width, height);
	c.beginPath()
	c.fillStyle = "#138dff";
	c.fillRect(bait.x, bait.y, step, step);
	c.stroke();
	
	c.beginPath();
	c.fillStyle = "#ff0000";
	for (var i = snake.length - 1; i >= 0; i--)
		c.fillRect(snake[i].x + 1, snake[i].y + 1, step - 2, step - 2);
	c.stroke();
}

function reset()
{
	c.clearRect(0, 0, width, height);
	finished = true;
	score = 0;
	sc.innerHTML = score;
}

function begin()
{
	if(finished == true)
	{
		finished = false;
		var pos = Math.floor(Math.random() * width / step) * step;
		var head = new CreatObject(pos, pos);

		var snake = [];
		snake.push(head);

		var bait = new CreatObject(Math.floor(Math.random() * width / step) * step, Math.floor(Math.random() * height / step) * step);

		var id = setInterval(frame, 30);

		function frame()
		{
			if(gameOver(snake))
			{
				clearInterval(id);
			}else{
				if(bait_eaten(snake, bait))
				{
					++score;
					sc.innerHTML = score;
					var new_tail = new CreatObject(snake[snake.length - 1].x, snake[snake.length - 1].y);

					if(snake.length == 1)
					{
						if(left)
							new_tail.x += step;
						else
							if(right)
								new_tail.x -= step;
							else
								if(up)
									new_tail.y += step;
								else
									new_tail.y -= step;
					}else{
						if(snake[snake.length - 2].x == snake[snake.length - 1].x + step)
							new_tail.x += step;
						else
							if(snake[snake.length - 2].x == snake[snake.length - 1].x - step)
								new_tail.x -= step;
							else
								if(snake[snake.length - 2].y == snake[snake.length - 1].y - step)
									new_tail.y += step;
								else
									new_tail.y -= step;
					}

					snake.push(new_tail);

					bait_generate(bait);
				}

				for (var i = snake.length - 1; i > 0; i--)
				{
					snake[i].x = snake[i-1].x;
					snake[i].y = snake[i-1].y;
				}

				if(left)
				{
					snake[0].x -= step;
					if(snake[0].x <= -step)
						snake[0].x = width - step;
				}else{
					if(right)
					{
						snake[0].x += step;
						if(snake[0].x >= width)
							snake[0].x = 0;
					}else{
						if(up)
						{
							snake[0].y -= step;
							if(snake[0].y <= -step)
								snake[0].y = height - step;
						}else{
							snake[0].y += step;
							if(snake[0].y >= height)
								snake[0].y = 0;
						}
					}
				}

				draw(snake, bait);
			}
		}
	}
}

begin();

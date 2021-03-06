
// game variables

var playerShip, 
	invaders,
	bullets,
	
	screenWidth, 
	screenHeight;

var canvas, 
	ctx; 

	init(); 
	
	
function init(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	initListeners(); 

	startGame(); 
}

// MAIN GAME LOOP

function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	
	checkKeys(); 
	updateInvaders(); 
	updateBullets();
	 
	checkCollisions(); 

	playerShip.render(ctx); 
	renderInvaders(); 
	renderBullets(); 
	
}	

function checkKeys() { 
	if(KeyTracker.isKeyDown(Key.LEFT)) {
		playerShip.goLeft(); 
	}
	
	if(KeyTracker.isKeyDown(Key.RIGHT)) {
		playerShip.goRight(); 
	}
	
}

function checkCollisions() { 
	
	for(var i = 0; i<bullets.length; i++) { 
		
		var bullet = bullets[i]; 
		
		for (var j = 0; j<invaders.length; j++) { 
			var invader = invaders[j]; 
		
			if( rectRectPenetrationTest(invader, bullet)) {
				invaders.splice(j,1); 
				j--; 
				bullets.splice(i,1); 
				i--; 
				break; 
			}
		}
	}
}



function rectRectPenetrationTest(rect1, rect2) { 
	if( ((rect1.pos.x<rect2.pos.x + rect2.width) && (rect1.pos.x+rect1.width>rect2.pos.x)) &&
			((rect1.pos.y<rect2.pos.y + rect2.height) && (rect1.pos.y+rect1.height > rect2.pos.y))) { 
		return true; 
	} else { 
		return false; 
	}
}

function startGame() { 
	
	resetInvaders(); 
	
}

function updateBullets(){
	for(var i = 0 ; i<bullets.length; i++) { 
		var b = bullets[i]; 
		b.update(); 
		if(b.pos.y<0) {
			bullets.splice(i,1); 
			i--; 
		}	
	}
}


function updateInvaders() { 
	// for(var i = 0; i<invaders.length; i++) { 
	// 	invaders[i].update(); 
	// }
}

function renderBullets() { 
	for(var i = 0; i<bullets.length; i++) { 
		bullets[i].render(ctx); 
	}
}

function renderInvaders() { 
	for(var i = 0; i<invaders.length; i++) { 
		invaders[i].render(ctx); 
	}
}

function resetInvaders() { 

	invaders = []; 
	
	for(var x = 0; x<10; x++) { 
		for(var y = 0; y<5; y++) { 
			invaders.push(new Invader(((screenWidth-600)/2)+x*60,60+y*50)); 
		}
	}

}

function initVars() { 
	screenWidth = window.innerWidth; 
	screenHeight = window.innerHeight; 	
}

function initCanvas() { 

	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas); 
	canvas.width = screenWidth; 
	canvas.height = screenHeight;
}

function initObjects() { 

	playerShip = new PlayerShip(); 
	bullets = []; 
	invaders = []; 
	
}

function initListeners() { 
	
	KeyTracker.addKeyDownListener(" ", firePressed); 
	KeyTracker.addKeyDownListener(Key.UP, firePressed); 

}

function firePressed() { 
	bullets.push(new Bullet(playerShip.pos.x+playerShip.width/2, playerShip.pos.y)); 

}


function PlayerShip() { 
	this.pos = new Vector2(screenWidth/2, screenHeight-50); 
	this.width = 60; 
	this.height = 30; 
	this.moveSpeed = 10; 
	
	this.render = function(c) { 
		c.fillStyle = 'white';
		c.fillRect(this.pos.x, this.pos.y, this.width, this.height); 
	}	
	
	this.goLeft = function() { 
		this.pos.x-=this.moveSpeed; 
	}
	
	this.goRight = function() { 
		this.pos.x+=this.moveSpeed;
	}
	
}

function Invader(x,y)  {

	this.pos = new Vector2(x,y); 
	this.width = 50; 
	this.height = 40; 
	
	this.render = function (c) { 
		c.fillStyle = 'red';
		c.fillRect(this.pos.x, this.pos.y, this.width, this.height);	
	}
	
}

function Bullet(x,y) { 
	this.pos = new Vector2(x,y); 
	this.vel = new Vector2(0,-15); 
	this.width = 5; 
	this.height = 15; 
	
	this.update = function() { 
		this.pos.plusEq(this.vel); 
		
	}
	this.render = function(c) { 
		c.fillStyle = 'white'; 
		c.fillRect(this.pos.x, this.pos.y, this.width, this.height);	
		
	}
	
}
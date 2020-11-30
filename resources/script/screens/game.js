class GameScreen extends Screen{	
	start(){
		// The input in update must be called before the machineState in update of player
		// GameScreen.bloodParticle = new SimpleParticle(PARTICLE_IMAGE.BLOOD, new Rect(1, 1, 1, 1), 3, particleBloodNumber);
		GameScreen.world = new World(0,0);
		
		GameScreen.player = new Player(50, 250);
		// GameScreen.player.updatePriority = this.updatePriority - 1;
		
		// Create the text gui
		GameScreen.infodump = new Text('', 10, Ramu.canvas.height - 50, Ramu.canvas.width - 20);
		// GameScreen.infodump.fillStyle = "white";
		// GameScreen.infodump.font = "20px sans-serif";
		
		Ramu.callSortUpdate = true;
	}

	update(){
		this.input();
	}
	
	input(){
		if (GameScreen.player.life <= 0)
			return;
		
		// da para tentar jogar um raycast nas diagonais então verificar se ele pressionou duas teclas juntos 
		
		if 		(keyCode.a in Ramu.lastKeysPressed) 	  GameScreen.player.shot();
		if 		(keyCode.s in Ramu.lastKeysPressed) 	  GameScreen.player.disappear();	
		if  	(keyCode.up_arrow in Ramu.pressedKeys)    GameScreen.player.walkUp();
		else if (keyCode.left_arrow in Ramu.pressedKeys)  GameScreen.player.walkLeft();
		else if (keyCode.right_arrow in Ramu.pressedKeys) GameScreen.player.walkRight();
		else if (keyCode.down_arrow in Ramu.pressedKeys)  GameScreen.player.walkDown();
		// set the animation state to idle if not key is pressed
		else GameScreen.player.machineState(false);
		
	}
	
	destroy(){
		console.log("destroy")
		
		// GameScreen.infodump.destroy();
		// GameScreen.infodump = null;
		
		GameScreen.world.destroy();
		GameScreen.world = null;
		
		// GameScreen.bloodParticle.destroy();
		// GameScreen.bloodParticle = null;
	}
}
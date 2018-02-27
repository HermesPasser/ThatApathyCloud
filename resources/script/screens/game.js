class GameScreen extends Screen{	
	start(){
		// The input in update must be called before the machineState in update of player
		GameScreen.bloodParticle = new SimpleParticle(PARTICLE_IMAGE.BLOOD, new Rect(1, 1, 1, 1), 3, particleBloodNumber);
		GameScreen.world = new World(0,0);
		
		GameScreen.player = new Player(200,200);
		GameScreen.player.updatePriority = this.updatePriority - 1;
				
		// precisa ser adicionado pelo spawn objs
		// GameScreen.emtest = new Enemy(200, 250);
		
		// Create the text gui
		GameScreen.infodump = new Text('', Ramu.canvas.width / 2 - 30, Ramu.canvas.height - 50, 100);
		GameScreen.infodump.fillStyle = "white";
		
		GameObj.sortPriority();	
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
	}
}
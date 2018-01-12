class GameScreen extends Screen{	
	start(){
		// The input in update must be called before the machineState in update of player
		GameScreen.player = new Player(200,200);
		GameScreen.player.updatePriority = this.updatePriority - 1;
		GameScreen.world = new World(0,0);
		GameObj.sortPriority();	
	}
	
	update(){
		this.input();
	}
	
	input(){
		if (keyCode.up_arrow in Ramu.pressedKeys)    GameScreen.player.walkUp();
		if (keyCode.left_arrow in Ramu.pressedKeys)  GameScreen.player.walkLeft();
		if (keyCode.right_arrow in Ramu.pressedKeys) GameScreen.player.walkRight();
		if (keyCode.down_arrow in Ramu.pressedKeys)  GameScreen.player.walkDown();
		if (keyCode.s in Ramu.lastKeysPressed) 		 GameScreen.player.disappear();	
		if (keyCode.a in Ramu.lastKeysPressed) 		 GameScreen.player.shot();
	}
}
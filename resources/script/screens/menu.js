class MenuScreen extends Screen{
	start(){
		this.positions = [0, 80, 160]; // newGame option exit
		this.currentPosition = this.positions[0];
		
		this.menu = new Sprite(RamuUtils.getImage("resources/sprite/title_menu.png"), 10, 10, 195, 24);
		this.center(this.menu);
		this.menu.y += 40;
		
		this.cursor = new Sprite(RamuUtils.getImage("resources/sprite/title_cursor.png"), 10, 10, 31, 24);
		this.cursor.y += this.menu.y - this.cursor.height / 2;
		this.setupCursor(this.currentPosition);		
	}
	
	// ainda ta bugado
	
	setupCursor(){
		this.cursor.x = this.menu.x - this.cursor.width / 2  + this.positions[this.currentPosition];
	}
	
	cursorLeft(){
		this.currentPosition--;
		
		if (this.currentPosition <= 0)
			this.currentPosition = 0;
		
		this.setupCursor();
	}
	
	cursorRight(){
		this.currentPosition++;

		if (this.currentPosition >= this.positions.length - 1)
			this.currentPosition = this.positions.length - 1;
		
		this.setupCursor();
	}
	
	confirm(){
		switch(this.currentPosition){
			case this.positions[0]: // newGame
				Machine.changeState(Machine.STATE.GAME);
				break;
			case this.positions[1]:	// option
				break;
			case this.positions[2]: // exit
				break;
		}
	}
	
	input(){
		if (keyCode.enter in Ramu.lastKeysPressed)  	 this.confirm();
		if (keyCode.left_arrow in Ramu.lastKeysPressed)  this.cursorLeft();
		if (keyCode.right_arrow in Ramu.lastKeysPressed) this.cursorRight();
	}
	
	update(){

	}
	
	destroy(){
		this.menu.destroy();	
		this.cursor.destroy();
		super.destroy();
	}
}
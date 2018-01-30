class TitleScreen extends Screen{
	start(){
		this.position = 0;
		
		this.titlescreen = new Sprite(RamuUtils.getImage("resources/sprite/title_screen.png"), 1, 1, 500, 500);
		this.menu = [
			new Spritesheet(BASIS.IMAGE, new Rect(200, 250, 194, 24), 1, 1, 194, 24),
			new Spritesheet(BASIS.IMAGE, new Rect(200, 275, 194, 24), 1, 1, 194, 24),
			new Spritesheet(BASIS.IMAGE, new Rect(200, 300, 194, 24), 1, 1, 194, 24)
		];
		
		for (let i = 0; i < this.menu.length; i++){
			this.center(this.menu[i]);
			this.menu[i].y += 40;
		}
		
		this.setupCursor(0);		
	}
		
	setupCursor(position = 0){
		SOUND.CHANGE_OP.play();
		
		for (let i = 0; i < this.menu.length; i++){
			if (position == i)
				this.menu[i].canDraw = true;
			else
				this.menu[i].canDraw = false;
		}
	}
	
	cursorLeft(){
		this.position--;
		
		if (this.position < 0)
			this.position = 2;
		
		this.setupCursor(this.position);
	}
	
	cursorRight(){
		this.position++;

		if (this.position > 2)
			this.position = 0;
		
		this.setupCursor(this.position);
	}
	
	confirm(){
		SOUND.CHANGE_OP.play();
		switch(this.position){
			case 0: // newGame
				Machine.changeState(Machine.STATE.INTRO);
				break;
			case 1:	// option
				break;
			case 2: // exit
				break;
		}
	}
	
	input(){
		if (keyCode.enter in Ramu.lastKeysPressed)  	 this.confirm();
		if (keyCode.left_arrow in Ramu.lastKeysPressed)  this.cursorLeft();
		if (keyCode.right_arrow in Ramu.lastKeysPressed) this.cursorRight();
		
		Ramu.lastKeysPressed = [];
	}
	
	update(){
		this.input();
	}
	
	destroy(){
		for (let i = 0; i < this.menu.length; i++)
			this.menu[i].destroy();
		this.titlescreen.destroy();
		
		delete this.titlescreen;
		super.destroy();
	}
}
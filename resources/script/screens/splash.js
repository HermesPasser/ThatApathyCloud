class SplashScreen extends Screen{
	start(){
		this.imgs = [
			new Sprite(SCREEN_IMAGE.SPLASH0, 10, 10, 193, 205, false),
			new Sprite(SCREEN_IMAGE.SPLASH1, 100, 10, 139, 201, false)
		];
		this.resetValues();
	}
	
	resetValues(){
		this.decreaseOpacity = false;
		this.index = 0;
		this.createSplash();
	}
	
	createSplash(){
		for (let i = 0; i < this.imgs.length; i++){
			this.imgs[i].opacity = 0.0;
			this.imgs[i].canDraw = true;
			this.center(this.imgs[i]);
		}	
	}
	
	update(){
		if (keyCode.enter in Ramu.lastKeysPressed){
			Machine.changeState(Machine.STATE.TITLE);
			return;
		}
		
		if (this.index >= this.imgs.length)
			return;
		
		this.imgs[this.index].opacity += !this.decreaseOpacity ? 0.005 : -0.005;
			
		if (this.imgs[this.index].opacity >= 1.0){
			this.imgs[this.index].opacity = 1.0;
			this.decreaseOpacity = true;
			return;
		}
		
		if (this.decreaseOpacity && this.imgs[this.index].opacity <= 0.0){
			this.imgs[this.index].opacity = 0.0;
			
			this.index++;
			
			this.decreaseOpacity = false;
			
			// Change screen
			if (this.index >= this.imgs.length) {
				console.log("TODO: delegate the change of state to the MachineState")
				Machine.changeState(Machine.STATE.TITLE);
			}
		}	
	}
	
	setActive(bool){
		super.setActive(bool);
		for (var i = 0; i < this.imgs.length; i++)
			this.imgs[i].setActive(bool);
		
		if (bool)
			this.resetValues();
	}
	
	destroy(){
		if (!this._start_was_called){
			console.warn("The update was not called yet,")
			return;
		}
		super.destroy();
		
		for (let i = 0; i < this.imgs.length; i++){
			this.imgs[i].destroy();

			if (this.imgs[i] != null)
				this.imgs[i] = null;
		}
	}
}
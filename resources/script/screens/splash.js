class SplashScreen extends Screen{
	start(){
		this.imgs = [
			new Sprite(RamuUtils.getImage("resources/sprite/logo_gladio.png"), 10, 10, 193, 205, false),
			new Sprite(RamuUtils.getImage("resources/sprite/logo_hermes.png"), 100, 10, 139, 201, false)
		];
		
		this.lessOpacity = false;
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
		if (this.index >= this.imgs.length)
			return;
		
		this.imgs[this.index].opacity += !this.lessOpacity ? 0.005 : -0.005;
			
		if (this.imgs[this.index].opacity >= 1.0){
			this.imgs[this.index].opacity = 1.0;
			this.lessOpacity = true;
			return;
		}
		
		if (this.lessOpacity && this.imgs[this.index].opacity <= 0.0){
			this.imgs[this.index].opacity = 0.0;
			
			this.index++;
			
			this.lessOpacity = false;
			
			// Change screen
			if (this.index >= this.imgs.length)
				Machine.changeState(Machine.STATE.TITLE);
		}	
	}
	
	destroy(){
		for (let i = 0; i < this.imgs.length; i++){
			this.imgs[i].destroy();
			if (this.imgs[i] != null)
				this.imgs[i] = null;
		}
		super.destroy();
	}
}
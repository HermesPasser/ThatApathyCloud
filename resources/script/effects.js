class DisappearSFX extends SpritesheetAnimation{
	constructor(x, y){
		super(BASIS.IMAGE, x, y, 50, 50);
		this.animationTime = 0.2;
		this.playInLoop = false;
		
		this.addFrame(new Rect(300, 200, 50, 50));
		this.addFrame(new Rect(350, 200, 50, 50));
		this.addFrame(new Rect(400, 200, 50, 50));
	}
	
	start(){
		super.start();
		SOUND.DISAPPEAR.play();
	}
	
	update(){
		super.update();
		if (this.animationIsOver)
			this.destroy();
	}
}
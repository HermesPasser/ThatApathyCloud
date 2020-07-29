
class EndScreen extends Screen{
	constructor(){
		super();
		SOUND.BGM.END_MUSIC.play();
		EndScreen.instance = this;
		
		this.setUniverse();
		this.credits = new IntroScreen(false);
		
		this.flash = new Flash(5);
		this.flash.onFadeInEnd = function(){
			EndScreen.instance.planet.canDraw = false;
		}
		this.flash.onFadeOutEnd = function(){
			EndScreen.instance.showCredits = true;
		}
		
		this.resetValues()		
	}
	
	setUniverse(){		
		this.space = new SpriteAnimation(0, 0, BASIS.SCREEN_WIDTH, BASIS.SCREEN_HEIGHT);
		this.space.addFrame([ 
			ENDING_IMAGES.SPACE0, ENDING_IMAGES.SPACE1
		]);

		this.planet = new Sprite(ENDING_IMAGES.PLANET, 1, 1, 465 /1.5, 465 /1.5);
	}
	
	resetValues(){
		this.startAnim = true;
		this.endAnim = false;
		this.showCredits = false;
		
		this.center(this.planet);
		this.timeToFinish = 5;
		this.currentTime = 0;
		
		this.planet.canDraw = true;
		this.credits.isOver = false;
		
		this.credits.x = 0;
	}
	
	update(){ // wait > explode > credits > game menu
		
		// init explosion
		if (this.currentTime >= this.timeToFinish && this.startAnim){
			this.flash.init();
			this.startAnim = false;
			
		} else this.currentTime += Ramu.time.delta;
		
		if (this.showCredits){
			if (!this.endAnim && !this.startAnim){				
				this.endAnim = true;
				this.planet.canDraw = false;
				this.credits.init();
			}
			
			if (this.credits.isOver){
				this.showCredits = false;
				SOUND.BGM.END_MUSIC.stop();
				Machine.changeState(Machine.STATE.TITLE);
			}
		}
	}
	
	setActive(bool){
		super.setActive(bool);
		this.space.setActive(bool);
		this.flash.setActive(bool);
		this.planet.setActive(bool);
		this.credits.setActive(bool);
		
		if (bool === true){
			this.resetValues();
			SOUND.BGM.END_MUSIC.setActive(bool);
			SOUND.BGM.END_MUSIC.play();
		} else SOUND.BGM.END_MUSIC.setActive(bool);
	}
	
	destroy(){
		if (!this._start_was_called){
			console.warn("The update was not called yet,")
			return;
		}
				
		super.destroy();
		this.space.destroy();
		this.planet.destroy();
		this.credits.destroy();
		this.flash.destroy();
	}
}

class Player extends CharacterBase{
	constructor(x, y){
		super(x, y, 36, 50);
			
		this.mainCol.tag = "player";
		
		// 		Disappear
		
		// Time to can become visible again
		this.timeToDisappear = 2;
		this.currentTimeToDisappear = this.timeToDisappear;
		
		// Time to become visible
		this.timeToBecomeVisible = 2;
		this.currentTimeToBecomeVisible = 0;
		
		this.isInvisible = false;
	}
	
	getEnemyTag(){
		return "enemy";
	}
	
	disappear(){		
		if (this.currentTimeToDisappear >= this.timeToDisappear){
			SOUND.DISAPPEAR.play();
			new SimpleParticle(PARTICLE_IMAGE.BLUE, new Rect(this.x, this.y, 1, 1), 2, 500);
			this.currentTimeToDisappear = 0;
			this.setCanDraw(false);
			this.isInvisible = true;
		}
	}
	
	setupAnimation(){
		let walkVel = 0.15;
		
		let upStay = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height);
		upStay.addFrame(new Rect(50, 300, this.width, this.height));
		
		let upWalk = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height);
		upWalk.addFrame(new Rect(100, 300, this.width, this.height));
		upWalk.addFrame(new Rect(50,  300, this.width, this.height));
		upWalk.addFrame(new Rect(150, 300, this.width, this.height));
		upWalk.animationTime = walkVel;

		let downStay = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height);
		downStay.addFrame(new Rect(50, 350, this.width, this.height));

		let downWalk = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height);
		downWalk.addFrame(new Rect(100, 350, this.width, this.height));
		downWalk.addFrame(new Rect(50,  350, this.width, this.height));
		downWalk.addFrame(new Rect(150, 350, this.width, this.height));
		downWalk.animationTime = walkVel;
		
		let leftStay = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height);
		leftStay.addFrame(new Rect(0, 300, this.width, this.height));
		
		let leftWalk = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height);
		leftWalk.addFrame(new Rect(0, 300, this.width, this.height));
		leftWalk.addFrame(new Rect(0, 350, this.width, this.height));
		leftWalk.animationTime = walkVel;

		this.addAnimation("upStay", upStay);
		this.addAnimation("upWalk", upWalk);
		this.addAnimation("downStay", downStay);
		this.addAnimation("downWalk", downWalk);
		this.addAnimation("leftStay", leftStay);
		this.addAnimation("leftWalk", leftWalk);
		
		this.setCurrentAnimation("downStay");
		this.currentDirection = DIRECTION.BOTTOM;
	}
	
	update(){
		this.machineState(false); // To set idle pose. If some arrow is pressed so will be override by the walking animation
		this.currentTimeToShot += Ramu.time.delta;
		this.currentTimeToDisappear += Ramu.time.delta;
		
		if (this.isInvisible){
			this.currentTimeToBecomeVisible += Ramu.time.delta;
			
			if (this.currentTimeToBecomeVisible >= this.timeToBecomeVisible){
				if (this.life > 0)
					this.setCanDraw(true);

				this.isInvisible = false
				this.currentTimeToBecomeVisible = 0;
			}
		}
		
		if (this.life <= 0)
			this.setCanDraw(false);
	}
	
	walkUp(){
		this.currentDirection = DIRECTION.TOP;
		this.isPassable();
		this.machineState(true);
		if (this.canPass)			
			this.addY(-(this.vel * Ramu.time.delta));
	}
	
	walkLeft(){
		this.currentDirection = DIRECTION.LEFT;
		this.isPassable();
		this.machineState(true);
		if (this.canPass) 
			this.addX(-(this.vel * Ramu.time.delta));
	}
	
	walkRight(){
		this.currentDirection = DIRECTION.RIGHT;
		this.isPassable();
		this.machineState(true);
		if (this.canPass) 
			this.addX(this.vel * Ramu.time.delta);
	}
	
	walkDown(){
		this.currentDirection = DIRECTION.BOTTOM;
		this.isPassable();
		this.machineState(true);
		if (this.canPass) 
			this.addY(this.vel * Ramu.time.delta);
	}
	
	getDamage(){
		return 100;
	}
	
	applyDamage(damage){
		// If is not invisible then apply the damage
		if (!this.isInvisible){
			new SimpleParticle(PARTICLE_IMAGE.BLOOD, new Rect(this.x, this.y, 1, 1), 3, 1000);
			super.applyDamage(damage);
		}
	}
	
	die(){
		// não esquecer de dar um jeito de destruir isso
		let txt = new Text("Game Over", 250, 250, 100);
		txt.fillStyle = "white";	

		
		// a segunda vez que instancio o player, ele não roda as animações
		// então no lugar de destruir o player e instancia-lo denovo, 
		// resetar os valores
		
		new SimpleParticle(PARTICLE_IMAGE.BLOOD, new Rect(this.x, this.y, 1, 1), 3, 1000);
		super.destroy();
		
	}
	
	resetValues(){
		this.currentTimeToShot 			= this.timeToShot;
		this.currentTimeToDisappear 	= this.timeToDisappear;
		this.currentTimeToBecomeVisible = 0;
		this.setCurrentAnimation("downStay");
		this.setCanDraw(true);
		this.life = 100;
		
		// reset position // valores provisorios
		// this.setX(200);
		// this.setY(200);
	}
}

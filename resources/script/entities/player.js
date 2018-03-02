class Player extends CharacterBase{
	constructor(x, y){
		super(x, y, 36, 50);
			
		this.mainCol.tag = "player";
				
		// Disappear - Time to can become visible again
		this.timeToDisappear = 2;
		this.currentTimeToDisappear = this.timeToDisappear;
		
		// Disappear - Time to become visible
		this.timeToBecomeVisible = 2;
		this.currentTimeToBecomeVisible = 0;
		
		// Particles
		this.disappearParticle = new SimpleParticle(PARTICLE_IMAGE.BLUE, new Rect(1, 1, 1, 1), 2, disappearParticleNumber);

		this.isInvisible = false;
	}
	
	getEnemyTag(){
		return "enemy";
	}
	
	disappear(){	
		if (this.currentTimeToDisappear >= this.timeToDisappear){
			RamuUtils.playSound(SOUND.DISAPPEAR);
			
			this.disappearParticle.setPosition(this.x + this.width/2, this.y + this.height/2);
			this.disappearParticle.init();
			
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
		if (this.life <= 0){
			this.setCanDraw(false);
			return;
		}
		
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
	
	createRaycast(){
		let ref = this;
		
		this.raycast = new Raycast();
		this.raycast.onCollision = function(){
			var tag = ref.getEnemyTag();
			var canAbort = true;
			
			for (let i = 0; i < this.collision.length; i++){
				if (ref.tag === 'player' && this.collision[i].tag === 'player')
					canAbort = false;	
				
				if (this.collision[i].tag === "wall" || this.collision[i].tag === tag){
					canAbort = true;
					ref.canPass = false;
				}
				else ref.canPass = true;
			}
			
			if (canAbort)
				this.abort();
		}
		
		this.raycast.onRaycastEnd = function(){
			ref.canPass = true;
		}
	}
	
	getDamage(){
		return 100;
	}
	
	applyDamage(damage){
		// If is not invisible then apply the damage
		if (this.life <= 0)
			return;
		
		// console.log(this.life + " " + this.life <= 0)
		if (!this.isInvisible){
			this.showBlood();
			super.applyDamage(damage);
		}
	}
	
	die(){
		if (this.life <= 0)
			return;
				
		RamuUtils.playSound(SOUND.CRY);
		let txt = new Text("Game Over", 250, 250, 100);
		txt.fillStyle = "white";	

		
		// a segunda vez que instancio o player, ele não roda as animações
		// então no lugar de destruir o player e instancia-lo denovo, 
		// resetar os valores
		
		
		// this.showBlood();
		// this.setCanDraw(false);
		//super.destroy();
		
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

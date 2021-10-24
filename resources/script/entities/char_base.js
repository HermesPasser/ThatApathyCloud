
class CharacterBase extends Entity{
	start(){
		super.start();
		this.setupAnimation();
		this.vel = 100;
		this.canPass = true;
		this.isEnemy = false;
		
		// Shot
		this.timeToShot = 0.5;
		this.currentTimeToShot = this.timeToShot;
		
		this.createRaycast();
		
		// To collide with enemies
		let ref = this;
		this.mainCol.applyDamage = function(damage){
			ref.applyDamage(damage);
		}
	}

	showBlood(){
		GameScreen.bloodParticle.setPosition(this.x + this.width/2, this.y + this.height/2);
		GameScreen.bloodParticle.init();
	}
	
	machineState(walking){
		let animation = "upStay";
		
		switch (this.currentDirection){
			case DIRECTION.TOP:
				animation = walking ? "downWalk" : "downStay"
				break;
			case DIRECTION.LEFT:
				animation = walking ? "leftWalk" : "leftStay"
				this.anim["leftStay"].flipHorizontally = false;
				this.anim["leftWalk"].flipHorizontally = false;
				break;
			case DIRECTION.RIGHT:
				animation = walking ? "leftWalk" : "leftStay"
				this.anim["leftStay"].flipHorizontally = true;
				this.anim["leftWalk"].flipHorizontally = true;
				break;
			case DIRECTION.BOTTOM:
				animation = walking ? "upWalk" : "upStay"
		}
		
		if (!this.isInvisible)
			this.setCurrentAnimation(animation);
	}
	
	isPassable(){
		let ox = this.x, oy = this.y,
			dx = 0, dy = 0, 
			vel = this.vel * 2;
			
		switch (this.currentDirection){
			case DIRECTION.TOP:
				ox += this.width/2;
				oy += this.height/2;
				dy -= vel; 
				break;
			case DIRECTION.LEFT:
				ox += this.width/2 - 20;
				oy += this.height/2 + 5;
				dx -= vel;
				break;
			case DIRECTION.RIGHT:
				ox += this.width/2 + 20;
				oy += this.height/2 + 5;
				dx += vel;
				break;
			case DIRECTION.BOTTOM:
				ox += this.width/2;
				oy += this.height;
				dy += vel;
		}
		this.raycast.init(ox, oy, dx, dy, 0.2);	
	}
	
	shot(){
		if (this.currentTimeToShot < this.timeToShot)
			return;
				
		let x = this.x, y = this.y;
		switch (this.currentDirection){
			case DIRECTION.TOP: x += 30; 
				break;
			case DIRECTION.LEFT: x -= 5; y += 20;
				break;
			case DIRECTION.RIGHT: x += 35; y += 20;
				break;
			case DIRECTION.BOTTOM: x += 5; y += 35;
		}

		new Bullet(x, y, true).init(x, y, this.currentDirection, this.getDamage(), this.getEnemyTag());
		
		this.currentTimeToShot = 0;	
	}
}

// não esquecer de sons de tiro e quando disaparecer

class Player extends Entity{
	constructor(x, y){
		super(x, y, 36, 50);
		this.vel = 100;
		this.canPass = true;
		
		// To collide with enemies
		this.mainCol.tag = "player";
				
		// 		Shot
		this.timeToShot = 0.5;
		this.currentTimeToShot = this.timeToShot;
		
		// 		Disappear
		
		// Time to can becobe visible again
		this.timeToDisappear = 2;
		this.currentTimeToDisappear = this.timeToDisappear;
		
		// Time to become visible
		this.timeToBecomeVisible = 2;
		this.currentTimeToBecomeVisible = 0;
		
		this.isInvisible = false;
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
		
		new Bullet(x, y, this.currentDirection);
		this.currentTimeToShot = 0;	
	}
	
	disappear(){		
		if (this.currentTimeToDisappear >= this.timeToDisappear){
			new DisappearSFX(this.x - 10 , this.y);
			this.currentTimeToDisappear = 0;
			this.setCanDraw(false);
			this.isInvisible = true;
		}
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
		
		this.raycast = new Raycast();
		
		this.raycast.onCollision = function(){
			for (let i = 0; i < this.collision.length; i++)			
				if (this.collision[i].tag === "wall"){
					GameScreen.player.canPass = false;
					this.destroy();
				}
				else
					GameScreen.player.canPass = true;
		}
		
		this.raycast.onRaycastEnd = function(){
			this.destroy();
		}
		
		this.raycast.init(ox, oy, dx, dy, 0.2);
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
	
	start(){
		super.start();
		
		this.setupAnimation();
	}
	
	update(){
		super.update();
		this.machineState(false); // To set idle pose. If some arrow is pressed so will be override by the walking animation
		this.currentTimeToShot += Ramu.time.delta;
		this.currentTimeToDisappear += Ramu.time.delta;
		
		if (this.isInvisible){
			this.currentTimeToBecomeVisible += Ramu.time.delta;
			
			if (this.currentTimeToBecomeVisible >= this.timeToBecomeVisible){
				this.setCanDraw(true);
				this.isInvisible = false
				this.currentTimeToBecomeVisible = 0;
			}
		}
	}
	
	applyDamage(damage){
		// If is not invisible then apply the damage
		if (!this.isInvisible){
			// damage animation here
			super.applyDamage(damage);
		}
	}
	
	die(){
		// a segunda vez que instancio o player, ele não roda as animações
		// então no lugar de destruir o player e instancia-lo denovo, 
		// resetar os valores

		// tocar animações e chamar a tela de game over aqui
		
	}
	
	resetValues(){
		this.currentTimeToShot 			= this.timeToShot;
		this.currentTimeToDisappear 	= this.timeToDisappear;
		this.currentTimeToBecomeVisible = 0;
		this.setCurrentAnimation("downStay");
		this.life = 100;
		
		// reset position // valores provisorios
		// this.setX(200);
		// this.setY(200);
	}
}

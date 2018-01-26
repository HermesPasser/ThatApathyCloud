class Enemy extends CharacterBase{
	constructor(x, y){
		super(x, y, 36, 50);
		
		this.mainCol.tag = "enemy";	
		
		// Shot
		this.timeToShot = 0.5;
		this.currentTimeToShot = this.timeToShot;	
		this.isEnemy = true;
	}
	
	getEnemyTag(){
		return "player";
	}
	
	setupAnimation(){
		let walkVel = 0.15;

		let upStay = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height);
		upStay.addFrame(new Rect(50 + 400, 300, this.width, this.height));
		
		let upWalk = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height);
		upWalk.addFrame(new Rect(100 + 400, 300, this.width, this.height));
		upWalk.addFrame(new Rect(50 + 400,  300, this.width, this.height));
		upWalk.addFrame(new Rect(150 + 400, 300, this.width, this.height));
		upWalk.animationTime = walkVel;

		let downStay = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height)
		downStay.addFrame(new Rect(50 + 400, 350, this.width, this.height));
		
		let downWalk = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height);
		downWalk.addFrame(new Rect(100 + 400, 350, this.width, this.height));
		downWalk.addFrame(new Rect(50 + 400,  350, this.width, this.height));
		downWalk.addFrame(new Rect(150 + 400, 350, this.width, this.height));
		downWalk.animationTime = walkVel;
		
		let leftStay = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height);
		leftStay.addFrame(new Rect(400, 300, this.width, this.height));
		
		let leftWalk = new SpritesheetAnimation(BASIS.IMAGE, 50, 50, this.width, this.height);
		leftWalk.addFrame(new Rect(400, 300, this.width, this.height));
		leftWalk.addFrame(new Rect(400, 350, this.width, this.height));
		leftWalk.animationTime = walkVel;

		this.addAnimation("upStay", upStay);
		this.addAnimation("upWalk", upWalk);
		this.addAnimation("downStay", downStay);
		this.addAnimation("downWalk", downWalk);
		this.addAnimation("leftStay", leftStay);
		this.addAnimation("leftWalk", leftWalk);
		
		this.setCurrentAnimation("downStay");
		this.currentDirection = DIRECTION.BOTTOM;
		this.setDir();
	}
	
	setDir(){
		// if (GameScreen.player == null)
			// return;
		
		let dirs = ["TOP", "LEFT", "RIGHT", "BOTTOM"];
		let dir = dirs[parseInt(Math.random() * dirs.length)];
		
		this.currentDirection = DIRECTION[dir];	
		

	}
	
	move(){
		this.isPassable();
		this.machineState(true);
		
		if (this.canPass){
			switch (this.currentDirection){
				case DIRECTION.TOP:
					this.addY(-(this.vel * Ramu.time.delta));
					break;
				case DIRECTION.LEFT:
					this.addX(-(this.vel * Ramu.time.delta));
					break;
				case DIRECTION.RIGHT:
					this.addX(this.vel * Ramu.time.delta);
					break;
				case DIRECTION.BOTTOM:
					this.addY(this.vel * Ramu.time.delta);
			}
		} else {
			this.setDir();
		}
	}
	
	update(){
		this.machineState(false); // To set idle pose. If some arrow is pressed so will be override by the walking animation		
		this.move();

		if (this.x < 0)
			this.setX(500)
		if (this.y < 0)
			this.setY(500)
		
		this.currentTimeToShot += Ramu.time.delta;
	}
	
	die(){
		this.setCanDraw(false);
		this.mainCol.destroy()
		this.destroy();
		delete this.mainCol;
	}
}

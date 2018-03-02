
class Enemy extends CharacterBase{
	static create(TiledXMLObject){
		let enemy = new Enemy(TiledXMLObject.x, TiledXMLObject.y);
		enemy.animDrawPriority = GameScreen.player.animDrawPriority;
		
		return enemy;
	}
	
	constructor(x, y){
		super(x, y, 36, 50);
		
		this.mainCol.tag = 'enemy';	
		
		// Shot
		this.timeToShot = 2;
		this.isEnemy = true;
	}
	
	getEnemyTag(){
		return 'player';
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
	}
	
	getDamage(){
		return 40;
	}
	
	move(){
		if (!this.canPass)
			return;
		
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
	}
	
	randomDirection(){
		this.move();
		
		if (this.canPass)
			return;
		
		let dirs = ["TOP", "LEFT", "RIGHT", "BOTTOM"];
		let dir = dirs[parseInt(Math.random() * dirs.length)];
		this.currentDirection = DIRECTION[dir];	
	}
	
	playerDirection(){		
		// Look at
		let x = Math.pow(GameScreen.player.x - this.x, 2),
			y = Math.pow(GameScreen.player.y - this.y, 2);
			
		if (x < y)
			if (this.y >= GameScreen.player.y)
				this.currentDirection = DIRECTION.TOP;
			else 
				this.currentDirection = DIRECTION.BOTTOM;
		else 
			if (this.x >= GameScreen.player.x)
				this.currentDirection = DIRECTION.LEFT;
			else 
				this.currentDirection = DIRECTION.RIGHT;
			
		this.move();
	}

	ia(){
		if (!GameScreen.player)
			return;
		
		let distance = RamuMath.distance(GameScreen.player, this);
			
		this.isPassable();	
		this.machineState(true);
		
		// Move
		if (!(distance > 50 && distance < 200) || GameScreen.player.isInvisible)
			this.randomDirection();
		else {
			this.playerDirection();
			
			// Shot
			this.shot();
		}
	}
	
	createRaycast(){
		let ref = this;
		
		this.raycast = new Raycast();
		this.raycast.onCollision = function(){
			var tag = ref.getEnemyTag();
			
			for (let i = 0; i < this.collision.length; i++){
				if (this.collision[i].tag === "wall" || this.collision[i].tag === tag){
					ref.canPass = false;
					break;
				} else ref.canPass = true;
			}
			
			this.abort();
		}
		
		this.raycast.onRaycastEnd = function(){
			ref.canPass = true;
		}
	}
	
	update(){
		this.machineState(false); // To set idle pose. If some arrow is pressed so will be override by the walking animation		

		this.ia();
		
		if (RamuUtils.isOutOfCanvas(this)){
			this.setX(400);
			this.setY(400);
		}
		
		this.currentTimeToShot += Ramu.time.delta;
	}
	
	die(){
		RamuUtils.playSound(SOUND.CRY);		
		this.showBlood();
		this.setCanDraw(false);
		this.mainCol.destroy()
		this.destroy();
		delete this.mainCol;
	}
}

class LeftTurret extends Enemy{
	static create(TiledXMLObject){
		let turret = new LeftTurret(TiledXMLObject.x, TiledXMLObject.y, TiledXMLObject.properties["turretID"]);
		turret.animDrawPriority = GameScreen.player.animDrawPriority;
		return turret;
	}
	
	constructor(x,y,id){
		super(x,y);
		this.turretID = parseInt(id);
	}
	
	start(){
		super.start();
		this.shootParticle = new SimpleParticle(PARTICLE_IMAGE.YELLOW, new Rect(1, 1, 1, 1), 3, shotParticleNumber);
		
		this.width = 50;
		this.height = 50;
		this.mainCol.width = 50;
		this.mainCol.x += 34;
		this.isTurret = true;
		this.setX(this.x);
		this.setY(this.y);
		this.setCanDraw(true);
	}
	
	applyDamage(damage){ }
	
	setupAnimation(){
		let normal = new SpritesheetAnimation(BASIS.IMAGE, 0, 200, 84, 50);
		normal.addFrame(new Rect(0, 200, 84, 50));
		
		let broken = new SpritesheetAnimation(BASIS.IMAGE, 0, 250, 84, 50);
		broken.addFrame(new Rect(0, 250, 84, 50));

		this.addAnimation("normal", normal);
		this.addAnimation("broken", broken);
		
		this.setCurrentAnimation("normal");
	}
	
	shot(){
		if (this.currentTimeToShot < this.timeToShot)
			return;
				
		let x = this.x, y = this.y + 22;
	
		new Bullet(x, y, DIRECTION.LEFT, this.getDamage(), this.getEnemyTag());
		this.currentTimeToShot = 0;	
		
		this.shootParticle.setPosition(this.x, this.y + this.height/2);
		this.shootParticle.init();
	}
	
	ia(){
		if (!GameScreen.player)
			return;
		
		let distance = RamuMath.distance(GameScreen.player, this);
				
		// Shot if the player is in a range of 4 floor tiles
		if (!(distance > 200 && distance < 800) && !GameScreen.player.isInvisible)
			this.shot();
	}
	
	update(){
		this.ia();
		this.currentTimeToShot += Ramu.time.delta;
	}
}

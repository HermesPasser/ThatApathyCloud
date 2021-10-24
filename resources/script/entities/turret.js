
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
		
		// Bullets
		this.currentBullets = 0;
		this.bullets = new Array(5).fill(new Bullet(0, 0, false));
		this.timeToShot = 1;

		// To set the body of turret in the position instead of barrel
		this.setX(this.x - 33);
		this.width = 50;
		this.height = 50;
		this.mainCol.width = 50;
		this.mainCol.x += 34;
		this.isTurret = true;
		this.broken = false;
	}
	
	applyDamage(damage){ }
	
	die() {
		this.setCurrentAnimation("broken");
		this.broken = true;
	}
	
	destroy(){
		this.shootParticle.destroy();
		this.shootParticle = null;
		
		for (var i = 0; i < this.bullets.length; i++)
			this.bullets[i].destroy();
		this.bullets = null;
		
		super.destroy();
	}
	
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
	
		this.bullets[this.currentBullets].init(x, y, DIRECTION.LEFT, this.getDamage(), this.getEnemyTag());
		this.currentBullets = (this.currentBullets + 1) % this.bullets.length;
		this.currentTimeToShot = 0;	
		
		this.shootParticle.setPosition(this.x, this.y + this.height/2);
		this.shootParticle.init();
	}
	
	ia(){
		if (!GameScreen.player)
			return;
		
		let distance = Ramu.Math.distance(GameScreen.player, this);
				
		// Shot if the player is in a range of 4 floor tiles
		if (!(distance > 200 && distance < 800) && !GameScreen.player.isInvisible && GameScreen.player.life > 0)
			this.shot();
	}
	
	update(){
		if (this.broken)
			return;
		
		this.ia();
		this.currentTimeToShot += Ramu.time.delta;
	}
}

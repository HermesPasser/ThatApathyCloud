
// broken.flipHorizontally = true;
class UpTurret extends LeftTurret{
	static create(TiledXMLObject){
		let turret = new UpTurret(TiledXMLObject.x, TiledXMLObject.y, TiledXMLObject.properties["turretID"]);
		turret.animDrawPriority = GameScreen.player.animDrawPriority;
		return turret;
	}
	
	start(){
		super.start();
		this.shootParticle = new SimpleParticle(PARTICLE_IMAGE.YELLOW, new Rect(1, 1, 1, 1), 3, shotParticleNumber);
		
		// To set the body of turret in the position instead of barrel
		this.setX(this.x + 33);
		this.setY(this.y - 34);
		
		this.width = 50;
		this.height = 50;
		this.mainCol.width = 50;
		this.mainCol.y += 34;
		this.isTurret = true;
		this.broken = false;
	}

	setupAnimation(){
		let normal = new SpritesheetAnimation(BASIS.IMAGE, 0, 200, 50, 84);
		normal.addFrame(new Rect(0, 100, 50, 84));
		
		let broken = new SpritesheetAnimation(BASIS.IMAGE, 0, 250, 50, 84);
		broken.addFrame(new Rect(50, 100, 50, 84));

		this.addAnimation("normal", normal);
		this.addAnimation("broken", broken);
		
		this.setCurrentAnimation("normal");
	}
	
	shot(){
		if (this.currentTimeToShot < this.timeToShot)
			return;
				
		let x = this.x + 22, y = this.y;
	
		this.bullets[this.currentBullets].init(x, y, DIRECTION.TOP, this.getDamage(), this.getEnemyTag());
		this.currentBullets = (this.currentBullets + 1) % this.bullets.length;
		this.currentTimeToShot = 0;	
		
		this.shootParticle.setPosition(x + 2, y);
		this.shootParticle.init();
	}
}

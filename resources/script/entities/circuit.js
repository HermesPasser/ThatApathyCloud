
class TurretCircuit extends Enemy{
	static create(TiledXMLObject){
		let circuit = new TurretCircuit(TiledXMLObject.x, TiledXMLObject.y, TiledXMLObject.properties["turretID"]);
		circuit.animDrawPriority = GameScreen.player.animDrawPriority;
		return circuit;
	}
	
	constructor(x,y,id){
		super(x + 9, y); // because in tiled im working with 50x50 not 41x39
		this.turretID = parseInt(id);
	}
	
	start(){
		super.start();
		this.shootParticle = new SimpleParticle(PARTICLE_IMAGE.YELLOW, new Rect(1, 1, 1, 1), 3, shotParticleNumber);
		
		this.width = 41;
		this.height = 39;
		this.life = 200;
	}
	
	applyDamage(damage){
		this.setCurrentAnimation("broken");
		super.applyDamage(damage);
	}
	
	die(){
		this.setCurrentAnimation("destroyed");

		for (let i = 0; i < GameScreen.world.mapObjs.length; i++){
			let turret = GameScreen.world.mapObjs[i];
			
			if (turret.isTurret && turret.turretID === this.turretID)
				turret.die();
		}
	}
	
	setupAnimation(){
		let normal = new SpritesheetAnimation(BASIS.IMAGE, 0, 200, this.width, this.height);
		normal.addFrame(new Rect(100, 200, this.width, this.height));
		
		let broken = new SpritesheetAnimation(BASIS.IMAGE, 0, 200, this.width, this.height);
		broken.addFrame(new Rect(100, 250, this.width, this.height));

		let destroyed = new SpritesheetAnimation(BASIS.IMAGE, 0, 200, this.width, this.height);
		destroyed.addFrame(new Rect(100, 150, this.width, this.height));

		this.addAnimation("normal", normal);
		this.addAnimation("broken", broken);
		this.addAnimation("destroyed", destroyed);
		
		this.setCurrentAnimation("normal");
	}
	
	update(){ }
}

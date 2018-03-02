
class TurretCircuit extends Enemy{
	static create(TiledXMLObject){
		let circuit = new TurretCircuit(TiledXMLObject.x, TiledXMLObject.y, TiledXMLObject.properties["turretID"]);
		circuit.animDrawPriority = LAYER.BELOW;
		return circuit;
	}
	
	constructor(x,y,id){
		super(x, y);
		this.turretID = parseInt(id);
	}
	
	start(){
		super.start();
		this.shootParticle = new SimpleParticle(PARTICLE_IMAGE.YELLOW, new Rect(1, 1, 1, 1), 3, shotParticleNumber);
		
		
		this.width = 50;
		this.height = 50;
		this.mainCol.width = 50;
		this.life = 200;
	}
	
	applyDamage(damage){
		if (this.currentID === "destroyed")
			return;
		
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
		let normal = new SpritesheetAnimation(BASIS.IMAGE, 0, 0, 50, 50);
		normal.addFrame(new Rect(100, 200, 50, 50));
		
		let broken = new SpritesheetAnimation(BASIS.IMAGE, 0, 0, 50, 50);
		broken.addFrame(new Rect(100, 250, 50, 50));

		let destroyed = new SpritesheetAnimation(BASIS.IMAGE, 0, 0, 50, 50);
		destroyed.addFrame(new Rect(100, 150, 50, 50));

		this.addAnimation("normal", normal);
		this.addAnimation("broken", broken);
		this.addAnimation("destroyed", destroyed);
		
		this.setCurrentAnimation("normal");
	}
	
	update(){ }
}

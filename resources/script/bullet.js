class Bullet extends GameObj{
	constructor(x, y, destroyOnCollision = true){		
		super(x,y);	
		this.size = 7;
		this.tag = "shot";
		this.destroyOnCollision = destroyOnCollision;

		this.coll = new SimpleRectCollisor(x, y, this.size, this.size);
				
		this.sprite = new Spritesheet(BASIS.IMAGE, new Rect (50, 0, this.size, this.size), x, y, this.size, this.size);
		this.sprite.drawPriority = LAYER.SAME;
		
		this.coll.tag = "shot";
		this.disable();
	}
	
	init(x, y, direction, damage, damageTag){
		this.x = x;
		this.coll.x = x;
		this.sprite.x = x;
		
		this.y = y;
		this.coll.y = y;
		this.sprite.y = y;
		
		this.coll.damageTag = damageTag;
		this.sprite.canDraw = true;

		this.coll.canCollide = true;
		
		this.damage = damage;
		this.direction = direction;
		
		this.setOnCollision();
		
		this.isOver = false;
		RamuUtils.playSound(SOUND.SHOT);		
	}
	
	disable(){
		this.sprite.canDraw = false;
		this.coll.canCollide = false;
		this.isOver = true;
	}
	
	hit() {
		if (this.destroyOnCollision)
			this.destroy();
		else 
			this.disable();
	}

	setOnCollision(){
		let ref = this;
		this.coll.onCollision = function(){			
			
			// Add damage
			for (var i = 0; i < this.collision.length; i++){
				if (this.collision[i].tag === this.damageTag){
					this.collision[i].applyDamage(ref.damage);
					
					ref.hit();
				} else if (this.collision[i].tag === "wall")				
					ref.hit();
			}
		}	
	}
	
	destroy(){
		this.sprite.destroy();
		this.coll.destroy();
		super.destroy();
	}
	
	update(){
		if (this.isOver)
			return;
				
		var force = 120 * Ramu.time.delta;
		var fx = 0, fy = 0;
		
		switch (this.direction){
			case DIRECTION.TOP:    fy = -force; break;
			case DIRECTION.LEFT:   fx = -force; break;
			case DIRECTION.RIGHT:  fx = force;  break;
			case DIRECTION.BOTTOM: fy = force;
		}
		
		// Move
		this.x += fx;
		this.y += fy;
		this.sprite.x += fx;
		this.sprite.y += fy;
		this.coll.x += fx;
		this.coll.y += fy; 

	
		// Destroy if is out of the canvas
		if (this.x < -this.size || this.x > Ramu.canvas.width ||
			this.y < -this.size || this.y > Ramu.canvas.height){
			this.hit();
		}
	}
}

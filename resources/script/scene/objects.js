class EndObject extends SimpleRectCollisor{
	static create(tiledXMLObject){
		return new EndObject(tiledXMLObject.x, 
							tiledXMLObject.y, 
							tiledXMLObject.width, 
							tiledXMLObject.height);
	}
	
	onCollision(){		
		for (let i = 0; i < this.collision.length; i++){
			if (this.collision[i].tag != 'player')
				continue;
			
			Machine.changeState(Machine.STATE.END);
			break;
		}
	}
}

// Transfer the player to another map
class TeleportObject extends SimpleRectCollisor{
	static create(tiledXMLObject){
		// 0 -> id, 1 -> positionX, 2 -> positiY
		let value = tiledXMLObject.properties['move'].split(','); 
		
		let rect = new Rect(parseInt(value[1]), parseInt(value[2]), 0, 0);
		return new TeleportObject(tiledXMLObject.x, 
									tiledXMLObject.y, 
									tiledXMLObject.width, 
									tiledXMLObject.height, 
									value[0], rect);
	}
	
	constructor(x, y, width, height, mapID, rectPosition){
		super(x, y, width, height);
		this.mapID = mapID;
		this.position = rectPosition;
		this.oldMessage = GameScreen.infodump.text;
	}
	
	onCollision(){
		this.messageShowed = false;
		
		for (let i = 0; i < this.collision.length; i++){
			if (this.collision[i].tag != 'player')
				continue;
			
			this.messageShowed = true;
			
			GameScreen.infodump.text = "'space' to open.";
			
			if (keyCode.space in Ramu.pressedKeys){
				GameScreen.infodump.text = this.oldMessage;
				GameScreen.world.refreshMap(World.maps[this.mapID]);
				GameScreen.player.setX(this.position.x);
				GameScreen.player.setY(this.position.y)	
				Ramu.pressedKeys = [];
				
				this.destroy();
			}
			break;
		}
	}
	
	update(){
		super.update();
		if (!this.messageShowed)
			GameScreen.infodump.text = this.oldMessage;
	}
}

class InfoDump extends SimpleRectCollisor{
	static create(tiledXMLObject){
		return new InfoDump(tiledXMLObject.x, 
							tiledXMLObject.y, 
							tiledXMLObject.width, 
							tiledXMLObject.height, 
							tiledXMLObject.properties['message'], 
							tiledXMLObject.properties['showOnce']);
	}
	
	constructor(x, y, width, height, message, showOnce){
		super(x, y, width, height);
		this.message = message;
		this.showOnce = JSON.parse(showOnce);
		this.messageShowed = false;
		this.oldMessage = GameScreen.infodump.text;
	}
	
	onCollision(){		
		for (let i = 0; i < this.collision.length; i++){
			if (this.collision[i].tag != 'player')
				continue;
			
			this.messageShowed = true;
			GameScreen.infodump.text = this.message;
			break;
		}
	}
	
	update(){
		super.update();
		
		for (let i = 0; i < this.collision.length; i++){
			if (this.collision[i].tag === 'player')
				continue;
			this.messageShowed = false;
			break;
		}
		
		if (this.messageShowed){
			GameScreen.infodump.text = this.oldMessage;
			if (this.showOnce)
				this.destroy();
		}
	}
}
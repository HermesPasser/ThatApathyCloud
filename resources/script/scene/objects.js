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

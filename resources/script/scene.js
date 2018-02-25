//-----------------------------------------------------|
// Name		Property								   |
//-----------------------------------------------------|
// Teleport	Move (int: map id, int: x pos, int: y pos) |
//-----------------------------------------------------|

const PASSABLE = 0;
const NON_PASSABLE = 2;

class Map{
	constructor(xmlPath){
		this.xml = loadXML(xmlPath);
		// 0 - Below / 1 - Same
		// 2 - Above / 3 - Restrictions (not draw)
		this.grids = this.xml.getElementsByTagName("data");
		this.objs = this.xml.getElementsByTagName("objectgroup");
	}
}

class TeleportObject extends SimpleRectCollisor{
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

class World extends GameObj{	
	start(){
		// List of maps
		World.maps = {
			"01": new Map("resources/tileset/testmap.xml"),
			"02": new Map("resources/tileset/testmap2.xml")
		};
		
		this.mapObjs = [];
		this.setGrid();
		this.refreshMap(World.maps["01"]);
	}
	
	// not tested yet
	destroy(){
		for (let l = 0; l < this.grid.length; l++){
			for (let i = 0; i < this.grid[l].length; i++){
				this.grid[l][i].destroy();
				delete this.grid[l][i];
			}
		}
		
		for (let i = 0; i < this.mapObjs.length; i++){
			this.mapObjs[i].destroy();
			delete this.mapObjs[i];
		}
		
		for (let i = 0; i < this.restrictions.length; i++){
			this.restrictions[i].destroy();
			delete this.restrictions[i];
		}
		
		super.destroy();
	}
	
	refreshMap(map){		
		for (let i = 0; i < this.mapObjs.length; i++)
			this.mapObjs[i].destroy();
				
		this.currentMap = map;
		this.spawnMap();
		this.mapObjs = [];
		this.spawnObjects();
	}
	
	/// Create the grid - will be called once in the init of this class
	setGrid(){		
		this.grid = [ [], [], [] ]; // lenght 3 bacause the 4rd layer data will not be draw
		this.restrictions = [];
		for (let l = 0; l < this.grid.length; l++){
			for (let i = 0, x = 0, y = 0; i < BASIS.TILE_COUNT; x += BASIS.TILE_SIZE, i++){
				if (x == Ramu.canvas.width)
					x = 0, y += BASIS.TILE_SIZE;

				this.grid[l][i] = new Spritesheet(BASIS.IMAGE, new Rect(0,0,0,0), x, y, BASIS.TILE_SIZE, BASIS.TILE_SIZE)
				this.grid[l][i].drawPriority = l;
				
				// Add all the collisors at the first loop
				if (l === 0){					
					this.restrictions[i] = new Collisor(x, y, BASIS.TILE_SIZE, BASIS.TILE_SIZE);
					this.restrictions[i].canCollide = false;
					this.restrictions[i].drawPriority = 6;
					this.restrictions[i].tag = "wall";
				}
			}
		}
		Drawable.sortPriority();
	}

	/// Add the tiles in the grid
	spawnMap(){		
		// For each layer
		for (let dataLayer = 0; dataLayer < this.grid.length; dataLayer++){
			let data = this.currentMap.grids[dataLayer].innerHTML.split(",");

			// For each tile in layer
			for (let i = 0; i < BASIS.TILE_COUNT; i++){ // (500 / 50) * (500 / 50)
				let id = (parseInt(data[i].replace(/\D/g,''))) - 1;
												
				// Get position of the tile using the ID
				var sheetX = (id % (BASIS.IMAGE_WIDTH / BASIS.TILE_SIZE)) * BASIS.TILE_SIZE;
				var sheetY = ~~(id / (BASIS.IMAGE_WIDTH / BASIS.TILE_SIZE)) * BASIS.TILE_SIZE;
								
				// Update grid image and position (0 = null).
				if (id !== PASSABLE){
					this.grid[dataLayer][i].setSheet(new Rect(sheetX, sheetY, BASIS.TILE_SIZE, BASIS.TILE_SIZE));
					this.grid[dataLayer][i].canDraw = true;
				}
				// Not draw
				else this.grid[dataLayer][i].canDraw = false;
			}
		}

		this.setRestrictions();
	}
	
	setRestrictions(){
		let data = this.currentMap.grids[3].innerHTML.split(",");

		// For each tile in layer
		for (let i = 0; i < BASIS.TILE_COUNT; i++){ // (500 / 50) * (500 / 50)
			let id = (parseInt(data[i].replace(/\D/g,''))) - 1;
						
			// Not passable ID
			if (id === NON_PASSABLE)
				this.restrictions[i].canCollide = true;
			else 
				this.restrictions[i].canCollide = false;
		}
	}
	
	spawnObjects(){
		for (let objLayer = 0; objLayer < this.currentMap.objs.length; objLayer++){
			let objs = this.currentMap.objs[objLayer].getElementsByTagName("object");
			
			for (let i = 0; i < objs.length; i++){
				let x 	   = parseInt(objs[i].getAttribute("x"));
				let y 	   = parseInt(objs[i].getAttribute("y"));
				let width  = parseInt(objs[i].getAttribute("width"));
				let height = parseInt(objs[i].getAttribute("height"));
				
				switch(objs[i].getAttribute("name")){
					case "teleport":
						let properties = objs[i].getElementsByTagName("properties")[0];
						let property = properties.getElementsByTagName("property")[0];
						let value = property.getAttribute("value").split(","); // 0 -> id, 1 -> positionX, 2 -> positiY
						let rect = new Rect(parseInt(value[1]), parseInt(value[2]), 0, 0);
						this.mapObjs.push(new TeleportObject(x, y, width, height, value[0], rect));
						break;
					default:
						continue;
				}
			}
		}
	}

	
}
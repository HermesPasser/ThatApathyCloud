// Represent a tiled map
class Map{
	constructor(xmlPath){
		this.xml = loadXML(xmlPath);
		
		// 0 - Below / 1 - Same
		// 2 - Above / 3 - Restrictions (not draw)
		this.grids = this.xml.getElementsByTagName("data");
		this.objs = this.xml.getElementsByTagName("objectgroup");
	}
}

// Represent a object of tiled map
class TiledXMLObject{
	constructor(objectNode){
		// because tiled align add x and y 50 px below
		this.x 		= parseInt(objectNode.getAttribute('x')) - BASIS.TILE_SIZE;
		this.y 		= parseInt(objectNode.getAttribute('y')) - BASIS.TILE_SIZE;
		this.width  = parseInt(objectNode.getAttribute('width'));
		this.height = parseInt(objectNode.getAttribute('height'));
		this.name 	= objectNode.getAttribute('name');
		
		this.properties = {};
		this.setProperties(objectNode);
	}
	
	setProperties(objectNode){
		let properties = objectNode.getElementsByTagName('property');
		
		for (let i = 0; i < properties.length; i++){
			let name = properties[i].getAttribute('name');
			let value = properties[i].getAttribute('value');
			this.properties[name] = value;
		}
	}
}
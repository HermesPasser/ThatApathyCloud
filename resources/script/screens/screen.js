class Screen extends GameObj{
		
	center(img){
		img.x = Ramu.canvas.width / 2 - img.width / 2;
		img.y = Ramu.canvas.height / 2 - img.height / 2;
	}
}
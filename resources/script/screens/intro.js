class IntroScreen extends Screen{
	start(){
		// alterar o txt
		this.text = "Depois de conquistar o espaço, os humanos se viram espalhados entre diversos planetas. Nosso protagonista é um terrorista enviado por um planeta para erradicar a uma espécie hibrida de seres humanos que vivem num planeta distante e que a pouco conquistaram \"direitos humanos\". Para isso, nosso personagem, entrará no planeta por um espaçoporto e plantará uma ogiva no mesmo para concretizar seu apático objetivo junto com sua vida.\nOs finais planejados são: ele planta a objetivo e compre seu vil objetivo não deixando mais nada do que aquela nuvem nuclerar trazida pela apatia e um onde ele arrepende-se e suisida-se."
		
		this.txt = new Text(this.text, 1, Ramu.canvas.height, 500);
		this.txt.fillStyle = "white";	
		// play the music here.
		
	}
	
	update(){
		if (this.txt.y < -100){
			// faz alguma coisa como mostrar uma arte
			
			Machine.changeState(Machine.STATE.GAME);
			return;
		}
		
		this.txt.y -= 50 * Ramu.time.delta;
	}
	
	destroy(){
		this.txt.destroy();
		delete this.txt;
		super.destroy();
	}
}

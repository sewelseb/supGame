//instanciation des variables
var socket = io.connect('http://localhost:3000');

//prototype
function playerProto(sprite, pseudo, perso, rectLife, fireBall)
	{

		
		this.sprite=sprite;
		this.rectLife=rectLife;
		this.fireBall=fireBall;
		this.fireBallMoving=false;
		this.live=100;
		this.tailleDeplacementLateral=10;
		this.pseudo=pseudo;
		this.moi=false; //bool
		this.etat="garde";
		this.perso=perso;
		this.canMove=true;
		this.canAttac=true;
		this.playerMooving=false;
		var that = this;
		if (this.pseudo==document.getElementById('pseudo').value)
		{
			this.moi=true;
		}
		this.direction="droite";
		if (this.perso=="seb2")
		{
			sprite.setAttribute("width", "90");
			this.direction="gauche";
		}
		this.idCombat="";

		this.setLife = function(life)
			{

				this.live=life;
				this.rectLife.setAttribute("width", this.live*4);
				if (this.live<30)
				{
					//alert('red');
					this.rectLife.style="fill:red;";
				}
				if(this.perso=="seb2")
				{
					this.rectLife.setAttribute("x", 614+(400-(this.live*4)));
				}
				if(this.moi)
				{
					this.emitUpdate();
				}
				if (this.live<=0) 
				{
					//joueur KO => l'autre a gagné
					this.sprite.setAttribute("y", 2000);
					if (this.moi) 
					{
						socket.emit("l autre joueur a gagne", this);
						//alert(document.getElementById('formDefaite').innerHTML);
						document.getElementById('formFinDePartie').innerHTML=document.getElementById('formDefaite').innerHTML;
					}
					
					

 				}
			}
		this.setDirection = function(dir)
			{
				this.direction=dir;
				this.setImage();
			};
		this.setEtat = function(etat)
			{
				this.etat=etat;
				this.setImage();
			};
		this.setImage = function()
			{
				var ancienneWidth=sprite.getAttribute("width")
				sprite.setAttribute("width", "90");
				
				sprite.setAttribute('xlink:href',"/images/"+this.perso+"/"+this.direction+"/"+this.etat+".png");
				this.fireBall.setAttribute('xlink:href',"/images/fireBall/"+this.direction+".png");
				if (sprite.getAttribute('xlink:href')=="/images/seb2/gauche/garde.png" || sprite.getAttribute('xlink:href')=="/images/seb2/droite/garde.png")
					{
						
						if (ancienneWidth==160 && this.direction=="gauche")
						{
							var pos=parseInt(sprite.getAttribute("x"))+50;

							sprite.setAttribute("x", pos);
						}
						sprite.setAttribute("width", "90");
					}
				if (sprite.getAttribute('xlink:href')=="/images/seb1/gauche/garde.png" || sprite.getAttribute('xlink:href')=="/images/seb1/droite/garde.png")
					{
						
						if (ancienneWidth==160 && this.direction=="gauche")
						{
							var pos=parseInt(sprite.getAttribute("x"))+50;

							sprite.setAttribute("x", pos);
						}
						sprite.setAttribute("width", "90");
					}
				//coup de poing
				else if (sprite.getAttribute('xlink:href')=="/images/seb2/gauche/coup_de_poing.png" ) 
					{

						sprite.setAttribute("x", sprite.getAttribute("x")-50);
						sprite.setAttribute("width", "160");
					}
				else if (sprite.getAttribute('xlink:href')=="/images/seb2/droite/coup_de_poing.png" ) 
					{
						
						
						sprite.setAttribute("width", "160");
					}
				else if (sprite.getAttribute('xlink:href')=="/images/seb1/gauche/coup_de_poing.png") 
					{
						sprite.setAttribute("x", sprite.getAttribute("x")-50);
						sprite.setAttribute("width", "160");
					}
				else if (sprite.getAttribute('xlink:href')=="/images/seb1/droite/coup_de_poing.png") 
					{
						sprite.setAttribute("x", sprite.getAttribute("x"));
						sprite.setAttribute("width", "160");
					}
				//coup de pied
				else if (sprite.getAttribute('xlink:href')=="/images/seb2/gauche/coup_de_pied.png" ) 
					{


						sprite.setAttribute("x", sprite.getAttribute("x")-50);
						sprite.setAttribute("width", "161");
					}
				else if (sprite.getAttribute('xlink:href')=="/images/seb2/droite/coup_de_pied.png" ) 
					{
						
						
						sprite.setAttribute("width", "160");
					}
				else if (sprite.getAttribute('xlink:href')=="/images/seb1/gauche/coup_de_pied.png") 
					{
						sprite.setAttribute("x", sprite.getAttribute("x")-50);
						sprite.setAttribute("width", "160");
					}
				else if (sprite.getAttribute('xlink:href')=="/images/seb1/droite/coup_de_pied.png") 
					{
						sprite.setAttribute("x", sprite.getAttribute("x"));
						sprite.setAttribute("width", "160");
					}
				//deplacement
				else if (sprite.getAttribute('xlink:href')=="/images/seb2/droite/deplacement2.png" ) 
					{
						
						
						sprite.setAttribute("width", "100");
					}
				else if (sprite.getAttribute('xlink:href')=="/images/seb2/gauche/deplacement2.png" ) 
					{
						
						
						sprite.setAttribute("width", "100");
					}

				//preparartion boule de feu
				else if (sprite.getAttribute('xlink:href')=="/images/seb2/gauche/preparation_boule_de_feu.png" ) 
					{


						sprite.setAttribute("x", sprite.getAttribute("x"));
						sprite.setAttribute("width", "160");
					}
				else if (sprite.getAttribute('xlink:href')=="/images/seb2/droite/preparation_boule_de_feu.png" ) 
					{
						
						
						sprite.setAttribute("width", "160");
					}
				//envoie boule de feu
				else if (sprite.getAttribute('xlink:href')=="/images/seb2/gauche/envoie_boule_de_feu.png" ) 
					{


						sprite.setAttribute("x", sprite.getAttribute("x")-50);
						sprite.setAttribute("width", "160");
					}
				else if (sprite.getAttribute('xlink:href')=="/images/seb2/droite/envoie_boule_de_feu.png" ) 
					{
						
						
						sprite.setAttribute("width", "160");
					}
				else if (sprite.getAttribute('xlink:href')=="/images/seb1/gauche/envoie_boule_de_feu.png") 
					{
						sprite.setAttribute("x", sprite.getAttribute("x")-50);
						sprite.setAttribute("width", "160");
					}
				else if (sprite.getAttribute('xlink:href')=="/images/seb1/droite/envoie_boule_de_feu.png") 
					{
						sprite.setAttribute("x", sprite.getAttribute("x"));
						sprite.setAttribute("width", "160");
					}


			};

		document.getElementsByTagName("rect").transition="width 1s, height 1s";
		this.changerImageDeplacement = function()
			{
				this.playerMooving=true;
				var changeFoot = setInterval( function()
					{
						
						//
						if (that.playerMooving)
							{
								

								if (that.etat !="saut" && that.etat!="deplacement1")
							  		{
							  			//alert("test1");
							  			that.setEtat("deplacement1");
							  		}
						  		else if (that.etat !="saut" && that.etat!="deplacement2")
							  		{
							  			//alert("test2");
							  			that.setEtat("deplacement2");
							  		}
								that.emitUpdate();
							}
						else 
							{
								clearInterval(changeFoot);
								that.setEtat("garde");
								that.emitUpdate();
								
								//alert ('fireBall stopped');
							}
					}, 500);
			}
		this.moveLeft = function(){
				
			  	//alert(sprite.getAttribute("x"));
			  	if (this.etat!="couch" && this.etat!="bloc" && this.etat!="coup_de_pied" && this.etat!="coup_de_poing" && this.etat!="preparation_boule_de_feu")
			  	{
			  		this.setDirection("gauche");
			  		
				  	if (parseInt(sprite.getAttribute("x"))-this.tailleDeplacementLateral>0)
				  		{
				  			sprite.setAttribute("x", parseInt(sprite.getAttribute("x"))-this.tailleDeplacementLateral);
				  		}
			  		else
				  		{
				  			sprite.setAttribute("x", 0);
				  		}
				  	this.emitUpdate();
			  	}
			  	
			  	return 1;
			  };
	  	this.moveRight = function(){
	  			if (this.etat!="couch" && this.etat!="bloc" && this.etat!="coup_de_pied" && this.etat!="coup_de_poing" && this.etat!="preparation_boule_de_feu")
			  	{

		  			this.setDirection("droite");
					
				  	//alert(sprite.getAttribute("x"));
				  	var xMax=1024-sprite.getAttribute("width");
				  	//alert(sprite.getAttribute("width"));
				  	
				  	//alert(parseInt(sprite.getAttribute("x"))+this.tailleDeplacementLateral);
				  	if (parseInt(sprite.getAttribute("x"))+this.tailleDeplacementLateral<xMax)
				  		{
				  			sprite.setAttribute("x", parseInt(sprite.getAttribute("x"))+this.tailleDeplacementLateral);
				  		}
			  		else
				  		{
				  			sprite.setAttribute("x", xMax);
				  		}
				  	this.emitUpdate();
			  	}
			  	return 1;
			  };
		this.sAbaisser = function(){
			if(sprite.getAttribute("y")>=376) //vérifie que le joueur est bien au sol
			{
				sprite.setAttribute("y", 476);
				sprite.setAttribute("height", 100);
				if (this.etat=="couch_bloc")
				{
					this.etat="couch_bloc";
				}
				else
				{
					this.setEtat("couch");
				}
				
				this.emitUpdate();
			}


		};
		this.seRelever = function()
			{
				sprite.setAttribute("y", 376);
				sprite.setAttribute("height", 200);
				this.setEtat("garde");
				this.emitUpdate();
			}
		this.emitUpdate = function()
			{
				//console.log("test emit");
				//alert(this.fireBall.getAttribute("x"));
				socket.emit("changement de l objet joueur", this, this.sprite.getAttribute("x"), this.sprite.getAttribute("y"), this.sprite.getAttribute("height"), this.direction, this.etat, this.live, this.fireBall.getAttribute("x"), this.fireBall.getAttribute("y"), this.fireBallMoving, this.idCombat);
				

			}
		this.copy = function(adversaire, x, y, height, direction, etat, live, fireBallX, fireBallY, fireBallMoving)
			{
				this.live=adversaire.live;
				this.sprite.setAttribute("x", x);
				this.sprite.setAttribute("y", y);
				this.sprite.setAttribute("height", height);
				this.setDirection(direction);
				this.setEtat(etat);
				this.setLife(live);
				//alert(fireBallX);
				this.fireBall.setAttribute("x", fireBallX);
				this.fireBall.setAttribute("y", fireBallY);
				this.fireBallMoving=fireBallMoving;
			}
		this.handPunsh = function()
			{
				
				if (this.etat!="coup_de_poing")
					{
						this.canAttac=false;
						this.setEtat("coup_de_poing");
						this.emitUpdate();
					}
				

			}
		this.stopHandPunsh = function()
			{

				this.setEtat("garde");
				this.emitUpdate();
				setTimeout(canAttacAgain, 500);

			}
		var canAttacAgain = function()
			{
				that.canAttac=true;
			}
		this.footPunsh = function()
			{
				if (this.etat!="coup_de_pied")
					{
						this.canAttac=false;
						this.setEtat("coup_de_pied");
						this.emitUpdate();
					}
			}
		this.stopFootPunsh = function()
			{
				
				this.setEtat("garde");
				this.emitUpdate();
				setTimeout(canAttacAgain, 500);
			}
		this.fireBallAttac = function()
			{
				this.canMove=false;
				this.setEtat("preparation_boule_de_feu");
				this.emitUpdate();
				that=this;
				setTimeout(fireBallSendAttac, 1000);
			}
		 var fireBallSendAttac = function()
			{
				that.setEtat("envoie_boule_de_feu");
				that.emitUpdate;
				that.movingFireBall();
				setTimeout(endFireBallAttac, 1000);
				
			}
		var endFireBallAttac = function()
			{
				that.setEtat("garde");
				that.emitUpdate;
				that.canMove=true;
				
			}
		this.movingFireBall = function()
			{
				//alert(this.fireBall.getAttribute('x'));
				var directionLancement=this.direction;
				if (this.direction=="gauche")
				{

					this.fireBall.setAttribute("x", parseInt(this.sprite.getAttribute("x"))-10);
				}
				else
				{
					//alert(this.sprite.getAttribute("width"));
					this.fireBall.setAttribute("x", parseInt(this.sprite.getAttribute("x"))+parseInt(this.sprite.getAttribute("width"))-20);
				}
				if (this.perso=="seb1")
				{
					this.fireBall.setAttribute("y", parseInt(this.sprite.getAttribute("y"))+35);
				}
				else
				{
					this.fireBall.setAttribute("y", parseInt(this.sprite.getAttribute("y"))+45);
				}
				this.emitUpdate();
				this.fireBallMoving=true;
				var MFB = setInterval( function()
					{
							if (directionLancement=="gauche")
							{
								that.fireBall.setAttribute("x", parseInt(that.fireBall.getAttribute("x"))-10);
							}
							else
							{
								that.fireBall.setAttribute("x", parseInt(that.fireBall.getAttribute("x"))+10);
							}
							that.emitUpdate();
							if (parseInt(that.fireBall.getAttribute("x"))>1050 || parseInt(that.fireBall.getAttribute("x"))<-50)
							{
								clearInterval(MFB);
								that.fireBallMoving=false;
								//alert ('fireBall stopped');
							}
					}, 50);
				

			}
		this.bloc = function()
			{
				if (this.etat=="couch" || this.etat=="couch_bloc")
				{
					this.setEtat("couch_bloc");
				}
				else
				{
					this.setEtat("bloc");
				}
				this.emitUpdate();
				
			}
		this.unBloc = function()
			{
				if (this.etat=="couch_bloc")
				{
					this.setEtat("couch");
				}
				else
				{
					this.setEtat("garde");
				}
				this.emitUpdate();
			}
		this.jump = function() {
			if(sprite.getAttribute("y")>=376) //vérifie que le joueur est bien au sol
			{
				var altitudeRepere = parseFloat(450);
				var vitesseRepere = parseFloat(1000);
				this.setEtat("saut");
				//TODO: coder une parabole avec te temps qui est dépendant de la distance
				var montee= setInterval(function(){

					sprite.setAttribute("y", parseFloat(parseInt(sprite.getAttribute("y"))-vitesse()));
					if (playerOneProto.moi) 
					{
						//console.log(playerOneProto);
						playerOneProto.emitUpdate();
					}
					else
					{
						//console.log(playerTwoProto);
						playerTwoProto.emitUpdate();
					}
					//console.log(sprite.getAttribute("y"));
					if (parseInt(sprite.getAttribute("y"))<=10)
					{
						console.log("montee finie: "+sprite.getAttribute("y"));
						clearInterval(montee, decende());
				
					}
				}, 1);

				function decende(){
					var decende = setInterval(function(){
						
							sprite.setAttribute("y", parseFloat(parseInt(sprite.getAttribute("y"))+vitesse()));
							if (playerOneProto.moi) 
							{
								//console.log(playerOneProto);
								playerOneProto.emitUpdate();
							}
							else
							{
								//console.log(playerTwoProto);
								playerTwoProto.emitUpdate();
							}
							//console.log(sprite.getAttribute("y"));
							if (parseInt(sprite.getAttribute("y"))>=376)
							{
								//console.log("montee finie: "+sprite.getAttribute("y"));
								clearInterval(decende, function(){
									this.setEtat("garde");
									this.emitUpdate();
										
									
								});
								console.log("test");
									sprite.setAttribute("y",376);
									if (playerOneProto.moi) 
									{
										//console.log(playerOneProto);
										playerOneProto.setEtat("garde");
										playerOneProto.emitUpdate();
									}
									else
									{
										//console.log(playerTwoProto);
										playerTwoProto.setEtat("garde");
										playerTwoProto.emitUpdate();
									}
									
									//console.log(this);
									
									
										
							}
						}, 1);
				}

				function vitesse()
				{
					var vitesse= parseFloat(parseFloat(vitesseRepere)/parseFloat((altitudeRepere-parseInt(sprite.getAttribute("y")))));

					if (vitesse<=0.5) 
						{
							return 0.5;
						}

					return vitesse;
				}



				
				
			}

		}
		this.jAiGagne = function()
			{
				console.log("setEtatGagne");
				this.setEtat("victoire1");
				this.setEtat = function (){};
				//alert(document.getElementById('formVictoire').innerHTML);
				document.getElementById('formFinDePartie').innerHTML=document.getElementById('formVictoire').innerHTML;
			}  

	}


var playerOneProto = new playerProto(playerOneSprite, document.getElementById("playerOne").value, "seb1", document.getElementById("seb1Life"), document.getElementById("fireBall1"));


var playerTwoProto = new playerProto(playerTwoSprite, document.getElementById("playerTwo").value, "seb2", document.getElementById("seb2Life"), document.getElementById("fireBall2"));



//playerOneProto.sprite.style("fill", "url('/images/seb1/garde_normal.png')");
// playerOneProto.sprite.setAttribute("fill", "url('/images/seb1/garde_normal.png')");
// playerOneProto.sprite.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", 
//                      "http://www.abcteach.com/free/c/circlergb.jpg");
playerOneProto.sprite.setAttribute("fill-opacity", "0.5");
//playerOneProto.sprite.setAttribute("fill", "url('/images/seb1/garde_normal.png')");

//playerOneProto.sprite.style.backgroundImage = "url('/images/seb1/garde_normal.png')";
//playerTwoProto.sprite.style.backgroundImage = "url('/images/seb2/position_normal.png')";


playerOneProto.idCombat=playerOneProto.pseudo+"/"+playerTwoProto.pseudo;
playerTwoProto.idCombat=playerOneProto.pseudo+"/"+playerTwoProto.pseudo;


//var monpseudo=

	
//var pseudo = document.getElementById("pseudo").value;




socket.on('annulation du combat', function(pseudoAnnulateur)
	{
		if (playerOne == pseudoAnnulateur || playerTwo == pseudoAnnulateur)
		{
			alert("Combat reffusé");
			window.location = "/home";
		}
	});
socket.on("bouleTouchee", function(idCombat){


		if (playerOneProto.idCombat==idCombat)
		{
			if (playerOneProto.moi)
			{
				playerOneProto.fireBall.setAttribute("y", -50);
			}
			else
			{
				playerTwoProto.fireBall.setAttribute("y", -50);
			}
		}
	});
socket.on("vous avez gagne", function(adversaire)
	{
		if (playerOneProto.moi) 
		{
			playerOneProto.jAiGagne();
		}
		else
		{
			playerTwoProto.jAiGagne();
		}
	});
socket.on("changement combatant adverse"+playerOneProto.idCombat, function(adversaire, x, y, height, direction, etat, live, fireBallX, fireBallY, fireBallMoving){
	//alert(fireBallMoving);
	if (playerOneProto.moi) 
		{
			
			playerTwoProto.copy(adversaire, x, y, height, direction, etat, live, fireBallX, fireBallY, fireBallMoving);
			//cas ou il y a un coup
			if (playerOneProto.etat!="bloc" && playerOneProto.etat!="couch_bloc")
			{
				if (etat=="coup_de_poing")
				{
					//calcule du pt de  contacte
					var ptDeContactY=parseFloat(playerTwoProto.sprite.getAttribute("y"))+20;
					var ptDeContactX=parseFloat(playerTwoProto.sprite.getAttribute("x"))+160;
					if (playerTwoProto.direction=="gauche") 
						{
							ptDeContactX=parseFloat(playerTwoProto.sprite.getAttribute("x"));
						}
					//calcule de la présence de l'adversaire dans la zone
					if (playerOneProto.sprite.getAttribute("x")<ptDeContactX && parseFloat(playerOneProto.sprite.getAttribute("x"))+parseFloat(playerOneProto.sprite.getAttribute("width"))>ptDeContactX && playerOneProto.sprite.getAttribute("y")<ptDeContactY && parseFloat(playerOneProto.sprite.getAttribute("y"))+parseFloat(playerOneProto.sprite.getAttribute("height"))>ptDeContactY)
					{
						//alert(playerOneProto.live);
						playerOneProto.setLife(playerOneProto.live-10);
						
					}
				}
				else if (etat=="coup_de_pied") 
				{

					//calcule du pt de  contacte
					var ptDeContactY=parseFloat(playerTwoProto.sprite.getAttribute("y"))+150;
					var ptDeContactX=parseFloat(playerTwoProto.sprite.getAttribute("x"))+160;
					if (playerTwoProto.direction=="gauche") 
						{
							ptDeContactX=parseFloat(playerTwoProto.sprite.getAttribute("x"));
						}
					//calcule de la présence de l'adversaire dans la zone
					if (playerOneProto.sprite.getAttribute("x")<ptDeContactX && parseFloat(playerOneProto.sprite.getAttribute("x"))+parseFloat(playerOneProto.sprite.getAttribute("width"))>ptDeContactX && playerOneProto.sprite.getAttribute("y")<ptDeContactY && parseFloat(playerOneProto.sprite.getAttribute("y"))+parseFloat(playerOneProto.sprite.getAttribute("height"))>ptDeContactY)
					{
						//alert(playerOneProto.live);
						playerOneProto.setLife(playerOneProto.live-10);
						
					}
				}
				if (fireBallMoving)
				{

					var ptDeContactY=parseFloat(fireBallY)+5;
					var ptDeContactX=parseFloat(fireBallX);
					
					//calcule de la présence de l'adversaire dans la zone
					if (playerOneProto.sprite.getAttribute("x")<ptDeContactX && parseFloat(playerOneProto.sprite.getAttribute("x"))+parseFloat(playerOneProto.sprite.getAttribute("width"))>ptDeContactX && playerOneProto.sprite.getAttribute("y")<ptDeContactY && parseFloat(playerOneProto.sprite.getAttribute("y"))+parseFloat(playerOneProto.sprite.getAttribute("height"))>ptDeContactY)
					{
						//alert(playerOneProto.live);
						//alert('test');
						playerOneProto.setLife(playerOneProto.live-10);
						socket.emit("bouleTouchee", playerOneProto.idCombat);
						
					}
				}
			}
			
			
		}
		else
		{
			
			playerOneProto.copy(adversaire, x, y, height, direction, etat, live, fireBallX, fireBallY, fireBallMoving);
			if (playerTwoProto.etat!="bloc" && playerTwoProto.etat!="couch_bloc")
			{
				//cas ou il y a un coup
				if (etat=="coup_de_poing" && playerTwoProto.etat!="bloc")
				{
					
					//calcule du pt de  contacte
					var ptDeContactY=parseFloat(playerOneProto.sprite.getAttribute("y"))+20;
					var ptDeContactX=parseFloat(playerOneProto.sprite.getAttribute("x"))+160;
					if (playerOneProto.direction=="gauche") 
						{
							ptDeContactX=parseFloat(playerOneProto.sprite.getAttribute("x"));
						}
					//calcule de la présence de l'adversaire dans la zone
					//alert(playerOneProto.live);
					if (playerTwoProto.sprite.getAttribute("x")<ptDeContactX && parseFloat(playerTwoProto.sprite.getAttribute("x"))+parseFloat(playerTwoProto.sprite.getAttribute("width"))>ptDeContactX && playerTwoProto.sprite.getAttribute("y")<ptDeContactY && parseFloat(playerTwoProto.sprite.getAttribute("y"))+parseFloat(playerTwoProto.sprite.getAttribute("height"))>ptDeContactY)
					{
						//alert(playerTwoProto.live);
						playerTwoProto.setLife(playerTwoProto.live-10);
						
					}
				}
				else if (etat=="coup_de_pied" && playerOneProto.etat!="bloc") 
				{

					//calcule du pt de  contacte
					var ptDeContactY=parseFloat(playerOneProto.sprite.getAttribute("y"))+150;
					var ptDeContactX=parseFloat(playerOneProto.sprite.getAttribute("x"))+160;
					if (playerOneProto.direction=="gauche") 
						{
							ptDeContactX=parseFloat(playerOneProto.sprite.getAttribute("x"));
						}
					//calcule de la présence de l'adversaire dans la zone
					//alert(playerOneProto.live);
					if (playerTwoProto.sprite.getAttribute("x")<ptDeContactX && parseFloat(playerTwoProto.sprite.getAttribute("x"))+parseFloat(playerTwoProto.sprite.getAttribute("width"))>ptDeContactX && playerTwoProto.sprite.getAttribute("y")<ptDeContactY && parseFloat(playerTwoProto.sprite.getAttribute("y"))+parseFloat(playerTwoProto.sprite.getAttribute("height"))>ptDeContactY)
					{
						//alert(playerTwoProto.live);
						playerTwoProto.setLife(playerTwoProto.live-10);

						
					}
				}

				if (fireBallMoving)
				{

					var ptDeContactY=parseFloat(fireBallY)+5;
					var ptDeContactX=parseFloat(fireBallX);
					
					//calcule de la présence de l'adversaire dans la zone
					if (playerTwoProto.sprite.getAttribute("x")<ptDeContactX && parseFloat(playerTwoProto.sprite.getAttribute("x"))+parseFloat(playerTwoProto.sprite.getAttribute("width"))>ptDeContactX && playerTwoProto.sprite.getAttribute("y")<ptDeContactY && parseFloat(playerTwoProto.sprite.getAttribute("y"))+parseFloat(playerTwoProto.sprite.getAttribute("height"))>ptDeContactY)
					{
						//alert(playerOneProto.live);
						//alert('test');
						playerTwoProto.setLife(playerTwoProto.live-10);
						socket.emit("bouleTouchee", playerOneProto.idCombat);
						
					}
				}
			}
			
			
		}
});

//initialisation du jeu
		

//commande
var fightZone = document.getElementById("fightZone");

document.onkeypress= function(e)
{
	if (( playerOneProto.canMove && playerOneProto.moi) || ( playerTwoProto.canMove && playerTwoProto.moi))
	{
		//fleche à gauche
		if (e.keyCode===37)
		{
			if (playerOneProto.moi) 
			{
				playerOneProto.moveLeft();

				if (!playerOneProto.playerMooving)
				{
					
					playerOneProto.changerImageDeplacement();
				}
				
			}
			else
			{
				playerTwoProto.moveLeft();
				if (!playerTwoProto.playerMooving)
				{
					
					playerTwoProto.changerImageDeplacement();
				}

			}

			

		}

		//fleche à droite
		if (e.keyCode===39)
		{
			if (playerOneProto.moi) 
			{
				playerOneProto.moveRight();
				if (!playerOneProto.playerMooving)
				{
					playerOneProto.changerImageDeplacement();
				}
			}
			else
			{
				playerTwoProto.moveRight();
				if (!playerTwoProto.playerMooving)
				{
					playerTwoProto.changerImageDeplacement();
				}
			}

		}

		//fleche du bas
		if (e.keyCode===40)
		{
			if (playerOneProto.moi) 
			{
				playerOneProto.sAbaisser();
			}
			else
			{
				playerTwoProto.sAbaisser();
			}
			
		}

		//fleche du haut
		if (e.keyCode===38)
		{
			if (playerOneProto.moi) 
			{
				playerOneProto.jump();
			}
			else
			{
				playerTwoProto.jump();
			}
			
		}

		//lettre a (coup de poing)
		if (e.charCode===97)
		{
			
			if (playerOneProto.moi && playerOneProto.canAttac) 
			{
				playerOneProto.handPunsh();
			}
			else if (playerTwoProto.canAttac)
			{
				playerTwoProto.handPunsh();
			}
		}
		//lettre z (coup de pied)
		if (e.charCode===122)
		{
			
			
			if (playerOneProto.moi && playerOneProto.canAttac) 
			{
				playerOneProto.footPunsh();
			}
			else if (playerTwoProto.canAttac)
			{
				playerTwoProto.footPunsh();
			}
		}
		//lettre e (boule de feu)
		if (e.charCode===101)
		{
			
			
			if (playerOneProto.moi && playerOneProto.canAttac) 
			{
				playerOneProto.fireBallAttac();
			}
			else if (playerTwoProto.canAttac)
			{
				playerTwoProto.fireBallAttac();
			}
		}
		//lettre r (bloc)
		if (e.charCode===114)
		{
			
			
			if (playerOneProto.moi) 
			{
				playerOneProto.bloc();
			}
			else
			{
				playerTwoProto.bloc();
			}
		}
	}
	
};

document.onkeyup= function(e)
{
	
	//fleche de gauche
	if (e.keyCode===37)
	{
		if (playerOneProto.moi) 
		{
			playerOneProto.playerMooving=false;
		}
		else
		{
			playerTwoProto.playerMooving=false;
		}
		
	}
	//fleche de droite
	if (e.keyCode===39)
	{
		if (playerOneProto.moi) 
		{
			playerOneProto.playerMooving=false;
		}
		else
		{
			playerTwoProto.playerMooving=false;
		}
		
	}
	//fleche du bas
	if (e.keyCode===40)
	{
		if (playerOneProto.moi) 
		{
			playerOneProto.seRelever();
		}
		else
		{
			playerTwoProto.seRelever();
		}
		
	}
	//lettre a
	if (e.keyCode===65)
	{
		
		if (playerOneProto.moi) 
		{
			playerOneProto.stopHandPunsh();
		}
		else
		{
			playerTwoProto.stopHandPunsh();
		}
	}

	//lettre z
	if (e.keyCode===90)
	{
		
		
		if (playerOneProto.moi) 
		{
			playerOneProto.stopFootPunsh();
		}
		else
		{
			playerTwoProto.stopFootPunsh();
		}
	}
	//lettre r
	if (e.keyCode===82)
	{
		
		
		if (playerOneProto.moi) 
		{
			playerOneProto.unBloc();
		}
		else
		{
			playerTwoProto.unBloc();
		}
	}


}

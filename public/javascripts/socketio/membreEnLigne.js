
// var demoApp = angular.module('supGame', [
// 				    // Dépendances du "module"
// 				    'listUsers'
// 				]);
// var listUsers = angular.module('listUsers',[]);
// listUsers.controller('listeCtrl', ['$scope',function ($scope) {
// 		var liste = $scope.users = [];

// 	}]);

var socket;
window.onload = function() 
	{
		socket = io.connect('http://localhost:3000');
		//var pseudo= getCookie(pseudo);
		var pseudo = document.getElementById("monpseudo").value;
		socket.emit('mon pseudo', pseudo);
		socket.on('message console', function(message) 
		  {
		      console.log('Le serveur a un message pour vous : ' + message);
		  });

		socket.on('liste user', function(message)
			{
				console.log(message);
				//listUsers.users=message;
				var codeHtml="";
				var urlDeCombat="/fightRoom/"+pseudo;
				for (i=0; i<message.length; i++)
				{
					if (message[i]!=pseudo)
					{
						var param="'"+urlDeCombat+"', '"+message[i]+"'";
						//alert (param);
						codeHtml+="<div class='row'>";
					
						codeHtml+="<div class='col-xs-12 col-md-8'>"+message[i]+"</div>";

						codeHtml+="<div class='col-xs-6 .col-md-4'><button class='btn btn-success' onclick='envoyerinvit(\""+message[i]+"\"";
						
						codeHtml+=");'>Fight</button></div>";
						codeHtml+="</div><hr>";
					}
					
				}
				document.getElementById('listeUsersOnLine').innerHTML=codeHtml;
				
				

			});

		socket.on('invitation de combat', function(urlDeCombat, pseudoDestinatere) 
		  {
		  		if (pseudoDestinatere==pseudo)
		  		{
		  			console.log('invitation à un combat de '+urlDeCombat);
			  		
			      	document.getElementById('afficherInvitationAUnCombat').innerHTML=document.getElementById('invitationAUnCombat').innerHTML;
			      	//alert(document.getElementsByClassName('accepterCombat')[0].innerHTML);
			      	document.getElementsByClassName('accepterCombat')[0].onclick= function(){
			  			window.location = urlDeCombat;
			  		};
			  		document.getElementsByClassName('reffuserCombat')[0].onclick= function(){
			  			document.getElementById('afficherInvitationAUnCombat').innerHTML="";
			  			socket.emit("annulation du combat", pseudo);
			  		};
		  		}
		  		
		  });

		socket.on('debut qwickFight', function(playerOne, playerTwo) 
		  {
		  		if(playerOne==pseudo || playerTwo==pseudo)
		  		{
		  			//alert('test');
		  			var adversaire=playerOne;
			  		var urlDeCombat = "/fightRoom/"+playerOne+"/"+playerTwo;
			  		if (playerOne==pseudo)
				  		 {
				  		 	adversaire=playerTwo;
				  		 }
			  		alert("Combat trouvé contre: "+ adversaire);
			  		window.location = urlDeCombat;

		  		}
		  		
		  		
		  });

		

		

		
	}


function envoyerinvit(pseudoDestinatere)
	{

		var pseudo = document.getElementById("monpseudo").value;
		var urlDeCombat = "/fightRoom/"+pseudo+"/"+pseudoDestinatere;
		socket.emit('invitation a un combat', urlDeCombat, pseudoDestinatere);
		window.location = urlDeCombat;
	}
function qwickFight()
	{
		var pseudo = document.getElementById("monpseudo").value;
		socket.emit('entrer dans la file du qwick fight', pseudo);
		console.log('inscription dans la liste de qwick fight');
		document.getElementById('emplacementQwickFight').innerHTML=document.getElementById('attenteQwickFight').innerHTML;
	}
function annulerQwickFight()
	{
		var pseudo = document.getElementById("monpseudo").value;
		socket.emit('annulation qwick fight', pseudo);
		console.log('annulation qwick fight');
		document.getElementById('emplacementQwickFight').innerHTML=document.getElementById('QwickMatchBack').innerHTML;
		QwickMatchBack
	}

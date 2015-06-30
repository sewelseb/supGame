var socket = io.connect('http://localhost:3000');
var playerOne;
var playerTwo;
var pseudo;
var chatId;

window.onload = function() 
	{
		playerOne = document.getElementById('playerOne').value;
		playerTwo =document.getElementById('playerTwo').value;
		pseudo =document.getElementById("pseudo").value;
		chatId=playerOne+playerTwo;
		//var pseudo= getCookie(pseudo);
		
		socket.emit('connection au chat', chatId, pseudo);
		socket.on('message console', function(message) 
		  {
		      console.log('Le serveur a un message pour vous : ' + message);
		  });




		

		
	}
socket.on("envoie message", function(texte, envoyeur, chatId)
		{
			//alert(texte);
			if (chatId==document.getElementById('playerOne').value+document.getElementById('playerTwo').value)
				{
					var codeHtml = disignMessage(texte, envoyeur);
					document.getElementById('zoneDeChat').innerHTML=document.getElementById('zoneDeChat').innerHTML+codeHtml;
				}
			
		});

function sendMessage()
	{
		var texte = document.getElementById('messageAEnvoyer').value;

		var envoyeur = document.getElementById("pseudo").value;
		var codeHtml = disignMessage(texte, envoyeur);
		document.getElementById('zoneDeChat').innerHTML=document.getElementById('zoneDeChat').innerHTML+codeHtml;

		socket.emit("envoie message", texte, envoyeur, document.getElementById('playerOne').value+document.getElementById('playerTwo').value);

	}
function disignMessage(texte, envoyeur)
	{
		var code="";
		if (envoyeur==pseudo)
		{
			code+='<div class="chat-box-right">';
		}
		else
		{
			code+='<div class="chat-box-left">';
		}
		code+=texte;
		code+="</div>";
		code+='<div class="chat-box-name-left">';
		code+='-  '+envoyeur;
	    code+='</div><hr class="hr-clas" />';
	    

		return code;
	}
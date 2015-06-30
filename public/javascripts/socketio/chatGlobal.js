//chatGlobal.js

var socket = io.connect('http://localhost:3000');

//prototype du chat global (sal de lobby)
function chatGlobal(monPseudo, socket)
	{
		this.monPseudo = monPseudo;
		this.socket = socket;

		this.emitMessage = function()
			{
				var message=document.getElementById('messageAEnvoyer').value;
				document.getElementById('messageAEnvoyer').value="";
				if (message!="") 
				{
					document.getElementById('zoneMessagesGlobaux').innerHTML+=this.disignMessage(message, this.monPseudo);
					//alert(this.monPseudo);
					this.socket.emit("envoie message chat global",message, this.monPseudo);
				}
				
			};
		this.getMessage = function (message, pseudo)
			{
				var message=message;
				document.getElementById('zoneMessagesGlobaux').innerHTML+=this.disignMessage(message, pseudo);
			};
		this.disignMessage = function(texte, envoyeur)
			{
				var code="";
				if (envoyeur==this.monPseudo)
				{
					code+='<div class="chat-box-right">';
					code+=texte;
					code+="</div>";
					code+='<div class="chat-box-name-right" >';
				}
				else
				{
					code+='<div class="chat-box-left">';
					code+=texte;
					code+="</div>";
					code+='<div class="chat-box-name-left" >';
				}
				
				code+='-  '+envoyeur;
			    code+='</div><hr class="hr-clas" />';
			    

				return code;
			}
	}

var chat = new chatGlobal(document.getElementById("monpseudo").value, socket);

function emitMessage()
	{
		chat.emitMessage();
	}
function getMessage(message, pseudo)
	{
		chat.getMessage(message, pseudo);
	}
socket.on("envoie message chat global", function(message, pseudo){

		getMessage(message, pseudo);

	});
document.onkeypress= function(e)
{
	//enter
	if (e.keyCode===13)
		{
			chat.emitMessage();
		}
}
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var swig = require('swig');
var cookieParser = require('cookie-parser');
var cookie = require('cookie');




var userDB = require('./models/userDB');




var app = express();
app.use(cookieParser());
app.use(function(req,res,next){
     req.db = db;
     next();
 });


//socketIO code
var http = require('http').Server(app);
var io = require('socket.io')(http);

var listeUsers = [];
var listeUserSocket = [];
var listeSalDeChat = [];
var infoListeSalDeChat = [];
var listeUsersQwickFight = [];
io.sockets.on('connection', function (socket) {
  socket.emit('message console', 'Vous êtes bien connecté !');
  
  
  //console.log("cookie "+client.request.headers.cookie.pseudo);

  //socket.broadcast.emit('liste user', listeUsers);

  socket.on('mon pseudo', function(pseudo)
    {
      
      listeUsers.push(pseudo);
      listeUserSocket.push(socket);
      console.log(pseudo+' conected to the room');
      socket.broadcast.emit('liste user', listeUsers);
      socket.emit('liste user', listeUsers);
      console.log (listeUsers);
    });
  socket.on('get liste', function(pseudo)
    {
      
      socket.emit('liste user', listeUsers);
      console.log (listeUsers);
    });
  socket.on('invitation a un combat', function(urlDeCombat, pseudoDestinatere)
    {
      socket.broadcast.emit('invitation de combat', urlDeCombat, pseudoDestinatere);
      console.log('invitation au combat '+urlDeCombat+" "+pseudoDestinatere);
    });
  
  socket.on("annulation du combat", function(pseudoAnnulateur)
    {
      socket.broadcast.emit('annulation du combat', pseudoAnnulateur);
      
    });
  socket.on('entrer dans la file du qwick fight', function(pseudo)
    {
        //console.log(listeUsersQwickFight[0]);
        if (listeUsersQwickFight.indexOf(pseudo)==-1)
        {
          if (listeUsersQwickFight[0] && listeUsersQwickFight[0])
          {
            //cas ou il y a déja quelcun dans la liste
            var pseudo2 = listeUsersQwickFight[0];
            socket.broadcast.emit("debut qwickFight", pseudo, listeUsersQwickFight[0]);
            socket.emit("debut qwickFight", pseudo, listeUsersQwickFight[0]);
            delete listeUsersQwickFight[0];
            var newlisteUsersQwickFight = [];
            for (n=0; n<listeUsersQwickFight.length;  n++)
              {
                if (listeUsersQwickFight[n])
                {
                  newlisteUsersQwickFight.push(listeUsersQwickFight[n]);
                  
                }
              }
              listeUsersQwickFight = newlisteUsersQwickFight;
              console.log("qwick fight: "+pseudo+" "+pseudo2);
              console.log("liste qwick fight: "+listeUsersQwickFight);

          }
          else
          {
            listeUsersQwickFight[listeUsersQwickFight.length]=pseudo;
            console.log("liste qwick fight: "+listeUsersQwickFight.indexOf(pseudo)+listeUsersQwickFight);
          }
        }
          
        

    });
  socket.on("changement de l objet joueur", function(objetPlayer, x, y, height, direction, etat, live, fireBallX, fireBallY, fireBallMoving, idCombat){
      //console.log(objetPlayer);
      socket.broadcast.emit("changement combatant adverse"+idCombat, objetPlayer, x, y, height, direction, etat, live, fireBallX, fireBallY, fireBallMoving);

    });
  socket.on("bouleTouchee", function(idCombat){
      
      socket.broadcast.emit("bouleTouchee", idCombat);

    });
  socket.on("l autre joueur a gagne", function(objetPlayer){
      
      socket.broadcast.emit("vous avez gagne", objetPlayer);

    });
 


  socket.on("envoie message chat global", function(message, pseudo)
    {
      //console.log(pseudo);
      socket.broadcast.emit("envoie message chat global", message, pseudo);
    });
  socket.on('connection au chat', function(chatId, pseudo)
    {
      
      if (infoListeSalDeChat[chatId]) //cas ou le salon de chat existe déja
      {
        infoListeSalDeChat[chatId]['playerTwoConnected']=pseudo;

      }
      else //cas ou le salon de chat n'existe pas encore =>creation du salon de chat
      {
        infoListeSalDeChat[chatId]=[];
        infoListeSalDeChat[chatId]['playerOneConnected']=pseudo;
      }
      console.log(infoListeSalDeChat);

      //TODO: mettre le code suivant (deconexion de qwick fight) dans l'initialisation de combat quand je l'aurai créé
       var i = listeUsersQwickFight.indexOf(pseudo);
        if (i!=-1)
        {
          delete listeUsersQwickFight[i];
          var newlisteUsersQwickFight = [];
          for (n=0; n<listeUsersQwickFight.length;  n++)
            {
              if (listeUsersQwickFight[n])
              {
                newlisteUsersQwickFight.push(listeUsersQwickFight[n]);
                
              }
            }
          listeUsersQwickFight = newlisteUsersQwickFight;
        }
        //fin du code à bouger
    });
  socket.on("envoie message", function(texte, envoyeur, chatId)
    {
      socket.broadcast.emit("envoie message", texte, envoyeur, chatId);
      console.log("envoie message de la conversation "+chatId);
      
    });
  socket.on("annulation qwick fight", function (pseudo){
        var i = listeUsersQwickFight.indexOf(pseudo);
        if (i!=-1)
        {
          delete listeUsersQwickFight[i];
          var newlisteUsersQwickFight = [];
          for (n=0; n<listeUsersQwickFight.length;  n++)
            {
              if (listeUsersQwickFight[n])
              {
                newlisteUsersQwickFight.push(listeUsersQwickFight[n]);
                
              }
            }
          listeUsersQwickFight = newlisteUsersQwickFight;
        }
        console.log("qwick fight room:"+listeUsersQwickFight);
   });

    
  socket.on('disconnect', function() {
      

      var i = listeUserSocket.indexOf(socket);
      delete listeUserSocket[i];
      var pseudo=listeUsers[i];
      delete listeUsers[i];
      
      var newlisteUsers = [];
      var newlisteUserSocket = [];
      for (n=0; n<listeUsers.length;  n++)
        {
          if (listeUsers[n])
          {
            newlisteUsers.push(listeUsers[n]);
            newlisteUserSocket.push(listeUserSocket[n]);
          }
        }
      listeUsers = newlisteUsers;
      listeUserSocket = newlisteUserSocket;
      socket.broadcast.emit('liste user', listeUsers);
      console.log (listeUsers);


      var i = listeUsersQwickFight.indexOf(pseudo);
      if (i!=-1)
      {
        delete listeUsersQwickFight[i];
        var newlisteUsersQwickFight = [];
        for (n=0; n<listeUsersQwickFight.length;  n++)
          {
            if (listeUsersQwickFight[n])
            {
              newlisteUsersQwickFight.push(listeUsersQwickFight[n]);
              
            }
          }
        listeUsersQwickFight = newlisteUsersQwickFight;
      }
      
        
   });
});



//mongoose.connect('localhost', 'sup_game');

var db = mongoose.connection;
db.on('error', function(){
    console.log('connection error')
  });
db.once('open', function () {
   // Do what you wanna do
   console.log('db open');
 });


//var app = express();

// view engine setup
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

app.get('/', function (req, res) {
  res.render('index', {title: 'Index'});
});


var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var home = require('./routes/home');
var fightRoom = require ('./routes/fightRoom');
var resultat = require ('./routes/resultat');
var ladder = require ('./routes/ladder');
var myProfile = require ('./routes/myProfile');
var changePassword = require ('./routes/changePassword');
//var listeUserOnLine =require('./routes/listeUserOnLine');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/register', register);
app.use('/home', home);
app.use('/fightRoom', fightRoom);
app.use('/resultat', resultat);
app.use('/ladder', ladder);
app.use('/myProfile', myProfile);
app.use('/changePassword', changePassword);
//app.use('/listeUserOnLine', listeUserOnLine);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


//portabilité sur d'autres systemes comme IBM blueMIX
var env;
var host;
var port=3000; //si ce n'est pas défini par le serveur, le port 3000 est utilisé
if (process.env.hasOwnProperty("VCAP_SERVICES")) {
  // Running on Bluemix. Parse out the port and host that we've been assigned.
   env = JSON.parse(process.env.VCAP_SERVICES);
   host = process.env.VCAP_APP_HOST;
   port = process.env.VCAP_APP_PORT;


  // Also parse out Cloudant settings.
  //cloudant = env['cloudantNoSQLDB'][0].credentials;
}


var server = app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
io.listen(server);


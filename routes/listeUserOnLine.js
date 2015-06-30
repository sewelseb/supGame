var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var cookie = require('cookie');



var User = mongoose.model( 'User' );

/* GET listeUserOnLine page. */
router.get('/', function(req, res, next) {

    	io.sockets.on('connection', function (socket) {

        console.log('Un client est connecté à la liste de client en ligne');
        socket.emit('news', { hello: 'world' });
        socket.on('connection change', function (data) {
          console.log(data);
        });

    });

  
});

module.exports = router;
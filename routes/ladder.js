var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var cookie = require('cookie');


var User = mongoose.model( 'User' );

/* GET home page. */
router.get('/', function(req, res, next) {

	//console.log(req.cookies.pseudo);
	var cPseudo = req.cookies.pseudo;
	var cKey = req.cookies.key;
	console.log(req.cookies.pseudo);

  	var users = User.find({}).
    sort( {tauxDeGain:-1} ).
    exec( function ( err, users ){
      //if( err ) return next( err );

      //console.log(users);
      res.render('ladder', { title: 'FightJS Best of', users: users, pseudo: req.cookies.pseudo });
      
    });

  
});

module.exports = router;
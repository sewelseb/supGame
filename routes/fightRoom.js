var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var cookie = require('cookie');

var User = mongoose.model( 'User' );

/* GET users fightRoom. */
router.get('/:playerOne/:playerTwo', function(req, res, next) {

	//verification que le joueur est bien attendu dans la salle de combat:
	if (req.cookies.pseudo!=req.params.playerOne && req.cookies.pseudo!=req.params.playerTwo)
	{
		res.redirect('/home');

	}
	else
	{
		var cPseudo = req.cookies.pseudo;
		var cKey = req.cookies.key;
		console.log(req.cookies.pseudo);

	  	User.findOne({pseudo: req.cookies.pseudo, key: req.cookies.key}).
	    sort( '-updated_at' ).
	    exec( function ( err, user ){
	      //if( err ) return next( err );

	      if ( user ) 
	      	{ 
	      		var date=new Date();
	      		
	      		user.dateDerniereConection= date.getTime();
	      		user.save();
	      		//res.render('home', { title: 'FightJS', pseudo: cPseudo });
	      		res.render('fightRoom', { title: 'FightJS',
	      							 pseudo: cPseudo, 
	      							 playerOne: req.params.playerOne, 
	      							 playerTwo: req.params.playerTwo });
	      	}
	      else 
		      {
		        res.redirect('/');
		      }
	    });
	}



	
  
});

module.exports = router;
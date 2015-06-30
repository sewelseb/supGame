var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var cookie = require('cookie');


var User = mongoose.model( 'User' );

/* GET home page. */
router.get('/:resultat', function(req, res, next) {

    var cPseudo = req.cookies.pseudo;

  	User.findOne({pseudo: req.cookies.pseudo}).
    sort( '-updated_at' ).
    exec( function ( err, user ){
      //if( err ) return next( err );

      if ( user ) 
      	{ 
      		
      		if(req.params.resultat=="victoire")
          {
            user.nombreCombatGagne=user.nombreCombatGagne+1;
          }
      		else if(req.params.resultat=="defaite")
          {
            user.nombreCombatPerdu=user.nombreCombatPerdu+1;
          }
          user.tauxDeGain=user.nombreCombatGagne/(user.nombreCombatGagne+user.nombreCombatPerdu);
      		user.save();
      		res.redirect('/home');
      	}
      else 
	      {
	        res.redirect('/');
	      }
    });
  
});

module.exports = router;
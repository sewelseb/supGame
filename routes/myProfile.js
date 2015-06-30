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

  	User.findOne({pseudo: req.cookies.pseudo, key: req.cookies.key}).
    sort( '-updated_at' ).
    exec( function ( err, user ){
      //if( err ) return next( err );

      if ( user ) 
      	{ 
      		var date=new Date();
      		
      		user.dateDerniereConection= date.getTime();
      		user.save();
      		res.render('myProfile', { title: 'FightJS', pseudo: cPseudo });
      	}
      else 
	      {
	        res.redirect('/');
	      }
    });
  
});

module.exports = router;
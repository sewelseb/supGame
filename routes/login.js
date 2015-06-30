var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var cookie = require('cookie');


var User = mongoose.model( 'User' );

/* POST login listing. */
router.post('/', function(req, res, next) {
	//console.log('test');
  
  var crypto = require('crypto');
  var pass = crypto.createHash('sha256').update(req.body.password).digest('base64');
  
  User.findOne({pseudo: req.body.pseudo, password: pass}).
    sort( '-updated_at' ).
    exec( function ( err, user ){
      //if( err ) return next( err );

      if ( user ) { 
      	console.log("login de "+user.pseudo);

      	var key = Math.random() * 1000;
      	console.log(key);
	  	var cookies=cookie.serialize('key', key);
	  	res.cookie('key',key, { maxAge: 9000000, httpOnly: true });
      res.cookie('pseudo',req.body.pseudo, { maxAge: 9000000, httpOnly: true });

	  	user.key=key;
	  	user.save();

        // req.session.userId = user._id;
        // req.session.type = "manager";
        // if(user.isAdmin) req.session.userAdmin = 1;
        // res.redirect('/dashboard');
        res.redirect('home?note=loginReussie');
      }
      else {
        res.redirect('/');
      }
    });
  
  //res.send('login');

});

module.exports = router;
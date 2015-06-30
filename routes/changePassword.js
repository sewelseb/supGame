var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var cookie = require('cookie');


var User = mongoose.model( 'User' );

/* POST login listing. */
router.post('/', function(req, res, next) {
	//console.log('test');
  
  var crypto = require('crypto');
  var pass = crypto.createHash('sha256').update(req.body.oldPassword).digest('base64');
  var cPseudo = req.cookies.pseudo;
  
  User.findOne({pseudo: cPseudo, password: pass}).
    sort( '-updated_at' ).
    exec( function ( err, user ){
      //if( err ) return next( err );

      if ( user ) { 
      	
          var  newPass=crypto.createHash('sha256').update(req.body.newPassword).digest('base64');
    	  	

          user.password=newPass;
    	  	user.save();

          // req.session.userId = user._id;
          // req.session.type = "manager";
          // if(user.isAdmin) req.session.userAdmin = 1;
          // res.redirect('/dashboard');
          res.redirect('myProfile?note=passwordChanged');
        }
        else {
          res.redirect('myProfile?note=passwordNotChanged');
        }
      });
  
  //res.send('login');

});

module.exports = router;
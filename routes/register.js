var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var cookie = require('cookie');

//var userDB = require('./models/userDB');
var User = mongoose.model( 'User' );

//var Schema = mongoose.Schema;


/* POST register listing. */
router.post('/', function(req, res, next) {
	//console.log('test');
 

	//module.exports = mongoose.model('User', UserSchema);

	var crypto = require('crypto');

  	var password = crypto.createHash('sha256').update(req.body.password).digest('base64');
  	var key = Math.random() * 1000;
  	var cookies=cookie.serialize('key', key);
  	res.cookie('key',key, { maxAge: 900000, httpOnly: true });
  	res.cookie('pseudo',req.body.pseudo, { maxAge: 900000, httpOnly: true });
		 
	//console.log(password);

	// response.writeHead(200, 
	// 	{
	// 	    'Set-Cookie': cookies,
	// 	    'Content-Type': 'text/plain'
 //  		});
	


	console.log(req.body.pseudo);
	var user = new User({
		pseudo: req.body.pseudo,
		password: password,
		key: key,
		nom: req.body.lastname,
		prenom: req.body.firstname,
		nombreCombatGagne: 0,
		nombreCombatPerdu: 0,
		dateDerniereConection: 0
	});
	console.log(user);
	user.save(function ( err, user, count )
		{
			
		    if( err ) 
			    {
			       // res.render( 'register', 
				      //  {
				      //    title : 'Register',
				      //    req   : req,
				      //    error : err
				      //  });
					if (err.code=11000)
						{
							res.send("Le pseudo existe déja");
						}
					else
						{
							 res.send(err);
						}
			     
			    }
		    else 
		    	{
				       // res.render( 'register', 
					      //  {
					      //    title : 'Register',
					      //    req   : req,
					      //    success : "Votre compte ("+req.body.mail+") vient d'être crée avec succès !"
					      //  });
					res.redirect('home?note=inscriptionReussie');

				}
		});
});

module.exports = router;
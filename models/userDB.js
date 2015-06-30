var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var UserShema = new Schema({
    pseudo    	: { type: String, unique: true },
    password	: String,
    key			: Number,
    nom 		: String,
    prenom		: String,
    nombreCombatGagne		: Number,
    nombreCombatPerdu		: Number,
    tauxDeGain				: Number,
    dateDerniereConection	: Number
});
 
var User=mongoose.model( 'User', UserShema );
 
mongoose.connect( 'localhost','sup_game2' );
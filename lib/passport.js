var lowdb = require('../lib/lowdb');
var db = require('../lib/db');
module.exports = function(app){
	var passport = require('passport')
		, LocalStrategy = require('passport-local').Strategy;

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user, done){
		console.log('serializeUser db', user);
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		db.query('SELECT * FROM users', function(err, users){
			if(err){
				throw err;
			}
			db.query('SELECT * FROM users WHERE id=?', [id], function(err2, users2){
				if(err2){
					throw err2;
				}
				var user = users2[0];
				console.log('deserializeUser db', id, user);
				done(null, user);
			});

		}); 
	});

	passport.use(new LocalStrategy(
		{
			usernameField:'email',
			passwordField:'pwd'
		},
		//function(username, password, done) {
		function(email, password, done) {
			console.log('LocalStrategy', email, password);
			//
			db.query('SELECT * FROM users', function(err, users){
				if(err){
					throw err;
				}
				db.query('SELECT * FROM users WHERE email=?', [email], function(err2, users2){
					if(err2){
						throw err2;
					}
					var user = users2[0];

					if(email === user.email){
						if(password === user.password){
							return done(null, user, {
								message: 'Welcome :) '
							})} else{
								return done(null, false, {
									message: 'Incorrect password.'
								});
							}
					}
					else {
						return done(null, false, {
							message: 'Incorrect username.'
						});
					} 
				})
			})
		}
	)) 
	return passport;
}


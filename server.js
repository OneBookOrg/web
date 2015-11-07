var express = require('express')
var mongoose = require('mongoose')
var http = require('http')
var path = require('path')
var fs = require('fs')
var bodyParser = require('body-parser')
var hash = require('./pass').hash

require('./models/users.js');
var User = mongoose.model('users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
	res.send("hello, connected.");
});

app.post('/register', function(req, res){
	var user = new User ({
		username : req.body.username,
		password : req.body.password,
		hashcode : "",
		register_date : Date.now()
	});

	tempSalt = user.register_date.toString().replace(/\s+/g, '');

	hash(user.password, tempSalt, function(err, hash){
		if(err) return err;
		user.hashcode = hash.toString('hex');
		console.log(user.hashcode);

		user.save(function(err, post, count){
			if(err){
				console.log(err)
				res.json({
					success : false,
					error : 'User already exists.'
				});
				return;
			}
			res.json({
				success : true
			});
		});
	});

});




var portNumber = 8000;
app.listen(portNumber);
mongoose.connect('mongodb://localhost/OneBookDB')

console.log("OneBook server is listening on port " + portNumber)


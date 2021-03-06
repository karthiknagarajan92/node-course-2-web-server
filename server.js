const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',function(){
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt',function(text){
	return text.toUpperCase();
});

app.set("view enginer",'hbs');

app.use(express.static(__dirname + '/public'));
app.use(function(req,res,next){
	var now = new Date().toString();
	var log = now + req.method +req.url;
	console.log(log);
	fs.appendFile('server.log',log+'\n',function(err){
		if(err){
			console.log("unable to perform operation!");
		}
	});
	next();
});

app.get('/',function(req,res){
	res.render('home.hbs',{
		pageTitle:'Home',
		welcomeMessage:'Welcome to the node js tutorials!'
	});
});

app.get('/about',function(req,res){
	res.render('about.hbs',{
		pageTitle:"About Page",
	});
});

app.get('/projects',function(req,res){
	res.render('projects.hbs',{
		pageTitle:'projects Page',
		welcomeMessage:'Welcome to the projects page!'
	});
});

app.get('/home',function(req,res){
	res.render('home.hbs',{
		pageTitle:'Home Page',
		welcomeMessage:'Welcome to the Home page!'
	});
});
app.listen(port,function(){
	console.log("Server started and listening at ${port}");
});


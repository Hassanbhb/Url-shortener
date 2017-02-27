const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('home');
});

let URL = String;        
app.get('/short/*', function(req, res){
	URL = req.params[0];
	const regex = /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g;
	if (regex.test(URL)) {
		res.send({
			"original_url": URL,
			"shortened_url": shorten()
		});
	}else{
		res.send({
			"error": "Wrong url format, url must have a valid protocol"
		});
	}
})

app.get('/:num', function(req, res){
	if (!isNaN(req.params.num)) {
		res.redirect(301, URL);
	}
})

function shorten(){
	const num = Math.floor(Math.random()*(1000-10)+10);
	return "https://secure-journey-22940.herokuapp.com/"+num;
}

const port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Server running at '+port);
})
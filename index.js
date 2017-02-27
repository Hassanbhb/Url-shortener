const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('home');
});

app.get('/short/*', function(req, res){
	const URL = req.params[0];
	const regex = /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g;
	if (regex.test(URL)) {
		res.send({
			"original_url": URL,
			"shortened_url": "test"
		});
	}else{
		res.send({
			"error": "Wrong url format, url must have a valid protocol"
		});
	}

})

const port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Server running at '+port);
})
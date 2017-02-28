const mongoose = require('mongoose');
const ShortUrl = require('../models/shortUrl.js');
mongoose.Promise = global.Promise;

//connecting to database
let db = process.env.MLAB_URI;
mongoose.connect(db);
mongoose.connection.once('open', function(){
	console.log('Connection has been made (db)')
}).on('error', function(error){
	console.log(error);
})


module.exports = function(app){
	app.get('/', function(req, res){
		res.render('home');
	});

	app.get('/short/*', function(req, res){
		const URL = req.params[0];
		const regex = /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g;
		//must be the correct format or return an error 
		if (regex.test(URL)) {
			//creating new sort url
			const short = new ShortUrl({
				original_url: URL,
				short_url: shorten()
			});
			//saving it to the database
			short.save(function(err, data){
				if (err) {return console.log(err)};
				console.log(data);
			});
			//send the short url to the client
			res.send({
				"original_url": short.original_url,
				"shortened_url": short.short_url
			});
		}else{
			res.send({
				"error": "Wrong url format, url must have a valid protocol"
			});
		}
	});

	app.get('/:num', function(req, res){
		if (!isNaN(req.params.num)) {
			//find the short url with the same number
			ShortUrl.findOne({short_url: 'https://secure-journey-22940.herokuapp.com/'+req.params.num}).then(function(result){
				//if found then redirect to that urls original url
				res.redirect(301, result.original_url);
			}, function(err){
				//if not found return an error
				if (err) {return console.log(err)};
				res.send({
					"error": "this short url does not exist in the database, please create a new one"
				})
			})
		}else{
			res.send({
				"error": "This is not a newly generated url, please generate a new one"
			})
		}
	})
}

function shorten(){
	const num = Math.floor(Math.random()*(9999-10)+10);
	return "https://secure-journey-22940.herokuapp.com/"+num;
}

const express = require('express');
const shortenerController = require('./controllers/shortenerController');
const app = express();

app.set('view engine', 'ejs');

shortenerController(app);

const port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Server running at '+port);
})
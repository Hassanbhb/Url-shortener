const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema and model

const ShortUrlSchema = new Schema({
	original_url: String,
	short_url: String
});

const ShortUrl = mongoose.model('shortUrl', ShortUrlSchema);

module.exports = ShortUrl;
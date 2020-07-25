const mongoose = require('mongoose');

// Schemas

var articleSchema = mongoose.Schema({
    // author: String,
    content: String,
    description: String,
    // publishedAt: String,
    // sources: {id: String, name: String},
    title: String,
    url: String,
    urlToImage: String,
    language: String
})

var userSchema = mongoose.Schema({
    name: String,
    email : String,
    salt: String,
    token: String,
    password: String,
    languagePref: String,
    articles: [articleSchema]
})

// model
var UsersModel = mongoose.model('users',userSchema)

// export models 
module.exports = UsersModel
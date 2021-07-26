//this is a class called Post
//to use this module we need to export it 
//this exports all the variables from the database with the same variable name and store it in post
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let postSchema = new Schema({
    id: String,
    title: String,
    date: Date,
    description: String,
    text: String,
    country: String,
    imageURL: String
});
let Post = mongoose.model('Post', postSchema);

//export class Post and allows app.js to just call it by its name
module.exports = { Post }
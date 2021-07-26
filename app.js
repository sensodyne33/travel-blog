let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let path = require('path');
//import router for posts.js
let postsRouter = require('./routes/posts');
let Post = require('./models/posts').Post;
//import router for callback-requests.js
let CallbackRequestRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');


mongoose.connect('mongodb://localhost/travels', { useNewUrlParser: true });
app.use(express.json());
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})
 
app.use(multer({storage: imageStorage}).single('imageFile'));


app.use('/posts', postsRouter);

//if the requests starts with callback-requests then request has to be 
//redirected to callbackResquestsRouter
app.use('/callback-requests', CallbackRequestRouter);

app.use('/emails', emailsRouter);

app.use(express.static('public'));
 
app.listen(3000, ()=> console.log('Listening 3000...'));



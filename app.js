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

app.set('view engine', 'ejs');

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

//when request is made on sight file, we request and response from ejs
app.get('/sight', (req, resp) => {
        resp.render('sight', {
            title: 'Big Ben',
            imageURL: 'https://cdn.pixabay.com/photo/2014/11/13/23/34/palace-530055__480.jpg',
            date: '2021-27-03',
            text: 'Big Ben text.'
        })
})

app.use(express.static('public'));
 
app.listen(3000, ()=> console.log('Listening 3000...'));



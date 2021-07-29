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
let usersRouter = require('./routes/users');
let cookieParser = require('cookie-parser');
let auth = require('./controllers/auth');

app.set('view engine', 'ejs');

//auto generate cookies for every request
app.use(cookieParser());

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
app.get('/sight', async (req, resp) => {
        //get this id from Post import
        let id = req.query.id;
        let post = await Post.findOne({id : id});
        resp.render('sight', {
            title: post.title,
            imageURL: post.imageURL,
            date: post.date,
            text: post.text
        })
})

app.use('/users', usersRouter);

//checks if user is logged in, if they are show admin page
// create unique session for each user which changes isLoggedIn 
//generate a key to server to allow sign in using JWT
app.get('/admin', (req, resp) => {
    //when request sent to admin server has to read cookie which stored the token
    //gotta install cookie-parser so server can read it correctly
    //if logged in show admin page
    //to read the cookie
    let token = req.cookies['auth_token'];
    //check if cookie is correct by calling checkJwt function
    //if token is correct redirec to admin
    if(token && auth.checkToken(token)) {
        resp.render('admin');
    }
    //show login in page if not sigged in 
    else {
        resp.redirect('/login');
    }
})
//if not logged in, redirected here which is the login in page
app.get('/login', (req, resp) => {
    resp.render('login');
})
app.use(express.static('public'));
 
app.listen(3000, ()=> console.log('Listening 3000...'));



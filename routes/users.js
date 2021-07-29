let User = require('../models/users').User;
let express = require('express');
let router = express.Router();
//encrypts password
let bcrypt = require('bcrypt');
//connect to auth
let auth = require('../controllers/auth');

/*
//route responsible for sign in process
router.post('/login', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email}); 
    if (user.length > 0) {
        //checks if user is in database; if they are check pw
        let comparisonResult = await bcrypt.compare(password, user[0].password);
        //checks pw; if pw is correct generate token
        if(comparisonResult) {
            let token = auth.generateToken(user[0]);
            resp.cookie('auth_token', token);
            resp.send({
                //reditect user to admin page once signed in 
                redirectURL:'/admin'
            });
         } else {
             resp.status(400);
             resp.send('Rejected');
        }
    } else {
        resp.status(400);
        resp.send('Rejected');
    }
})
*/
router.post('/login', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email});
    if(user.length > 0) {
        let comparisonResult = await bcrypt.compare(password, user[0].password);
        if(comparisonResult) {
            let token = auth.generateToken(user[0]);
            resp.cookie('auth_token', token);
            resp.send({
                redirectURL: '/admin'
            }); 
        } else {
            resp.status(400);
            resp.send('Rejected');
        }
    } else {
        resp.send('Rejected');
    }
})

router.post('/register', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email}); 

    if(user.length === 0) {
        let encryptedPass = await bcrypt.hash(password, 12)
        let newUser = new User({
            email: email,
            password: encryptedPass
        })
        await newUser.save();
        resp.send('Done');
    } else {
        resp.send('Rejected');
    }
})


module.exports = router;
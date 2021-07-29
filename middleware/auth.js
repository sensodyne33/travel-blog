//responsible for making sure the user can access database data
//such as callbacks

//import this to use checkToken
let auth = require('../controllers/auth');

function checkAuth(req, resp, next) {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        next();
    } else{
        resp.status(400);
        resp.send('Not authorized!');
    }
}

module.exports = checkAuth;
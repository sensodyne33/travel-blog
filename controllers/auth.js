//resposinble for json WEB token which allow users to sign in 
//using an auto generated key

let jwt = require('jsonwebtoken');
//secret key
let secret = 'gew67dfgew';

//we are generating token for each user
function generateToken(user) {
    //payload is used to generate unique sequence of numbers + letter
    let payload = {
        //user has lots of info but we only need to pass in email and pw
        email: user.email,
        password: user.password
    }
    return jwt.sign(payload, secret);
}

//checks whether token provided by user is correct one
function checkToken(token) {
    //checks token against secret key
    //returns true or false
    return jwt.verify(token, secret);
}

//export this file
module.exports = { generateToken, checkToken };
let User = require('./../models/user');
let jwt = require('jsonwebtoken');
let SECRET = process.env.SECRET;

module.exports = {
    signup,
    login
}

function signup(req, res) {
    let user = new User(req.body);
    user.save()
    .then(user => {
        res.json({token: createJWT(user)});
    })
    .catch(err => res.status(400).json(err));
}

function login(req, res) {
    User.findOne({email: req.body.email}).exec().then(user => {
        console.log(req.body);
        if (!user) return res.status(401).json({err: 'Invalid Credentials'});
        user.comparePassword(req.body.pw, (err, isMatch) => {
            if (isMatch) {
                res.json({token: createJWT(user)});
            } else {
                return res.status(401).json({err: "Invalid Credentials"});
            }
        });
    })
    .catch(err => res.status(401).json(err));
}

/*----- Helper Functions ----*/

function createJWT(user) {
    return jwt.sign(
        {user},
        SECRET,
        {expiresIn: '24hr'}
        // Note: There are several ways to specify the expiration of the JWT. Check the docs for more info.
    );
}
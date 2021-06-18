const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
User = require('./userModel');

//For creating new user
exports.add = function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.admin = 1;

    //Save and check error
    user.save(function (err) {
        if (err) {
            return res.status(500).json(err);
        }

        let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
        });
        return res.status(200).send({ auth: true, token: token, user: user });
    });
};

exports.login = function (req, res) {
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({ auth: false, token: null });
    }
    User.findOne({ email: req.body.email}, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }

        if(!user || user.length<1) {
            return res.status(404).send("User not found");
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
        });
        return res.status(200).send({ auth: true, token: token, user: user });
    });
};

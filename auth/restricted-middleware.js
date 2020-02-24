const bcrypt = require('bcryptjs'); //// STEP 1

const Users = require('../users/users-model');

module.exports = (req, res, next) => {
    let { username, password } = req.headers;

    if(username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next()
                } else {
                    res.status(401).json({ message: 'Invalid Credentials' });
                }
                })
            .catch(({name, message, stack}) => {
                res.status(500).json({name, message, stack});
            });
        } else {
            res.status(400).json({ message: 'please provide credentials' });
    }

}
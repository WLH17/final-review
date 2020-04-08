const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {email, password} = req.body,
              db
    },
    login: async(req, res) => {

    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}
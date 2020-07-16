const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//const register =()

const login = (req, res, next) => {
    let uemail = req.body.uemail
    let upassword = req.body.upassword

    User.findOne({ $or: [{ email: uemail }, { phone: uemail }] })
        .then(user => {
            if (user) {
                bcrypt.compare(upassword, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            errorMessage: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.firstname, role: user.role }, "Averysecertcode", { expiresIn: '1h' })
                        res.render('users/home', {
                            title: 'home',
                            token

                        })
                    } else {
                        res.render('users/index', {
                            errorMessage: 'Password Mismatching'
                        })
                    }
                })
            }
        })
}
module.exports = { login }
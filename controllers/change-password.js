var express = require('express');
// var home = require('./home');
var mysql = require('mysql');
var session = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../config/dbconfig');
var sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('*', function (req, res, next) {
    if (req.cookies['email'] == null) {
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/', function (req, res) {

    // console.log(req.cookies['email']);
    email = req.cookies['email'];
    // console.log(email);
    //-----------------------------------------------------------------------------------////

    //-----------------------------------------------------------------------------------////
    db.query("SELECT * FROM `user_info` where email=?", [email], async (err, result) => {
        console.log(result);
        res.render('change-password.ejs', {
            username: result[0].fname
        });
    })
});

router.post('/', function (req, res) {
    email = req.cookies['email'];
    const password = req.body.password;
    const new_password = req.body.new_password;
    const c_password = req.body.c_password;
    db.query("SELECT * FROM `user_info` where email=?", [email], async (err, result) => {
        
        db.query("SELECT password FROM `user` where email=?", [email], async (err, results) => {
            const isMatch = await bcrypt.compare( password , results[0].password );
            console.log(isMatch)
            if (new_password != c_password) {
                res.render('change-password.ejs', { message: 'New Password Does not match with Confirm Password' ,username: result[0].fname});
            }
            else {
                console.log(isMatch);
                if (isMatch == false) {
                    return res.render('change-password', { message: 'Password Wrong!!',username: result[0].fname });
                }
                else {
                    let hashedPassword = await bcrypt.hash(new_password, 8);
                    db.query('UPDATE user set password=? where email=?', [hashedPassword, email], function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            // res.render('login.ejs',{message: 'Please Login Again!!'})
                            console.log('ami ekhane');
                            res.redirect('/login')
                        }
                    })
                }
            }
        })
    })
})

module.exports = router;

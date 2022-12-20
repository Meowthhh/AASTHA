var express = require('express');
// var home = require('./home');
var mysql = require('mysql');
var session = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../config/dbconfig');
var sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken');
const bcrypt = require("bcryptjs")


router.use(session({

    secret: 'secret',
    resave : true ,
    saveUninitialized : true 

}));


router.get('/', function (req, res) {
    res.clearCookie('email');
    res.render('login.ejs');
});


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post('/', [
    check('email').notEmpty().withMessage("Email is reequired"),
    check('password').notEmpty().withMessage("Password is reequired")

], function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (req.body.email === '' || req.body.password === '') {
        return res.render('login',{ message: 'give input'});

    }

    req.session.loggedin = true ; 
    req.session.email = email;
    res.cookie('email' , email);

    db.query("SELECT * FROM `user` WHERE email=?", [email], async (err, result) => {

        if (err) {
            return res.status(400).send({
                msg: err
            })
        }
        console.log(result.length);
        //check whether the user with that email exists or not.
        //0 means doesn't exist.
        if (result.length === 0) {
            return res.render('login',{message: 'Email or Password Wrong'});
        }
        //check password
        const isMatch = await bcrypt.compare(password, result[0].password);
        //    console.log(result[0].password);
        //    console.log(password);
        //    console.log(isMatch);

        if (isMatch === false) {
            return res.render('login',{message: 'Email or Password Wrong'});
        } else {
            // msg:"logged in successfully",
            // res.send('', {alert_type: 'success', message: `A verification mail has been sent to this email: <b>${email}</b>`, type:'mail'})
            // user:result[0]
            
            res.redirect('/dashboard');
        }
    })
    
})

module.exports = router;
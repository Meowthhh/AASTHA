var express = require('express');
var mysql = require('mysql');
var news = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../config/dbconfig');
var sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { name } = require('ejs');


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
    res.render('add-donation.ejs');
});

router.post('/', function (req, res) {

    const email=req.cookies['email'];
    const fname= req.body.fname;
    const cname=req.body.cname;
    const c_number=req.body.c_number;
    const complications=req.body.complications;
    const date=req.body.date;
    const organization=req.body.organization;
    const address =req.body.address;
    
    db.query('INSERT INTO my_donation SET ?', {email:email,
        pname: fname, cname: cname, c_number: c_number, complications: complications, date: date, 
        organization: organization, address: address
    }, (err, results) => {
            if(err)
            {
                console.log(err)
            }
            else
            {
                res.redirect("/my-profile/my-donation");
            }
    })
})
module.exports = router;
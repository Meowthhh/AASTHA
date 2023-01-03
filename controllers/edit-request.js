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

router.post('/:id', function (req, res) {
    
    const id = req.params.id
    console.log(id)
    console.log(req.body);
    const user_email  = req.cookies['email'];
    const pname = req.body.pname;
    const c_number = req.body.c_number;
    const complicaitons = req.body.complications;
    const date = req.body.date;
    const b_g = req.body.b_g;
    const quantity = req.body.quantity;
    const add_requirement = req.body.add_requirement;
    const organization = req.body.organization;
    const address = req.body.address;

    db.query('UPDATE add_blood_requst SET user_email=? , pname=? , c_number=? ,complications=?, date=?, b_g=?, quantity=?, add_requiement=? , organization=? ,address=? WHERE id=?',
    { user_email,
        pname, c_number, complicaitons , date , b_g  , quantity, 
        add_requirement , organization, address,id
    },function(err,result){
        if(err)
        {
            console.log(err)
        }
        else{
           res.redirect('/my-profile/my-request'); 
        }

    })



})


module.exports = router;
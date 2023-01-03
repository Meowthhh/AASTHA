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
    email = req.cookies['email'];
    db.query("SELECT * FROM `user_info` where email=?", [email], async (err, result) => {
        res.render('my-profile.ejs', { data: result });
    })

})
router.get('/my-donation', function (req, res) {
    email = req.cookies['email'];
    db.query("SELECT * FROM `user_info` where email=?", [email], async (err, result) => {
        db.query("SELECT * FROM my_donation where email=?", [email], async (err, results) => {

            res.render('my-donation', { data: result, donation: results });
        })
    })

})

router.post('/my-donation/view', function (req, res) {
    // 
    const id = req.body.id;
    const email =req.cookies['email'];
    db.query("SELECT * FROM `user_info` where email=?", [email], async (err, results) => {
            
        db.query('SELECT * FROM my_donation where id=?', [id], (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.render('view-donation', { data: result[0] ,user:results[0]})
            }
        })
    })
})
router.post('/my-donation/view/edit/:id',function(req,res){
    console.log(req.params.id);
    const id = req.params.id;
    db.query('SELECT * FROM my_donation WHERE id=?',[id],(err,result)=>{
    res.render('edit-donation',{donation: result[0]})
    })
})

router.get('/my-request', function (req, res) {
    email = req.cookies['email'];
    db.query("SELECT * FROM `user_info` where email=?", [email], async (err, result) => {
        db.query("SELECT * FROM add_blood_requst where user_email=?", [email], function (err, results) {
            res.render('my-request', { data: result, request: results });
        })
    })

})
router.post('/my-request/resolve/:id', function (req, res) {

    const id = req.params.id;
    console.log(id);
        db.query("DELETE FROM add_blood_requst where id=?", [id], function (err, results) {
            if(err)
            {
                console.log(err)
            }
            else{
                res.redirect('/my-profile/my-request');
            }
            
        })
})

router.post('/my-request/view', function (req, res) {
 
    console.log(req.body);
    const id = req.body.id;
    const email =req.cookies['email'];
    db.query("SELECT * FROM `user_info` where email=?", [email], async (err, results) => {
            
    db.query('SELECT * FROM `add_blood_requst` where id=?', [id], (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.render('view-donation', { data: result[0] ,user:results[0]})
            }
        })
    })
})

router.post('/my-request/view/edit/:id',function(req,res){
       
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

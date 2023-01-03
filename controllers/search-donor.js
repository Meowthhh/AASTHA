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
const bcrypt = require("bcryptjs");
const { search } = require('./login');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('*', function (req, res, next) {
    if (req.cookies['email'] == null) {
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/', (req, res) => {
    const email = req.cookies['email'];
    db.query("SELECT * FROM user_info where email != ?",[email], function (error, results, fields) {
        if (error) {
            throw error;
        }
        else {
            res.render('search-donor', { data: results });
        }
    });
});

router.post('/', (req, res) => {
    const bg = req.body.bg;
    const division = req.body.division;
    const district = req.body.district;
    const city = req.body.city;
    console.log(req.body);
    const email = req.cookies['email'];
    console.log(district);
    //  console.log(email);
    if (bg == '' && division == '') {
        res.redirect('/search-donor');
    }
    else if (bg != '' && division == '') {
        // console.log(bg);
        db.query("SELECT * FROM user_info where b_g=? AND email != ?", [bg,email], async(err, results)=> {
            if (err) {
                throw err
            }
            else {
                console.log(results);
                data=[];
                if (results.length) {
                    
                    return res.render('search-donor.ejs', { data: results });
                }
                else {
                    console.log('rokto');
                    return res.render('search-donor.ejs', { message: "No User Found",data :data})
                }
            }
        })
    }
    else if (bg != '' && division != '' && district == '') {
        
        db.query("SELECT * FROM `user_info` where b_g=? AND division=? AND email!=?", [bg, division,district,email], async (err, results)=> {
            console.log('balsal')
                if (err) {
                    throw err
                }
                else {
                    console.log(results);
                    data=[];
                    if (results.length) {
                        
                        return res.render('search-donor.ejs', { data: results });
                    }
                    else {
                        console.log('rokto+div');
                        return res.render('search-donor.ejs', { message: "No User Found",data :data})
                    }
                }
            })
    }         // console.log(result);
    
    else if (bg != '' && division != '' && district != '' && city =='')
    {
        db.query("SELECT * FROM `user_info` where b_g=? AND division=? AND district=? AND email!=?", [bg, division,district,email], async (err, results)=> {
            if (err) {
                throw err
            }
            else {
                console.log(results);
                data=[];
                if (results.length) {
                    
                    return res.render('search-donor.ejs', { data: results });
                }
                else {
                    console.log('vallagena+district');
                    return res.render('search-donor.ejs', { message: "No User Found",data :data})
                }
            }
        })
    }
    else if (bg != '' && division != '' && district != '' && city !='')
    {
        db.query("SELECT * FROM `user_info` where b_g=? AND division=? AND district=? AND city=? AND email!=?", [bg, division,district,city,email], async (err, results)=> {
            if (err) {
                throw err
            }
            else {
                console.log(results);
                data=[];
                if (results.length) {
                    
                    return res.render('search-donor.ejs', { data: results });
                }
                else {
                    console.log('vallagena+city');
                    return res.render('search-donor.ejs', { message: "No User Found",data :data})
                }
            }
        })
    }
    else if (bg == '' && division != '' && district == '' && city =='') {
        // console.log(bg);
        db.query("SELECT * FROM user_info where division=? AND email != ?", [division,email], async(err, results)=> {
            if (err) {
                throw err
            }
            else {
                console.log(results);
                data=[];
                if (results.length) {
                    
                    return res.render('search-donor.ejs', { data: results });
                }
                else {
                    console.log('abcd');
                    return res.render('search-donor.ejs', { message: "No User Found",data :data})
                }
            }
        })
    }
    else if (bg == '' && division != '' && district != '' && city =='' ) {
        
        db.query("SELECT * FROM `user_info` where division=? AND district=? AND email!=?", [division,district,email], async (err, results)=> {
                if (err) {
                    throw err
                }
                else {
                    console.log(results);
                    data=[];
                    if (results.length) {
                        
                        return res.render('search-donor.ejs', { data: results });
                    }
                    else {
                        console.log('efg');
                        return res.render('search-donor.ejs', { message: "No User Found",data :data})
                    }
                }
            })
    }         // console.log(result);
    
    else if (bg == '' && division != '' && district != '' && city !='')
    {
        db.query("SELECT * FROM `user_info` where division=? AND district=? AND city=? AND email!=?", [ division,district,city,email], async (err, results)=> {
            if (err) {
                throw err
            }
            else {
                console.log(results);
                data=[];
                if (results.length) {
                    
                    return res.render('search-donor.ejs', { data: results });
                }
                else {
                    console.log('city');
                    return res.render('search-donor.ejs', { message: "No User Found",data :data})
                }
            }
        })
    }
    else
        res.render('search-donor.ejs',
            {
                message: 'No Donors'
            }
        )
});

module.exports = router;

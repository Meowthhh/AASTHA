var express = require('express');
// var home = require('./home');


router.get('*', function (req, res, next) {

    db.query('INSERT INTO add_blood_requst SET ?',{ user_email: user_email,
        pname: pname, c_number: c_number, complications: complicaitons, date: date , b_g : b_g , quantity: quantity, 
        add_requirement: add_requirement , organization: organization , address: addres

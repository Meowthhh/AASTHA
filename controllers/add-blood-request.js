var express = require('express');
// var home = require('./home');
var mysql = require('mysql');
var session = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');

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
    console.log(email);
    db.query("SELECT * FROM `user_info` where email=?", [email], async (err, result) => {
        console.log(result);
        res.render('add-blood-request.ejs',{username : result[0].fname});
    })
});

router.post('/',function(req,res)
{
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

    db.query('INSERT INTO add_blood_requst SET ?',{ user_email: user_email,
        pname: pname, c_number: c_number, complications: complicaitons, date: date , b_g : b_g , quantity: quantity, 
        add_requirement: add_requirement , organization: organization , address: address
    },function(err,result){
        if(err)
        {
            console.log(err)
        }
})


module.exports = router;

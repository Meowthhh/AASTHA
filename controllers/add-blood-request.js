var express = require('express');
// var home = require('./home');
var mysql = require('mysql');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('*', function (req, res, next) {
    if (req.cookies['email'] == null) {
        res.redirect('/login');
    } else {
        next();
    }
});

    db.query('INSERT INTO add_blood_requst SET ?',{ user_email: user_email,
        pname: pname, c_number: c_number, complications: complicaitons, date: date , b_g : b_g , quantity: quantity, 
        add_requirement: add_requirement , organization: organization , address: address
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

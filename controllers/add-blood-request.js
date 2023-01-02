var express = require('express');
// var home = require('./home');

router.post('/',function(req,res)
{
    console.log(req.body);
    const user_email  = req.cookies['email'];
    const pname = req.body.pname;
    const c_number = req.body.c_number;
    const complicaitons = req.body.complications;
    const date = req.body.date;
    const b_g = req.body.b_g;

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

var express = require('express');
// var home = require('./home');

router.post('/',function(req,res)
{
    console.log(req.body);
    const user_email  = req.cookies['email'];

    db.query('INSERT INTO add_blood_requst SET ?',{ user_email: user_email,
        pname: pname, c_number: c_number, complications: complicaitons, date: date , b_g : b_g , quantity: quantity, 
})


module.exports = router;

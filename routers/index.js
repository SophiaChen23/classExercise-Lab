const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});
const {check, validationResult} = require("express-validator");
const Registration = mongoose.model('Registration');
router.get('/', function(req, res) {
    res.render('menu',{title: 'home page'});
});
router.get('/register', function(req, res) {
    res.render('form',{title: 'Registration form'});
});

router.get('/registrations', basic.check((req,res) => {
   Registration.find()
       .then((registrations)=>{

           res.render('index', {title: "Listening registrations", registrations});
       })
       .catch((err)  =>{
           console.error("Error fetching registrations:", err);
           res.send('Sorry! Something went wrong.');});
}));

router.post('/register',
    [
        check('name')
            .isLength({min: 1})
            .withMessage(' Please enter a name'),
        check('email')
            .isLength({min: 1})
            .withMessage(' Please enter a email'),
    ],
    function(req,res) {


        const errors = validationResult(req);
        // console.log(errors);
        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
                .then(() => {
                    res.render('thankyou', {title: "Registration Success"});
                })
                .catch((err) => {


                    res.send("Sorry! Something went wrong.");
                });
        }else {
            res.render('form', {
                title:"Registration form",
                errors: errors.array(),
                data:req.body,
            });
        }

    }
    );
module.exports = router;

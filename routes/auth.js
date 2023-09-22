const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const auth = require('../controllers/auth');
const { storeReturnTo } = require('../middleware');


router.route('/register')
    .get(auth.renderRegister)
    .post(catchAsync(auth.register));

router.route('/login')
    .get(auth.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), auth.login);

router.get('/logout', auth.logout); 


module.exports = router;
const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('auth/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const newUser = await User.register(user, password);
        req.login(newUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to HikeSpot!');
            res.redirect('/campgrounds')
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }    
}

module.exports.renderLogin = (req, res) => {
    res.render('auth/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}
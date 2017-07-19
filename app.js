
const express               = require('express');
const mongoose              = require('mongoose');
const path                  = require('path');
const favicon               = require('serve-favicon');
const logger                = require('morgan');
const cookieParser          = require('cookie-parser');
const bodyParser            = require('body-parser');
const session               = require('express-session');
const expressLayouts        = require('express-ejs-layouts');
const MongoStore            = require('connect-mongo')(session);
const bcrypt                = require("bcrypt");
const passport              = require("passport");
const LocalStrategy         = require("passport-local").Strategy;
const flash                 = require("connect-flash");
const User                  = require('./models/user');
const index                 = require('./routes/index');
const trip                  = require('./routes/trip');
const addtrip               = require('./routes/addtrip');
const auth                  = require('./routes/auth');
const dashboard             = require('./routes/dashboard');
const activity              = require('./routes/activity');
const app                   = express();

mongoose.connect('mongodb://localhost/mytripdb');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set("layout", "partials/main-layout");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findOne({ "_id": id }, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

// passport.use(new LocalStrategy((username, password, next) => {
//     User.findOne({ username }, (err, user) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             return next(null, false, { message: "Incorrect username" });
//         }
//         if (!bcrypt.compareSync(password, user.password)) {
//             return next(null, false, { message: "Incorrect password" });
//         }

//         return next(null, user);
//     });
// }));

app.use(flash());
passport.use(new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, next) => {
    User.findOne({ username }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, false, { message: "Incorrect username" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, { message: "Incorrect password" });
        }

        return next(null, user);
    });
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', activity);
app.use('/', index);
app.use('/', activity);
app.use('/', dashboard);
app.use('/', auth);
app.use('/', trip);
app.use('/', addtrip)
app.use('/users', User);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
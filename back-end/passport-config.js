var passport = require('passport')        //PASSPORTJS'S CODE 
    , LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

passport.use('local',new LocalStrategy({    //there is one change i gave a name 'local' on there.
    usernameField:'email',   //email and password is our thing for login.
    passwordField:'password'
},
    function (username, password, done) {//user.findOne is for mongoDB if i choose to use different DB i have to change that code.
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.isValid(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

//configure section 
passport.serializeUser(function(user, done) { 
    done(null, user._id);   //we are using mongo so it has to change _id
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
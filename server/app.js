var express = require('express');
var app = express();


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local');

var contactModel = require('./models/contact.js');
var registeruser = require('./models/registeruser.js')

var index = require('./routes/index.js');
var submit = require('./routes/submit.js');
var registrationuser = require('./routes/registrationuser.js');

var mongoURI = process.env.MONGODB_URI ||
process.env.MONGOHQ_URL ||
 "mongodb://localhost/StuckBtn";
var mongoDB = mongoose.connect(mongoURI).connection;
var defExist = null; //for default variables
//db set up
mongoDB.on('error', function(err){
  console.log('Mongo Con', err);
})
mongoDB.once('open', function(err){
  if(!err) {console.log('MongOpen');}
  else if(err) {console.log('error with mongoDB', err);}
})
//check for pre-Existing DB (default connect or defConn)
var defConn = mongoose.createConnection(mongoURI);
    defConn.on('open', function(){
    defConn.db.listCollections().toArray(function(err, names){
        if(names.length==0){
            defExist = false;
        }else{
            defExist = true;
        }
        defConn.close();
    });
});

//get the port up
app.set('port',(process.env.PORT) || 3000);

//bring in middleware
app.use(session({
  saveUninitialized: true,
  secret: 'secret',
  key: 'user',
  resave: true,
  s: false,
  cookie: {maxAge: null, secure: true}
}))

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT SESSION
passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    registeruser.findById(id, function(err, user){
        if(err) done(err);
        done(null, user);
    });
});
passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
    },
    function(req, username, password, done){
        registeruser.findOne({username: username}, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false);
            }
          user.comparePassword(password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                    console.log("yes")
                }else{
                    done(null, false);
                    console.log("no")
                }
            });
        });
    }
));

//calls
app.get('/checkDB', function(req, res){
  console.log('defExist', defExist);
  res.send(defExist);
});

app.use('/registrationuser', registrationuser)
app.use('/submit', submit);
app.use('/', index);

// the one who listens
app.listen(app.get('port'),function(){
  console.log('I can hear you loud and clear on port #', app.get('port'));
});

module.export= app

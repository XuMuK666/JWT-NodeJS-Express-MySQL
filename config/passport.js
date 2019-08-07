// load all the things needed
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var connection = require('../model/dbconnection');
var bcrypt = require('bcrypt');


module.exports = function(passport) {

    // passport set up; required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, {id: user.idusers, username: user.username, role: user.role});
    });

    // used to deserialize the user
    passport.deserializeUser(function(obj, done) {
        connection.query("SELECT * FROM users WHERE idusers = ? ",[obj.id], function(err, rows) {
          if (rows) {
          done(err, rows[0]);
          } else {
            done(err, null);
          }
        });
    });

    // handles signup
    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
          console.log(username)
            connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {

                    // if there is no user with that username then create the user

                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))  // use the generateHash function in our user model
                    };

                    var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // handles login
    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
          console.log(username, password);
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
              console.log(err, rows);
                if (err || !rows.length)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return successful user

                return done(null, rows[0] );
            });
        })
    );
};

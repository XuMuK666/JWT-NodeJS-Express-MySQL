module.exports = function(app, passport, config) {
  const jwt = require('jsonwebtoken');
  global.tokenList = {};

// =========== authenticate login info and generate access token ===============

  app.post('/api/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      // stop if it fails
      if (!user) { return res.status(200).json({res: {error: true, message: 'Неправильный логин или пароль' }}); }
      req.logIn(user, function(err) {
        // return if does not match
        if (err) { return next(err); }

        // generate token if it succeeds
        const db = {
          updateOrCreate: function(user, cb){
            cb(null, user);
          }
        };
        db.updateOrCreate(req.user, function(err, user){
          if(err) {return next(err);}
          // store the updated information in req.user again
          req.user = {
            id: user.username
          };
        });

        const UserCred = {
          "user": user.username,
          "role": user.role,
          "id": user.idusers
        };

        const token = jwt.sign(UserCred, config.secret, { expiresIn: config.tokenLife})
        const refreshToken = jwt.sign(UserCred, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
        const response = {
          "error": false,
          "status": "Logged in",
          "token": token,
          "refreshToken": refreshToken,
        }
        tokenList[refreshToken] = response;
        res.status(200).json({res: response});
      });
    })(req, res, next);
  });

// =============================================================================

  app.post('/api/token', function(req,res) {
    // refresh the damn token
    const postData = req.body;
    // if refresh token exists
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
    //Проверка рефреш токена на валидность.
      try {
    jwt.verify(postData.refreshToken, config.refreshTokenSecret, function(err, decoded) {
      if (err) {
        delete tokenList[postData.refreshToken]
        }
      });
      } catch (err) {  return res.send({token: 0, error: true, message: 'RefreshToken expired. Refresh and Access tokens removed.' });
      }
    const user = {
      "user": postData.user,
      "role": postData.role
    }
    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
    const response = {
      "token": token,
    }
    // update the token in the list
    tokenList[postData.refreshToken].token = token;
    res.status(200).json(response);
  } else {
    res.status(423).json({error:true, message:'Invalid request'});
  }
});

  app.post('/api/logout', function (req, res, next){
    req.session.destroy(function (err) {
    });
    req.logout();
    res.sendStatus(204)
    next();
  });

  app.post('/api/token/reject', function (req, res, next) {
    var refreshToken = req.body.refreshToken;
    if(refreshToken in tokenList) {
      delete tokenList[refreshToken]
    }
    res.sendStatus(204);
    next();
  });


// ==================== Allows users to create accounts ========================

  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect : '/signup/successjson',
    failureRedirect : '/signup/failurejson',
    failureFlash : true
    }));
  // return messages for signup users
  app.post('/api/signup/successjson', function(req, res) {
    res.status(200).json({error: false, message: 'Successfully created user' });
  });

  app.post('/api/signup/failurejson', function(req, res) {
    res.status(200).json({error: true, message: 'This user already exists' });
  });



// =============================================================================

// ================= Protected APIs for authenticated Users ====================

  var connection = require('../model/dbconnection')

  // get tools and routes
  const create = require('../routes/Create')(connection)

  // authenticate access token
  const authenticate = require('./JWTChechker');
  /*
*
* INSERT QUERIES
*
* */
  app.post('/api/createCompany', authenticate, create.Company);


}

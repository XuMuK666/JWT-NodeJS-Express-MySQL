const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = function (req,res,next) {
  const token = req.headers.authorization;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(401).json({"error": true, "message": 'Unauthorized access.' }).end();
      }
      try {
        if (tokenList[req.headers.refreshtoken].token == token) {
          req.decoded = decoded;
          next();
        }
      } catch (err) { return res.status(401).json({"error": true, "message": 'Unauthorized access.' }).end();}
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      "error": true,
      "message": 'No token provided.'
    }).end();
  }
}

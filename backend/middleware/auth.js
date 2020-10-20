const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token'); //header key to send the token as value (key-value pair)

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'Authorization Denied! No token!' });
  }

  //Verify Token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')); //token and secret

    req.user = decoded.user; //user object with id is sent in the token
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};

const jwt = require('jsonwebtoken');

const verifyCookie = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyCookie;

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) {
        res.json({ msg: "Token is not valid" });
        return
      } else {
        req.user = user;
      }

      next();
    });
  } else {
    res.status(404).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res,next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that ");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res,next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not an admin ");
    }
  });
};



module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};

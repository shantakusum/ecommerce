const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

  const header = req.headers.authorization;

  if (!header) {

    return res.status(401).json({
      message: "Token missing"
    });

  }
  const token = header.split(" ")[1];

  try {

    const verified = jwt.verify(
      token,
      "secretkey"
    );

    req.user = verified;

    next();

  } catch (err) {
    if (err.message === "jwt expired") {

        return res.status(401).json({
          message: "Token expired"
        });

      }

      res.status(401).json({
        message: "Invalid token"
      });

  }

};

module.exports = auth;
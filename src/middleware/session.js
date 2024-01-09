const { verifyToken } = require("../utils/jwt");

const checkToken = (req, res, next) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();
    const isUser = verifyToken(`${jwt}`);
    req.user = isUser;
    console.log({ jwtByUser });
    next();
  } catch (e) {
    console.log({ e });
    if (e.name === "TokenExpiredError") {
      res.status(401);
      res.send("La sesión ha expirado");
    } else if (e.name === "JsonWebTokenError") {
      res.status(401);
      res.send("Token no valido");
    } else {
      res.status(400);
      res.send("La sesión no es valida");
    }
  }
};

module.exports = checkToken;

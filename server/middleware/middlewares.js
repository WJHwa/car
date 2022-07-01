const jwt = require("jsonwebtoken");

function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "6h",
  });
}

function generateRefreshToken(id) {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "60m",
  });
}

function authenticateAccessToken(req, res, next) {
  let authHeader = req.headers.authorization;
  let token = authHeader.split(" ")[1];

  if (token === "null" || !token) {
    return res.status(400).send("잘못된 토큰 형식 또는 토큰이 전송되지 않음");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("토큰이 유효하지 않습니다.");
    } else {
      req.token = token;
      next();
    }
  });
}

module.exports = {
  authenticateAccessToken,
  generateRefreshToken,
  generateAccessToken,
};

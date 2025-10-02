const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Token not provided" })
  }

  const token = authHeader.split(" ")[1]

  jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
    if (err) {
      return res.status(403).send({ message: "Invalid token" })
    }
    req.user = data
    next()
  })
}

module.exports = authMiddleware

const jwt = require('jsonwebtoken')

module.exports = function(role){
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(" ")[1]
      if (!token) {
        return res.status(401).json({ message: "Ne Avtorizovan" })
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      if(decoded.role != role){
        return res.status(400).json({message:"Siz admin emassiz, Ruxsat yo'q...!!!"})
      }
      req.user = decoded
      next()
    } catch (error) {
      return res.status(404).json({ message: "Ne Avtorizovan" })
    }
  }
}
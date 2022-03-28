const ApiError = require('../errors/ApiErrors')
const {User, Basket} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const gerenateToken = (id, email, role) =>{
  return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn:'24h'})
}
class UserController {
  async registration(req, res, next) {
    
    const { email, role, password } = req.body

    if(!password){
      return next(ApiError.badRequest("Iltimos parol kiriting..."))
    }
    if(!email){
      return next(ApiError.badRequest("Iltimos email kiriting..."))
    }
    const candidate = await User.findOne({where:{email}})

    if(candidate){
      return next(ApiError.badRequest("Bunday foydalanuvchi mavjud..."))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, role, password:hashPassword})
    const basket = await Basket.create({userId:user.id})
    const token = gerenateToken(user.id, email, role)
    return res.json({token})
  }

  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where:{email}})
    if(!user){
      return next(ApiError.internal("Bunday foydalanuvchi yo'q..."))
    }
    let camparePassword = bcrypt.compareSync(password, user.password)
    if(!camparePassword){
      return next(ApiError.internal("Parol xato..."))
    }
    const generateToken = gerenateToken(user.id, user.email, user.role)
    return res.json({generateToken})
  }

  async check(req, res, next) {
    const {id} = req.query
    if(!id){
      return next(ApiError.badRequest('Id topilmadi'))
    }
    res.json({message:"Id topildi", id})
  }

}

module.exports = new UserController()
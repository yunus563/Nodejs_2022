const ApiError = require('../errors/ApiErrors')




class UserController {

  
  async registration(req, res) {

  }

  async login(req, res) {

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
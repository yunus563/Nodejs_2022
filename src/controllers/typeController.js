const { Type } = require('../models/models')
const ApiError = require('../errors/ApiErrors')



class typeController {
  async Create(req, res, next) {
    const { name } = req.body
    const type = await Type.findOne({ where: { name } })
    if (type) {
      return next(ApiError.internal('Это категория уже сушествует...!!!'))
    }
    const newType = await Type.create({ name })
    return res.json(newType)
  }
  async GetAll(req, res) {
    const finOne = await Type.findAll()
    return res.json(finOne)
  }
}
module.exports = new typeController()

const { Brand } = require('../models/models')
const ApiError = require('../errors/ApiErrors')



class brandController {
  async Create(req, res, next) {
    const { name } = req.body
    const brand = await Brand.findOne({ where: { name } })
    if (brand) {
      return next(ApiError.internal('Бранд уже сушествует...!!!'))
    }
    const type = await Brand.create({ name })
    return res.json(type)
  }
  async GetAll(req, res) {
    const finOne = await Brand.findAll()
    return res.json(finOne)
  }
}
module.exports = new brandController()
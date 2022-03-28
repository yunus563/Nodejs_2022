
const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../errors/ApiErrors')
const { json } = require('body-parser')



class deviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const device = await Device.create({ name, price, brandId, typeId, img: fileName });
      if(info){
        info = JSON.parse(info)
        info.forEach(i => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        })
      }
      return res.json(device)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getAll(req, res) {
    
    let {brandId, typeId, limit, page} = req.query
    limit = limit || 9
    page = page || 1
    let offset = limit * page - limit 
    let devices;
    if(!brandId && !typeId){
      devices = await Device.findAndCountAll({ limit, offset })
    }
    if(brandId && !typeId){
      devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
    }
    if(!brandId && typeId){
      devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
    }
    if(brandId && typeId){
      devices = await Device.findAndCountAll({where:{typeId,brandId}, limit, offset})
    }
    return res.json(devices)
  }

  async getOne(req, res) {
    const {id} = req.params
    const deviceOne = await Device.findOne({
      where:{id},
      include:[{
        model: DeviceInfo, as:'info'
      }]
    })
    return res.json(deviceOne)
  }
}

module.exports = new deviceController()
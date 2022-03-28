const Router = require('express')
const router = new Router()

const typeController = require('../controllers/typeController')


router.post('/',typeController.Create)
router.get('/',typeController.GetAll)



module.exports = router
const Router = require('express')
const router = new Router()

const typeController = require('../controllers/typeController')
const roleMiddleware = require('../middleware/RoleMiddleware')

router.post('/',roleMiddleware("ADMIN"),typeController.Create)
router.get('/',typeController.GetAll)



module.exports = router
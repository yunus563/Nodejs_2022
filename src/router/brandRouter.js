const Router = require('express')
const router = new Router()

const brandController = require('../controllers/brandController')





router.post('/',brandController.Create)
router.get('/',brandController.GetAll)



module.exports = router

// await  writeAsynFunc(path.resolve(__dirname, 'User_Info.json'), JSON.stringify(req.body))
// res.send("ok")
// const writeAsynFunc = (path, data) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(path, data, (err) => {
//       if (err) reject(err)
//       resolve()
//     })
//   })
// }
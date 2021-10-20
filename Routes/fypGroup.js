const express = require ('express')
const { createGroup } = require('../controllers/fypGroup.js')
const router = express.Router()
const { protect } = require('../middlewares/auth')


// router.route('/').post(CreateMessage).get(getMessages).delete(deleteAllMessage)
// router.route('/').post(upload.single('fileUpload'),protect,CreateMessage).get(protect,getMessages).delete(protect,deleteAllMessage)

router.route('/').post(protect,createGroup)







module.exports = router 
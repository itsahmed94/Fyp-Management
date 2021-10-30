const express = require ('express')
const { createGroup, updatedGroup,getFypGroup } = require('../controllers/fypGroup.js')
const router = express.Router()
const { protect, authorize } = require('../middlewares/auth')


// router.route('/').post(CreateMessage).get(getMessages).delete(deleteAllMessage)
// router.route('/').post(upload.single('fileUpload'),protect,CreateMessage).get(protect,getMessages).delete(protect,deleteAllMessage)

router.route('/').post(protect,authorize("student"),createGroup).get(protect,authorize("student"),getFypGroup)

router.route('/:id').patch(protect,authorize("student"),updatedGroup)







module.exports = router 
const express = require ('express')
const router = express.Router()
const {createMessage, getMessages, deleteMessage, deleteAllMessage} = require ('../controllers/message.js')
const upload = require('../middlewares/fileupload')
const { protect } = require('../middlewares/auth')


// router.route('/').post(CreateMessage).get(getMessages).delete(deleteAllMessage)
// router.route('/').post(upload.single('fileUpload'),protect,CreateMessage).get(protect,getMessages).delete(protect,deleteAllMessage)

router.route('/').post(upload.array('fileUpload[]'),protect,createMessage).delete(protect,deleteAllMessage)
router.route('/:id').get(protect,getMessages).delete(protect,deleteMessage)






module.exports = router 
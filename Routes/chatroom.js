const express = require ('express')
const router = express.Router()
const {createChatRoom, getChatRooms, deleteChatRoom} = require ('../controllers/chatroom.js')
const { protect, authorize } = require('../middlewares/auth')
const upload = require('../middlewares/fileupload')

router.route('/').post(upload.single('groupIcon'),protect,authorize("student"), createChatRoom).get(protect,authorize("student", "supervisor"), getChatRooms)


router.route('/:id').delete(protect,authorize("student","supervisor"),deleteChatRoom)







module.exports = router



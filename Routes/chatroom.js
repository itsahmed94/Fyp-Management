const express = require ('express')
const router = express.Router()
const {createChatRoom, getChatRooms, deleteChatRoom} = require ('../controllers/chatroom.js')
const { protect } = require('../middlewares/auth')
const upload = require('../middlewares/fileupload')

router.route('/').post(upload.single('groupIcon'),protect, createChatRoom).get(protect, getChatRooms)

router.route('/:id').delete(protect,deleteChatRoom)








module.exports = router



const express = require ('express')
const { createChatRoom } = require('../controllers/chatroom.js')
const router = express.Router()
const {createPrivateChat, getPrivateChat} = require ('../controllers/privateChat.js')
const { protect, authorize } = require('../middlewares/auth')


router.route('/').post(protect, createChatRoom)

router.route('/:id').get(protect,authorize("student"),getPrivateChat)

// router.route('/message').get(protect,authorize("student"),getPrivateChat)

// router.route('/:id').delete(protect,authorize("student"),deleteChatRoom)





module.exports = router
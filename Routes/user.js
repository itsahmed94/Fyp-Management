const express = require ('express')
const router = express.Router()
const {userRegister,getUsers, removeUser, loginUsers, changePassword, getUserById, logOut, updateProfile} = require('../controllers/user')
const { protect, authorize } = require('../middlewares/auth')
const upload = require('../middlewares/fileupload')

router.route('/register').post(upload.single('uploadImage'),userRegister)
router.route("/login").post(loginUsers)
router.route('/').get(getUsers)
// router.route("/log-out").post(protect,authorize("student"),logOut)
router.route("/log-out").post(protect,authorize("admin","supervisor","student"),logOut)
router.route("/change-password").post(protect,changePassword)
router.route('/:id').get(protect,authorize("student"),getUserById)
router.route('/:id').delete(protect,authorize("student"),removeUser)
router.route('/profile/setting/:id').patch(upload.single('uploadImage'),protect,authorize("student"),updateProfile)





module.exports = router 
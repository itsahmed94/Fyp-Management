const express = require ('express')
const router = express.Router()
const {userRegister,removeUser, loginUsers, changePassword, getUserById, logOut, updateProfile,getStudents, getSupervisors} = require('../controllers/user')
const { protect, authorize } = require('../middlewares/auth')
const upload = require('../middlewares/fileupload')

router.route('/register').post(upload.single('uploadImage'),userRegister)

router.route("/login").post(loginUsers)

router.route('/').get(protect,authorize("student"),getStudents)

router.route('/list').get(protect,authorize("student","supervisor"),getSupervisors)

// router.route("/log-out").post(protect,authorize("student"),logOut)

router.route("/log-out").post(protect,authorize("admin","supervisor","student"),logOut)

router.route("/change-password/:id").post(protect,authorize("supervisor","student"),changePassword)

router.route('/:id').get(protect,authorize("student"),getUserById)

router.route('/:id').delete(protect,authorize("student"),removeUser)

router.route('/profile/setting/:id').patch(upload.single('uploadImage'),protect,authorize("student"),updateProfile)





module.exports = router 
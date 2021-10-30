const express = require ('express')
const router = express.Router()
const {createProposal, getProposals} = require ('../controllers/proposal.js')
const upload = require('../middlewares/fileupload')
const { protect, authorize } = require('../middlewares/auth')


// router.route('/').post(CreateMessage).get(getMessages).delete(deleteAllMessage)
// router.route('/').post(upload.single('fileUpload'),protect,CreateMessage).get(protect,getMessages).delete(protect,deleteAllMessage)

router.route('/').post(upload.single('uploadDoc'),protect,authorize("student"),createProposal)

router.route('/:id').get(protect,authorize("admin","supervisor"),getProposals)








module.exports = router 
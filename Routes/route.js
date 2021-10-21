const express = require ('express')
const {userRegister} = require('../controllers/user')
const router = express.Router()
const userRoute = require('./user')
const chatroomRoute = require('./chatroom')
const messageRoute = require('./message')
const proposalRoute = require('./proposal')
const proposalStatusRoute = require('./proposalStatus')
const groupRoute = require('./fypGroup') 


router.get('/', (req, res) => {
    res.render('chat',{title:'chat'})
   })

router.get('/about', (req, res) => {
  res.render('about', {title:'about'})
 })


router.use('/student',userRoute)

router.use('/supervisor',userRoute)

router.use('/chatroom',chatroomRoute) 

router.use('/message',messageRoute)

router.use('/proposal',proposalRoute)

router.use('/proposalStatus',proposalStatusRoute)

router.use('/group',groupRoute)


// router.post('/api/register',userRegister)
 
 


module.exports = router 
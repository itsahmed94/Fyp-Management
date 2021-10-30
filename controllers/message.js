const { AsyncHandler } = require("../middlewares/async");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Message = require("../models/message");
const Chatroom = require("../models/chatroom");
const ErrorResponse = require("../utils/errorResponse");


//create message
exports.createMessage = AsyncHandler(async (req, res, next) => {
  const { chatroom, user, message,fileUpload, lastMessageBy, lastMessageAt,announcement,year } = req.body 
  const socket = global.socket
  // if ( socket ) console.log(socket)
  const chatRoom = await Chatroom.findById(chatroom);
  if (!chatRoom)
    next(new ErrorResponse(`Chatroom not found by id ${chatroom}`, 404));  

  if (chatRoom.announcement){
    if (req.user.role !== 'admin'){
        return next(new ErrorResponse("You are not able to chat in this room", 404));
    }
  }
  const messages = new Message({
    chatroom,
    user,
    message,
    fileUpload,
    announcement,
    year,
  });

  //for single file upload
  // if(req.file){
  //   messages.fileUpload = req.file.path
  // }

  //for multiple files upload
  if (req.files) {
    let path = [];
    req.files.forEach(function (files, index, arr) {
      path .push( files.path );
    });
    messages.fileUpload = path;
    chatRoom.lastMessage = 'file: '
  } else {
    chatRoom.lastMessage = 'text: '
  }
    chatRoom.lastMessage += message.slice(0,10)+'...'
    chatRoom.lastMessageBy = user
    chatRoom.lastMessageAt = lastMessageAt
    
 
  await messages.save();
  await chatRoom.save();
  if(socket) {
    const toSend  = chatRoom.members 
    toSend.filter(uid => uid !== user).map( uid => {
      socket.emit(`${uid}-message`,req.body)
    })
  }
  res
    .status(200)
    .json({ data: messages, message: "Message sent", success: true });
});

//get messages
exports.getMessages = AsyncHandler(async (req, res, next) => {
  // const messages = await Message.find();
  let user = req.user;
  const { id: chatroom } = req.params;
  const messages = await Message.find({chatroom}).populate([{path: 'chatroom',populate:{path:'name', select:'name'},select:'name '},{path: 'user', select: 'fullName'}]);

  // if(!messages)
  // {
  //   return res.status(404).json({ status: 'error', error: 'There are no messages' })
  // }
  res
    .status(200)
    .json({ data: messages, message: "All messages ", success: true });
});

//delete messages
exports.deleteMessage = AsyncHandler(async (req, res, next) => {
  const removeMessage = await Message.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ data: removeMessage, message: "Message Deleted ", success: true });
});

//delete All messages
exports.deleteAllMessage = AsyncHandler(async (req, res, next) => {
  const removeAllMessage = await Message.deleteMany();
  res
    .status(200)
    .json({
      data: removeAllMessage,
      message: "All Messages Deleted ",
      success: true,
    });
});

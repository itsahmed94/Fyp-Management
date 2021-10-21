const { AsyncHandler } = require("../middlewares/async");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Chatroom = require("../models/chatroom");




//create chatroom
exports.createChatRoom = AsyncHandler(async (req, res, next) => {
    const { name,groupInfo,lastMessageBy} = req.body;
    const groupName = await Chatroom.findOne({ name })
    if (groupName)
    {
      return res.status(404).json({ status: 'error', error: 'This groupName already exist with a group please try another one' })
    }
    const chatroom = new Chatroom({
    name ,
    groupInfo,
    lastMessageBy,
    

  });
  //for single file upload
    if(req.file){
      chatroom.groupIcon = req.file.path
    }
    await chatroom.save();
    res.status(200).json({ data: chatroom, message: "Chatroom Created", success: true });
  });


//get chatRooms
exports.getChatRooms = AsyncHandler(async (req, res, next) => {
  
  //in below line we are putting one condition to check weather the chat is one to one or more than 2 persons.
    const chats = await Chatroom.find({}) .populate([{path:'name' , select:'name'},{path:'groupInfo' , populate:[{path:'groupMembers', select: 'fullName'},{path: 'admin',select: 'fullName'}]}])
    res.status(200).json({ data: chats, message: "All ChatRooms", success: true });
  });


//delete chatRooms
exports.deleteChatRoom = AsyncHandler(async (req, res, next) => {
  const deleteChats = await Chatroom.deleteOne({_id: req.params.id});
  res.status(200).json({ data: deleteChats, message: "ChatRoom Deleted", success: true });
});


// function stringToObj(data) {
//   try {
//     if( typeof data === 'string')
//      return JSON.parse(data)
//      else return data
//   } catch (error) {
//     throw new Error("Pass a valid string ")
//   }
   
// }
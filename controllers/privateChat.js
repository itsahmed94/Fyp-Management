const { AsyncHandler } = require("../middlewares/async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PrivateChat = require("../models/privateChat");




//create private chat
exports.createPrivateChat = AsyncHandler(async (req, res, next) => {
    const { members,lastMessageBy,lastMessage,lastMessageAt} = req.body;
    
    const privateChat = new PrivateChat({
        members,
        lastMessageBy,
        lastMessage,
        lastMessageAt,
    

  });

    await privateChat.save();
    res.status(200).json({ data: privateChat, message: "Private Chat Created", success: true });
  });


// get chats
exports.getPrivateChat = AsyncHandler(async (req, res, next) => {
  
     const {id: members} = req.params;
      const chats = await PrivateChat.find({members})
      res.status(200).json({ data: chats, message: "All Chats", success: true });
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
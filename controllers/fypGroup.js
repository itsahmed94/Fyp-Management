const { AsyncHandler } = require("../middlewares/async");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fypGroup = require("../models/fypGroup");
const ErrorResponse = require("../utils/errorResponse");

//create student group
exports.createGroup = AsyncHandler(async (req, res, next) => {
    const {groupMembers, admin} = req.body;

        if (typeof groupMembers === 'object' && groupMembers.length !==4) {
          return res.status(404).json({status: 'error', error: 'Please select at least 4 members for groups'})
        }
        const group = await fypGroup.findOne({groupMembers:{$in:groupMembers}}).populate('groupMembers')
        if(group) {
            let OldMembers = group.groupMembers
            const oldMembersObj = OldMembers.reduce((acc, user)=>({ ...acc ,[user._id]: user}),{})
            const usersIn = [ ]
            groupMembers.map(uid=>{
                if( Object.keys(oldMembersObj).includes(uid)){
                    usersIn.push(oldMembersObj[uid])
                }
            })
        //    return  res.status(200).json({ data: usersIn, message: "Request Submitted", success: true });
            return next (new ErrorResponse( usersIn.map(u=>u.fullName).join(', ') +' already in another Group ' ,403))

            
        }

    //     const group = new fypGroup({
//         groupMembers,
//         admin,

//   });
//     await group.save();
    res.status(200).json({ data: {}, message: "Request Submitted", success: true });
  });

  
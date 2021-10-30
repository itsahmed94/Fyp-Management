const { AsyncHandler } = require("../middlewares/async");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fypGroup = require("../models/fypGroup");
const Proposal = require("../models/proposal")
const ErrorResponse = require("../utils/errorResponse");

//create student group
exports.createGroup = AsyncHandler(async (req, res, next) => {
    const {groupMembers, admin, supervisor} = req.body;

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

        const groupMem = new fypGroup({
        groupMembers,
        admin,
        supervisor

  });
    await groupMem.save();
    res.status(200).json({ data: groupMem, message: "Request Submitted", success: true });
  });


  //get fypGroups
exports.getFypGroup = AsyncHandler(async (req, res, next) => {
    const groups = await fypGroup.find({ });
    res.status(200).json({ data: groups, message: "All Fyp Groups", success: true });
  });

  //update fypGroup by id
exports.updatedGroup = AsyncHandler(async (req, res, next) => {

  const groupInfo = await fypGroup.findOne({_id:req.params.id}).populate({path:'proposal'})
  if(!groupInfo){
    return next(new ErrorResponse('Error not found',404))
  }
  // return res.status(200).json({groupInfo})
  // console.log(groupInfo)
  const updatedGroup = await fypGroup.updateOne(
    { _id: req.params.id },{$set: {groupMembers: req.body.groupMembers,supervisor: req.body.supervisor}});
  res.status(200).json({data: updatedGroup,message: "Group has been updated",success: true});
    
  });
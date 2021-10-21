const { AsyncHandler } = require("../middlewares/async");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProposalStatus = require("../models/ProposalStatus");

//create proposal
exports.createProposalStatus = AsyncHandler(async (req, res, next) => {
    const {status, proposalID} = req.body;
    const proposalStatus = new ProposalStatus({
        status, 
        proposalID,
        
  });
    await proposalStatus.save();
    res.status(200).json({ data: proposalStatus, message: "Proposal Status Created", success: true });
    
  });




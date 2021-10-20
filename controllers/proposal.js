const { AsyncHandler } = require("../middlewares/async");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Proposal = require("../models/proposal");

//create proposal
exports.createProposal = AsyncHandler(async (req, res, next) => {
    const {title,name,description,SupervisorName,co_supervisorName,studentGroup,uploadDoc,year,status} = req.body;
    const proposalName = await Proposal.findOne({ name })
    if (proposalName)
    {
      return res.status(404).json({ status: 'error', error: 'This proposal name already exist with a proposal please try another one' })
    }
    
    const proposal = new Proposal({
        title,
        name,
        description,
        SupervisorName,
        co_supervisorName,
        studentGroup,
        uploadDoc,
        year,
        status

  });
  //for single file upload
    if(req.file){
      proposal.uploadDoc = req.file.path
    }
    await proposal.save();
    res.status(200).json({ data: proposal, message: "Request Submitted", success: true });
  });

//, proposalStatus: {$ne: 'true'}
//get proposals
exports.getProposals = AsyncHandler(async (req, res, next) => {
    const { id: SupervisorName} = req.params;
    //passing query with parameters for years to filter the proposals year wise
    const {year}=req.query
    let query ={}
    if(year) query.year = year
    const proposals = await Proposal.find({SupervisorName, ...query}).select('title name description').populate({path: 'studentGroup', select: 'groupMembers',populate:[{path:'groupMembers'}]})
    res.status(200).json({ data: proposals, message: "All Proposals", success: true });
  });
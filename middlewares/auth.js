const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../controllers/user');
const { AsyncHandler } = require("../middlewares/async");
const User = require("../models/user");
const ErrorResponse = require('../utils/errorResponse');

//protect route
exports.protect = AsyncHandler(async (req, res, next)=>{
    let token 
    const{authorization} = req.headers
    if (authorization && authorization.startsWith('Bearer')){
        token = authorization.split(' ')[1]
    }
    else if (req.cookies.token){
        token = req.cookies.token
    }
    //make sure token exist
    if(!token){
        return next(new ErrorResponse(`Not authorized to access this route`,401))
    }
    try {
        // verify token 
        const decoded = jwt.verify(token, JWT_SECRET )
        req.user = await User.findById(decoded.id).select('+tokens')
        if(!req.user.tokens.includes(token))
        return next(new ErrorResponse(`Not authorized to access this route`,401))

        // req.token = token
        next()
    }
    catch (err){
        return next (new ErrorResponse (`Not authorized to access this route`,401))
    }

})
//grant access to specific roles
exports.authorize = (...roles) => (req, res, next) =>{
    if (!roles.includes(req.user.role)){
        return next (new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403))
    }
    next()
}
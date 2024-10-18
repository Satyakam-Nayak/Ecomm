// use for check role : user or seller so that those route are for user are only for user and those only for seller are only for seller
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require("jsonwebtoken"); //if user donot have token we will notify it
const User = require("../model/user");

exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to constinue",401));
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
})
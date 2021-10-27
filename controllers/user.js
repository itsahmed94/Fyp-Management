const { AsyncHandler } = require("../middlewares/async");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

exports.JWT_SECRET = "sdjkfh8923yhjdksbfma@#*&&^@bhjg839ujkdhfjk";

//register user
exports.userRegister = AsyncHandler(async (req, res, next) => {
  const {
    fullName,
    password: plainTextPassword,
    studentId,
    email,
    role,
    uploadImage,
  } = req.body;
  const userName = await User.findOne({ fullName });

  if (!fullName){
    return res.status(404).json({
      status: "error",
      error: "Please add a username",
    });
    
  }
  if (userName) {
    return res.status(404).json({
      status: "error",
      error: "This username already exist please try another one",
    });
  }
  if (typeof fullName !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 8) {
    return res.status(403).json({
      status: "error",
      error: "Password too small. Should be atleast 8 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);
  const user = new User({
    fullName,
    password,
    studentId,
    email,
    role,
    uploadImage,
  });
  //for single file upload
  if (req.file) {
    user.uploadImage = req.file.path;
  }
  let result = await user.save();
  let data = { ...user._doc };
  delete data.password;
  res
    .status(200)
    .json({ data, success: true, message: "Registered Successfully" });
});

//login users
exports.loginUsers = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const loginUser = await User.findOne({ email }).select("+password +tokens");
  if (!loginUser) {
    return res.json({ status: "error", error: "Invalid email/password" });
  }

  if (await bcrypt.compare(password, loginUser.password)) {
    // the username, password combination is successful

    const token = jwt.sign(
      {
        id: loginUser._id,
        email: loginUser.email,
      },
      this.JWT_SECRET,
      {
        expiresIn: loginUser.role === "student" ? "7d" : "1d",
      }
    );
    // console.log(loginUser)
    if (loginUser.tokens) {
      if (!loginUser.tokens.includes(token))
        loginUser.tokens = [...loginUser.tokens, token];
    } else {
      loginUser.tokens = [token];
    }
    await loginUser.save();
    return res.json({status: "200",data: token,message: "log-in-successfully",});
  }
  // res.status(200).json({ data: loginUser, message: "log-in", success: true });
});

//logging out
exports.logOut = AsyncHandler(async (req, res, next) => {
  const currentUser = await User.findOne({ _id: req.user._id }).select(
    "+tokens"
  );
  currentUser.tokens = [];
  await currentUser.save();
  res.status(200).json({ message: "Log-out", success: true });
});

//password change
exports.changePassword = AsyncHandler(async (req, res, next) => {
  const { password: prevPassword, newPassword } = req.body;
  let userId = req.user._id;
  const user = await User.findById(userId).select("+password");
  const isMatched = await bcrypt.compare(prevPassword, user.password);
  // console.log(isMatched, "matched");
  if (!isMatched) return next(new ErrorResponse("Password Not Match!", 403));

  const password = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ _id: userId }, { $set: { password } });
  res.status(200).json({ message: "password changed", success: true });
});

//get students
exports.getStudents = AsyncHandler(async (req, res, next) => {
  const users = await User.find({ role: "student" });
  res.status(200).json({ data: users, message: "All Students", success: true });
});

//get supervisors
exports.getSupervisors = AsyncHandler(async (req, res, next) => {
  const users = await User.find({ role: "supervisor" });
  res.status(200).json({ data: users, message: "All Students", success: true });
});

//get user by id
exports.getUserById = AsyncHandler(async (req, res, next) => {
  const users = await User.findOne({ _id: req.params.id });
  res
    .status(200)
    .json({ data: users, message: "User has been found", success: true });
});


//update Profile
exports.updateProfile = AsyncHandler(async (req, res, next) => {
  const updatedProfile = await User.updateOne(
    { _id: req.params.id },{$set: {fullName: req.body.fullName,email: req.body.email,uploadImage: req.body.uploadImage,}});
  res.status(200).json({data: updatedProfile,message: "Profile has been updated",success: true,});
});


//delete users by using id
exports.removeUser = AsyncHandler(async (req, res, next) => {
  const removedUser = await User.deleteOne({ _id: req.params.id });
  res.status(200).json({data: removedUser,message: "User has been removed",success: true,});
});

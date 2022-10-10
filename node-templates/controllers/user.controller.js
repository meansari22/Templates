const { StatusCodes } = require("http-status-codes");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const BadRequestError = require("../errors/badRequest.error");
const NotFoundError = require("../errors/notFound.error");
const UnauthenticatedError = require("../errors/unauthorized.error");
const userModel = require("../models/user.model");

const userSignup = async (req, res, next) => {
  try {
    const {
      name: name,
      email: email,
      phoneNo: phoneNo,
      password: password,
    } = req.body;

    if (password === "" || email === "") {
      throw new BadRequestError("Please Provide Email and password");
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      throw new BadRequestError("Please Valid Email");
    }
    if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        phoneNo
      )
    ) {
      throw new BadRequestError("Please Valid Contact Number");
    }

    if ((await userModel.find({ email: email })).length > 0 ? true : false) {
      throw new BadRequestError("Email is already exist");
    }

    if (
      (await userModel.find({ phoneNo: phoneNo })).length > 0 ? true : false
    ) {
      throw new BadRequestError("phoneNo is already exist");
    }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      throw new BadRequestError(
        'Could not create user, please try again.'
      );
     
    }
    let token;
   
    let isCreated = false;
    let resposnseData = {};

    const user = await userModel.create({
      name: name,
      email: email,
      phoneNo: phoneNo,
      password: hashedPassword,
    });
    if (!user) {
      throw new BadRequestError("No User Found");
    } else {
      user.save();
      isCreated = true;
      resposnseData = user;
    }
    try {
        token = jwt.sign(
          { userId: user.id, email:email },
          process.env.EncKey,
          { expiresIn: '1h' }
        );
      } catch (err) {
        throw new BadRequestError(
          'Signing up failed, please try again later.'
        );
      }
    res
      .status(isCreated ? StatusCodes.CREATED : StatusCodes.NOT_ACCEPTABLE)
      .json({
        success: isCreated,
        message: `User Inserted with id: ${resposnseData._id} `,
        user: resposnseData,
        token:token
      });
  } catch (error) {
    next(error);
  }
};
const userlogin = async (req, res, next) => {
  console.log(req)
    const { email, password } = req.body;
  
    let existingUser;
  
    try {
      existingUser = await userModel.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingUser) {
      const error = new NotFoundError(
        'Invalid credentials, could not log you in.'
      );
      return next(error);
    }
  
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      const error = new BadRequestError(
        'Could not log you in, please check your credentials and try again.'
      );
      return next(error);
    }
  
    if (!isValidPassword) {
      const error = new NotFoundError(
        'Invalid credentials, could not log you in.'
      );
      return next(error);
    }
  
    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.EncKey,
        { expiresIn: '1h' }
      );
    } catch (err) {
      const error = new BadRequestError(
        'Logging in failed, please try again later.'
      );
      return next(error);
    }
  
    res.json({
      userId: existingUser.id,
      email: existingUser.email,
      token: token
    });
  };
module.exports = {
  userSignup,
  userlogin
};

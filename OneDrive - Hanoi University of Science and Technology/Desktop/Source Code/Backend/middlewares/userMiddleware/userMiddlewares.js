const User = require("../../models/userModel");
const bycrpt = require("bcryptjs");

//Validate Password before Hashing it
const validatePassword = (req, res, next) => {
  //check for empty request first
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("empty body request");
  }

  let regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );


  //Invalid Password
  if (!regex.test(req.body.password)) {
    return res.status(400).send("Not a Valid Password");
  }
  //Okey Valid Password
  return next();
};

//check password that comes from request is the password that being saved into database.
const checkPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    //compare password
    const isPassword = await bycrpt.compare(
      req.body.oldPassword,
      user.password
    );

    if (isPassword) {
      //right password
      return next();
    } else {
      return res.status(400).send("Sai mật khẩu");
    }
  } catch (error) {
    return res.status(500).send("Lỗi!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  validatePassword,
  checkPassword,
};

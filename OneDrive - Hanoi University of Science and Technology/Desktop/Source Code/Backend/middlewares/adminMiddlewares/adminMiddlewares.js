const Admin = require("../../models/adminModel");
const bycrpt = require("bcryptjs");

//Validate Password before Hashing it.
const validatePassword = (req, res, next) => {
  //check for empty request 
  if (Object.keys(req.body).length === 0)
    return res.status(400).send("empty body request");


  let regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );


  //invalid password (weak password)
  if (!regex.test(req.body.password)) {
    return res.status(400).send("Not a Valid Password");
  }

  //okay valid password
  return next();
};

//check password that comes from request is the password that being saved into database
const checkPassword = async (req, res, next) => {
  try {
    //get admin
    const admin = await Admin.findById(req.body.id);
    //compare password
    const isPassword = await bycrpt.compare(
      req.body.oldPassword,
      admin.password
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

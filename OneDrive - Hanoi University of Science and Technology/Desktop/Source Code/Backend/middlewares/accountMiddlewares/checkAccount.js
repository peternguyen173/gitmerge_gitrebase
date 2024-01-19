const Account = require("../../models/accountModel");

//check account is exist or not.
const checkAccount = async (req, res, next) => {
  //first check (from_id === to_id)?
  if (req.body.from === req.body.to) {
    return res
      .status(400)
      .send("Tài khoản không lợp lệ. Hãy nhập tài khoản khác!.");
  }

  let account;

  try {
    //get account
    account = await Account.findById(req.params.to_id);

    //check for account being exist.
    if (!account) {
      return res
        .status(400)
        .send(
          "Tài khoản bạn gửi tiền đến không có. Hãy đảm bảo bạn nhập đúng số tài khoản!"
        );
    } else {
      //okay valid account to proceed
      return next();
    }
  } catch (error) {
    if (!account) {
      return res
        .status(400)
        .send(
          "Tài khoản bạn gửi tiền đến không có. Hãy đảm bảo bạn nhập đúng số tài khoản!"
        );
    }
    return res.status(500).send("Lỗi!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  checkAccount,
};

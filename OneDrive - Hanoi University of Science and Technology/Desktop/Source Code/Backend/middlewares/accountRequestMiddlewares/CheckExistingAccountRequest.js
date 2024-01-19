const AccountRequest = require("../../models/accountRequestModel");
const User = require("../../models/userModel");

//check user already send an account request or not.
const checkExistingAccountRequest = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // get user information
    const user = await User.findById(userId);

    // check if the user already has 2 accounts
    if (user.accounts.length >= 2) {
      return res
        .status(400)
        .send(
          "Xin lỗi! Bạn đã đạt đến số lượng tài khoản tối đa là 2 tài khoản, không thể thêm nữa!"
        );
    }

    // get account requests
    const accountRequests = await AccountRequest.find({ client_id: userId });

    // check if the user already has an account request
    if (accountRequests.length > 0) {
      return res
        .status(400)
        .send(
          "Xin lỗi! Bạn đã gửi 1 request account, hãy đợi chúng tôi xử lý trước khi tạo request mới!"
        );
    }

    next();
  } catch (error) {
    return res.status(500).send("Lỗi!! Something Went Wrong, Hãy thử lại...");
  }
};

module.exports = {
  checkExistingAccountRequest,
};

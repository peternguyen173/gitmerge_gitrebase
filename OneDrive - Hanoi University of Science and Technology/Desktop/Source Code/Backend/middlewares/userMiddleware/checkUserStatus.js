//check user's status (active, unactive, suspended).
const checkUserStatus = (req, res, next) => {
  //Get user
  const user = req.user;

  //check for (unactive, suspended) status
  if (user.user_status !== 0) {
    return res
      .status(400)
      .send(
        `Tài khoản HUST BANK của bạn đã bị ${user.user_status === 1 ? "Dừng hoạt động" : "Cấm"
        }!, liên hệ hỗ trợ để biết thêm chi tiết.`
      );
  }
  //Okay User status is active
  next();
};

module.exports = {
  checkUserStatus,
};

const AccountRequest = require("../../models/accountRequestModel");
const User = require("../../models/userModel");

//send notification to user 
const sendNotification = async (req, res) => {

  if (req.created) {
    try {
      const user = await User.findById(req.user.id);
      //add notification to user
      user.notifications.push({
        type: "account-request",
        title: "Yêu cầu tạo tài khoản thanh toán",
        message: `Yêu cầu tạo tài khoản thanh toán của bạn đã được gửi thành công.
        Chúng tôi sẽ sớm phản hồi kết quả!`,
        data: [
          {
            account_id: req.created.account_id,
          },
        ],
      });
      user.markModified("notifications");

      //save changes
      const updatedUser = await user.save();
      res.status(200).json({
        name: updatedUser.user_name,
        email: updatedUser.email,
        address: updatedUser.full_addresse,
        id: updatedUser.id,
        accountsCount: updatedUser.no_of_account,
        createdAt: updatedUser.createdAt,
        userStatus: updatedUser.user_status,
        phone: updatedUser.phone,
        accounts: updatedUser.accounts,
        notifications: updatedUser.notifications,
      });
    } catch (error) {
      if (error.message.match(/(notification)/gi)) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Lỗi!! Something Went Wrong, Try again...");
    }
  }

  //case of account request has been approved
  if (req.approved) {
    try {
      const user = await User.findById(req.approved.client_id);
      user.no_of_account += 1;
      user.markModified("no_of_account");
      user.accounts.push(req.approved.account_id);
      user.markModified("accounts");
      //add notification to user
      user.notifications.push({
        type: "approved",
        title: "Tài khoản được chấp nhận!",
        message: `Yêu cầu tài khoản của bạn đã được phê duyệt thành công.

        Bây giờ, bạn có thể (Nạp tiền - Rút tiền - Chuyển khoản) bất kỳ lúc nào bạn muốn.`,
        data: [
          {
            account_id: req.approved.account_id,
          },
        ],
      });
      user.markModified("notifications");

      //save changes
      await user.save();
      //delete account request
      const deletedAccountRequest = await AccountRequest.findByIdAndDelete(
        req.approved.request_id
      );
      res.status(200).json({ id: deletedAccountRequest.id });
    } catch (error) {
      if (error.message.match(/(notification|Profile)/gi)) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Lỗi!! Something Went Wrong, Try again...");
    }
  }

  //case of account request has been declined
  if (req.declined) {
    try {
      //create a notification for declined request
      const user = await User.findById(req.declined.client_id);
      //add notification to user
      user.notifications.push({
        type: "declined",
        title: "Account Declined!",
        message: `We Are Sorry! Your Account Request Has Been Declined!
        If You Want More Details, Please Do Not Hesitate To Contact Us For More Information.`,
        data: [
          {
            initial_balance: req.declined.initial_balance,
          },
        ],
      });
      user.markModified("notifications");

      //save changes
      await user.save();
      //send deleted request id back
      return res.status(200).json({ id: req.declined.deleted_request_id });
    } catch (error) {
      if (error.message.match(/(notification)/gi)) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Lỗi!! Something Went Wrong, Try again...");
    }
  }

  //case of balance transfer
  if (req.transfered) {
    try {
      //create a notification for transfered balance
      const ReceivingUser = await User.findById(
        req.transfered.updatedReceivingAccount.client_id
      );
      //add notification to ReceivingUser
      ReceivingUser.notifications.push({
        type: "transfered-in",
        title: "Biến động số dư!",
        message: `Bạn đã nhận tiền thành công!`,
        data: [
          {
            transfered_Amount: req.transfered.balanceTransfered,
            from: req.transfered.updatedSendingAccount.id,
          },
        ],
      });
      ReceivingUser.markModified("notifications");

      //save changes
      await ReceivingUser.save();
      res.status(200).json(req.transfered.updatedSendingAccount);
    } catch (error) {
      if (error.message.match(/(notification)/gi)) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Lỗi!! Something Went Wrong, Try again...");
    }
  }
};

module.exports = {
  sendNotification,
};

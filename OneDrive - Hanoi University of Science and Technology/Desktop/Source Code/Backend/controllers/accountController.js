const Account = require("../models/accountModel");


const createAccount = async (req, res, next) => {
  try {
    // Kiểm tra số lượng tài khoản đã đạt đến giới hạn hay chưa
    const existingAccountsCount = await Account.countDocuments({
      client_id: req.body.id,
    });

    // Nếu số lượng tài khoản đã đạt đến giới hạn (2), trả về thông báo lỗi
    if (existingAccountsCount >= 2) {
      return res.status(400).send("Người dùng đã đạt đến số lượng tài khoản tối đa.");
    }

    const account = await Account.create({
      client_id: req.body.id,
      balance: req.body.balance,
    });

    // Điều hướng đến thông báo
    req.approved = {
      request_id: req.body.request_id,
      client_id: account.client_id,
      account_id: account.id,
    };
    next();
  } catch (error) {
    if (error.message.match(/(Balance|Account|id)/gi)) {
      return res.status(400).send(error.message);
    }
    res.status(500).send("Lỗi!! Something Went Wrong, Try again...");
  }
};



const getAccount = async (req, res) => {
  let account;
  try {
    account = await Account.findById(req.params.id);
    res.status(200).json(account);
  } catch (error) {
    if (!account) return res.status(404).send("Account Not Found!");
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};


const deleteAccount = async (req, res) => {
  try {
    const deletedAccount = await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: deletedAccount.id });
  } catch (error) {
    res.status(500).send("Lỗi!! Something Went Wrong, Try again...");
  }
};


const transfer = async (req, res, next) => {
  const { balanceTransfered } = req.body;
  try {
    const sendingAccount = await Account.findById(req.params.from_id);

    const receivingAccount = await Account.findById(req.params.to_id);

    //update both users' accounts with new tranfer values
    // 1- balance
    sendingAccount.balance -= +balanceTransfered;
    sendingAccount.markModified("balance");
    receivingAccount.balance += +balanceTransfered;
    receivingAccount.markModified("balance");
    // 2- transfer log >> out (sending user)
    sendingAccount.out.push({
      to: receivingAccount.id,
      balance_transfered: balanceTransfered,
    });
    sendingAccount.markModified("out");
    // 2- transfer log >> in (receiving user)
    receivingAccount.in.push({
      from: sendingAccount.id,
      balance_transfered: balanceTransfered,
    });
    receivingAccount.markModified("in");
    //Save Transfer operation for both users' accounts
    const updatedSendingAccount = await sendingAccount.save();
    const updatedReceivingAccount = await receivingAccount.save();
    //notification
    req.transfered = {
      updatedSendingAccount,
      updatedReceivingAccount,
      balanceTransfered,
    };
    next();
  } catch (error) {
    if (error.message.match(/(transfer|id|Balance|Account)/gi))
      return res.status(400).send(error.message);
    res.status(500).send(" Something Went Wrong, Try again...");
  }
};







module.exports = {
  createAccount,
  deleteAccount,
  getAccount,
  transfer,
};

const Account = require("../../models/accountModel");


const checkBalance = async (req, res, next) => {
  let requestedBalance;
  let accountId;

  if (
    req.body.balanceTransfered <= 0 ||
    req.body.balance < 0
  ) {
    if (req.body.balance)
      return res.status(400).send("Initial Balance Must Be 0 Or More!");
    return res.status(400).send("Please Provide Balance More than 0");
  }

  //check for empty body request
  if (
    !req.body.balanceTransfered &&
    !req.body.balance
  ) {
    return res.status(400).send("empty body request");
  }

  if (req.body.balance) {
    //đi đến next middleware
    return next();
  }



  if (req.body.balanceTransfered) {
    requestedBalance = req.body.balanceTransfered;
    accountId = req.params.from_id;
  }



  try {
    //get account
    const account = await Account.findById(accountId);

    if (account.balance >= requestedBalance) {
      return next();
    } else {
      return res.status(400).send("Balance Not Enough To Make That Proccess!");
    }
  } catch (error) {
    return res.status(500).send("Lỗi!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  checkBalance,
};

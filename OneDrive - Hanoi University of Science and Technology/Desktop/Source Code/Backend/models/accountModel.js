const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

const transferedInSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      require: [true, "Please Provide Sending Account Id!"],
    },
    balance_transfered: {
      type: Number,
      require: [true, "Please Provide Transfered Balance!"],
      min: [50, "  dasdasdsad"],
    },
  },
  {
    timestamps: true,
  }
);

const transferedOutSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      require: [true, "Please Provide Receiving Account Id!"],
    },
    balance_transfered: {
      type: Number,
      require: [true, "Please Provide Transfered Balance!"],
      min: [50, "You Can Not Transfer Balance Less Than 50"],
    },
  },
  {
    timestamps: true,
  }
);


const accountSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      required: [true, "Please Provide Client Id!"],
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, "Balance Can Not Be Less Than 0 !"],
    },
    in: [transferedInSchema],
    out: [transferedOutSchema],

  },
  {
    timestamps: true,
    collection: "Accounts",
  }
);

//Auto sinh ID
accountSchema.plugin(autoIncrement, {
  model: "Account",
  startAt: 202511545300,
  incrementBy: 1,
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;

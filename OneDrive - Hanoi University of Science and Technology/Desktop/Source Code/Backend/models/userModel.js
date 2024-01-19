const mongoose = require("mongoose");
const { notificationSchema } = require("./notificationSchema");
const { autoIncrement } = require("mongoose-plugin-autoinc");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: [true, "Please Type A User Name!"],
      validate: {
        validator: function (v) {
          let regex = new RegExp(
            "^(?=[a-zA-Z0-9._ ]{10,35}$)(?!.*[_.]{2})[^_.].*[^_.]$"

            + "|^[\\p{L}0-9._ ]{10,35}$", "u"

          );
          return regex.test(v);
        },
        message: "Please Enter A Valid User Name!",
      },
    },

    email: {
      type: String,
      required: [true, "Please Type An Email!"],
      unique: true,
      validate: {
        validator: function (v) {
          let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
          return regex.test(v);
        },
        message: "Please Enter A Valid Email!",
      },
    },
    password: {
      type: String,
      required: [true, "Please Type A Password!"],
    },
    phone: {
      type: Number,
      required: [true, "Please Type A Phone Number!"],
      unique: true,

    },

    full_addresse: {
      type: String,
      required: [true, "Please Type An Addresse!"],
    },

    role: {
      type: String,
      default: "Client",
      immutable: true,
    },
    user_status: {
      type: Number,
      default: 0, //active , 1 >> unactive, 2 >>suspended
    },
    no_of_account: {
      type: Number,
      default: 0,
      max: [
        3,
        "Xin lỗi, bạn chỉ được phép đăng ký tối da 3 tài khoản thanh toán!",
      ],
    },
    accounts: [String],
    notifications: [notificationSchema],
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    let dupKeys = Object.keys(error.keyPattern);
    next(new Error(` ${dupKeys} này đã được sử dụng!`));
  } else {
    next();
  }
});

userSchema.post("updateOne", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    let dupKeys = Object.keys(error.keyPattern);
    next(new Error(` ${dupKeys} đã được sử dụng!`));
  } else {
    next();
  }
});

//Auto Increament Users ID Plugin
userSchema.plugin(autoIncrement, {
  model: "User",
  startAt: 20215328,
  incrementBy: 1,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

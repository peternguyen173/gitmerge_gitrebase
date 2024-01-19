const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    admin_name: {
      type: String,
      required: [true, "Please Type your Name!"],
      validate: {
        validator: function (v) {
          let regex = new RegExp(
            "^[a-zA-ZÀ-Ỹà-ỹẠ-Ỷạ-ỵĂ-ẮắẰ-ỲằẮ-ỴẴ-Ỷẵ-ỷĂ-ẰằẮ-Ỹắ-ỹÂ-ẦầẤ-Ỷấ-ỴẪ-Ỵẫ-ỷÊ-ỀềẾ-Ỷế-ỴỄ-Ỵễ-ỷÔ-ỒồỐ-Ỷố-ỴỖ-Ỵỗ-ỷƠ-ỜờỚ-Ỵớ-ỴỠ-Ỷỡ-ỷƠ-ỞởỚ-Ỹớ-ỹƯ-ỪừỨ-Ỵứ-ỴỮ-Ỷữ-ỷĐđ\\s]{1,35}$"
          );
          return regex.test(v);
        },
        message: "Hãy nhập tên đúng!",
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
      required: [true, "Please Type A Strong Password!"],
    },
    role: {
      type: String,
      required: [true, "Please Set The Admin Role!"],
      enum: {
        values: ["admin", "owner"],
        message: "{VALUE} is not supported as a Role",
      },
    },
  },
  {
    timestamps: true,
    collection: "Admins",
  }
);

adminSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    let dupKeys = Object.keys(error.keyPattern);
    next(new Error(` ${dupKeys} này đã được dùng bởi admin khác!`));
  } else {
    next();
  }
});

adminSchema.post("updateOne", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    let dupKeys = Object.keys(error.keyPattern);
    next(new Error(`${dupKeys} này đã được dùng bởi admin khác!`));
  } else {
    next();
  }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

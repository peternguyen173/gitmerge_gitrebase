import React from "react";

//validate name
const validateName = (name) => {
  let regex = new RegExp(
    "^[a-zA-ZÀ-Ỹà-ỹẠ-Ỷạ-ỵĂ-ẮắẰ-ỲằẮ-ỴẴ-Ỷẵ-ỷĂ-ẰằẮ-Ỹắ-ỹÂ-ẦầẤ-Ỷấ-ỴẪ-Ỵẫ-ỷÊ-ỀềẾ-Ỷế-ỴỄ-Ỵễ-ỷÔ-ỒồỐ-Ỷố-ỴỖ-Ỵỗ-ỷƠ-ỜờỚ-Ỵớ-ỴỠ-Ỷỡ-ỷƠ-ỞởỚ-Ỹớ-ỹƯ-ỪừỨ-Ỵứ-ỴỮ-Ỷữ-ỷĐđ\\s]{1,35}$"
  );
  return regex.test(name);
};

//validate password
const validatePassword = (password) => {
  let regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return regex.test(password);
};

export const InputsValidator = ({ nameInput = null, passwordInput = null }) => {
  if (nameInput)
    return (
      <div
        className={`${validateName(nameInput) ? "text-green-600" : "text-red-600"
          } text-xs md:text-sm font-semibold px-2 my-4`}
      >
        <p>Tên phải:</p>
        <p>* Dài ít nhất 10 ký tự.</p>
        <p>* Chỉ chứa những ký tự được phép [a-z A-Z 0-9], các ký tự tiếng Việt.</p>
      </div>
    );

  if (passwordInput)
    return (
      <div
        className={`${validatePassword(passwordInput) ? "text-green-600" : "text-red-600"
          } text-xs md:text-sm font-semibold px-2 my-4`}
      >
        <p>Mật khẩu phải:</p>
        <p>* Dài ít nhất 8 ký tự.</p>
        <p>* Có ít nhất 1 chữ cái thường.[a-z]</p>
        <p>* Có ít nhất 1 chữ cái in hoa.[A-Z]</p>
        <p>* Có ít nhất 1 chữ số.[0-9]</p>
        <p>* Có ít nhất 1 ký tự đặc biệt.[!@#$%^&*]</p>
      </div>
    );
};

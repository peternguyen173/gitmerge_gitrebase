import React from "react";
import { useState, useEffect } from "react";
import { AiFillSlackCircle } from "react-icons/ai";
import { FcDoughnutChart, FcInfo } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserStatus,
  updateUser,
} from "../../../state/features/User/UserData/userSlice";
import FormButton from "../../shared/FormButton";
import MessagesContainer from "../../shared/MessagesContainer";
import { InputsValidator } from "../helpers/InputsValidator";
import { UseResetStatus } from "../../../hooks/UseResetStatus";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const { info, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.userData
  );

  const [fromInputs, setFromInputs] = useState({
    email: info && info.email,
    phone: info && info.phone.toString(),
    address: info && info.address,
    oldPassword: "",
    password: "",
    repeatedPassword: "",
    msg: "",
  });

  const {
    email,
    oldPassword,
    repeatedPassword,
    password,
    address,
    phone,
    postal,
    msg,
  } = fromInputs;

  useEffect(() => {
    if (isError) {
      setFromInputs({ ...fromInputs, msg: message });
    }

    if (isSuccess) {
      setFromInputs({
        ...fromInputs,
        msg: message,
      });
    }
  }, [isError, message, isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetUserStatus());
    setFromInputs({ ...fromInputs, msg: "" });
    if (password !== repeatedPassword) {
      setFromInputs({ ...fromInputs, msg: "password does not match" });
      return;
    }

    const userData = {
      email: email.trim(),
      phone: phone.trim(),
      addresse: address.trim(),
      token: user.token,
      id: user.id,
      password,
      oldPassword,
    };
    dispatch(updateUser(userData));
  };

  UseResetStatus(() => {
    return () => {
      dispatch(resetUserStatus());
    };
  });

  if (info) {
    return (
      <div className="max-w-4xl w-full">
        <h3 className="flex justify-center items-center text-2xl  font-bold text-center px-2 py-4 mb-10 rounded shadow bg-blue-200 border-b-4 border-blue-800">
          <FcDoughnutChart className="ml-1" size={50} />
          Thay đổi thông tin
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={email}
              onChange={(e) =>
                setFromInputs({ ...fromInputs, email: e.target.value })
              }
              placeholder="Nhập email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="oldPassword"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Mật khẩu hiện tại            </label>
            <span className="flex items-center flex-col md:flex-row gap-2 text-sm md:text-base  text-blue-700 mb-2 font-medium">
              <FcInfo size={27} />
              <span>
                Nếu bạn KHÔNG muốn đổi mật khẩu, hãy nhập mật khẩu hiện tại cho cả 3 trường mật khẩu
              </span>
            </span>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={oldPassword}
              onChange={(e) =>
                setFromInputs({ ...fromInputs, oldPassword: e.target.value })
              }
              placeholder="Mật khẩu hiện tại"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Mật khẩu mới            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={password}
              onChange={(e) =>
                setFromInputs({ ...fromInputs, password: e.target.value })
              }
              placeholder="Mật khẩu mới"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="repeatedPassword"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Xác nhận mật khẩu mới            </label>
            <input
              type="password"
              name="repeatedPassword"
              id="repeatedPassword"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={repeatedPassword}
              onChange={(e) =>
                setFromInputs({
                  ...fromInputs,
                  repeatedPassword: e.target.value,
                })
              }
              placeholder="Xác nhận mật khẩu mới"
              required
            />
          </div>

          {/* password validator */}
          <InputsValidator passwordInput={password} />

          <div className="mb-6">
            <label
              htmlFor="phone"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Số diện thoại
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={"0" + phone}
              onChange={(e) =>
                setFromInputs({
                  ...fromInputs,
                  phone: e.target.value,
                })
              }
              placeholder="Số điện thoại"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Địa chỉ            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={address}
              onChange={(e) =>
                setFromInputs({
                  ...fromInputs,
                  address: e.target.value,
                })
              }
              placeholder="Địa chỉ"
              required
            />
          </div>
          <div className="mb-6">

          </div>

          {/*Request Status and Errors*/}
          {msg && (
            <MessagesContainer
              msg={msg}
              isSuccess={isSuccess ? isSuccess : false}
              isError={isError || (msg && !isSuccess) ? true : false}
            />
          )}

          {/*form button */}
          <FormButton
            text={{ loading: "Updating", default: "Update" }}
            isLoading={isLoading}
            icon={<AiFillSlackCircle className="ml-1" size={25} />}
          />
        </form>
      </div>
    );
  } else {
    return null;
  }
}

import moment from "moment";
import React from "react";
import { FcRating } from "react-icons/fc";

export const AccountDetails = ({ account, username }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 px-6 py-8 my-10 bg-blue-200 border-y-4 border-blue-800 rounded shadow">
      <h3 className="w-full flex items-center text-xl my-5 p-3 text-left font-bold   text-blue-900 bg-slate-50 rounded shadow-md">
        <FcRating className="mr-1" size={35} />
        Thông tin tài khoản thanh toán:
      </h3>

      <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
        <p className="w-full lg:w-auto bg-slate-900  px-4 py-2 rounded-md">
          Số tài khoản
        </p>
        <span className="w-full lg:w-auto text-slate-900 bg-white  px-4 py-2 rounded-md">
          {account._id}
        </span>
      </div>
      <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
        <p className="w-full lg:w-auto bg-slate-900  px-4 py-2 rounded-md">
          Chủ tài khoản        </p>
        <span className="w-full lg:w-auto text-slate-900 bg-white  px-4 py-2 rounded-md">
          {username}
        </span>
      </div>

      <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
        <p className="w-full lg:w-auto bg-slate-900  px-4 py-2 rounded-md">
          Ngày đăng ký
        </p>
        <span className="w-full lg:w-auto text-slate-900 bg-white px-4 py-2 rounded-md">
          {moment(account.createdAt).locale('vi').format('DD-MM-YYYY')}
        </span>
      </div>

      <div className=" w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
        <p className=" w-full lg:w-auto bg-slate-900  px-4 py-2 rounded-md">
          Số dư
        </p>
        <span className="w-full lg:w-auto text-slate-900 bg-white px-4 py-2 rounded-md">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(account.balance)}
        </span>
      </div>

      <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
        <p className="w-full lg:w-auto bg-slate-900  px-4 py-2 rounded-md">
          Tổng số tiền đã chuyển        </p>
        <span className="w-full lg:w-auto text-slate-900 bg-white  px-4 py-2 rounded-md">
          {account.out.length > 0
            ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              account.out.reduce(
                (totalAmount, log) => (totalAmount += log.balance_transfered),
                0
              )
            )
            : new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(0)}
        </span>
      </div>

      <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
        <p className="w-full lg:w-auto bg-slate-900  px-4 py-2 rounded-md">
          Tổng số tiền đã nhận        </p>
        <span className="w-full lg:w-auto text-slate-900 bg-white  px-4 py-2 rounded-md">
          {account.in.length > 0
            ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              account.in.reduce(
                (totalAmount, log) => (totalAmount += log.balance_transfered),
                0
              )
            )
            : new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(0)}
        </span>
      </div>
    </div>
  );
};

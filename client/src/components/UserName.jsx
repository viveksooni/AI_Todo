import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import { useFormAction, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";


let renderCount = 0;
function UserName() {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const inputStyle = "p-4 border border-amber-500 rounded-xl ";
  const labelStyle = "font-semibold text-amber-700";
  renderCount++;
  const submitFunction = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-amber-100/50  ">
      <div className="text-5xl font-semibold text-amber-800 capitalize ">
        {" "}
        React hook form {renderCount / 2}
      </div>
      <form
        className="flex flex-col gap-4 max-w-full w-[30%] justify-center border border-amber-600 rounded-md shadow-2xl p-8"
        onSubmit={handleSubmit(submitFunction)}
        noValidate
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className={labelStyle}>
            UserName
          </label>
          <input
            type="text"
            className={inputStyle}
            id="username"
            {...register("username", { required: "username is required" })}
          />
          <p className="text-red-600 font-semibold">
            {errors.username?.message}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>

          <input
            type="email"
            className={inputStyle}
            id="email"
            {...register("email", {
              required: { value: true, message: "email is required" },
            })}
          />
          <p className="text-red-600 font-semibold">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <input
            type="password"
            className={inputStyle}
            id="password"
            {...register("password", {
              required: { value: true, message: "password required" },
            })}
          />
          <p className="text-red-600 font-semibold">
            {errors.password?.message}
          </p>
        </div>

        <button
          type="submit"
          className="bg-amber-900 p-4 w-full rounded-md text-amber-300 hover:bg-amber-800"
        >
          Submit
        </button>
      </form>
      <DevTool control={control}></DevTool>
    </div>
  );
}
export default UserName;

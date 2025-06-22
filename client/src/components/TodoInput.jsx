import React, { useRef } from "react";
import AuthenticatorCom from "./AuthenticatorCom";
import { ClerkLoaded, ClerkLoading, useAuth } from "@clerk/clerk-react";
import { PropagateLoader } from "react-spinners";
import UseTodoContext from "../lib/Hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerCom } from "./DatePickerCom";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Input } from "./ui/input";

export default function TodoInput() {
  const { error, setError, handleTodoSubmit ,register,control,handleSubmit,formState,errors} = UseTodoContext();

  const inputRef = useRef();

  
  return (
    <div className=" border-l-2  relative border-gray-100  bg-[#e8e2dc]/20 w-full md:w-[35%] px-2 flex flex-col justify-between py-1 order-1">
      <div className="max-h-[500px]   ">
        <p className="text-sm font-semibold mt-4 mb-2">Add a todo</p>
        <form
          className="flex md:flex-col flex-row md:gap-3 gap-2 flex-wrap"
          onSubmit={handleSubmit(handleTodoSubmit)}
          noValidate
        >
          {/* title input */}
          <div className="flex flex-col gap-1">
            <input
              id="title"
              ref={inputRef}
              type="text"
              {...register("title", { required: "Todo title is required" })}
              className={`border-1  border-[#e8e2dc] bg-zinc-50 text-sm rounded-md w-full p-2 outline-none  shadow-[0_0_0_0_transparent]   transition-[box-shadow,border]  ${
                error
                  ? "animate-shake border-red-500 shadow-[0px_0px_20px] shadow-red-700"
                  : "focus:border-2 focus:border-stone-200  focus:shadow-[0_0_10px_1px] focus:shadow-stone-500/50   transition-all "
              }`}
              onAnimationEnd={() => setError(false)}
              placeholder="Todo here"
            />
            <p className="text-xs text-red-600 font-semibold ml-1">
              {errors.title?.message}
            </p>
          </div>

          {/* description input */}
          <div className="flex flex-col gap-1">
            <textarea
              type="text"
              maxLength={200}
              rows={3}
              {...register("description", {
                required: "Todo Description is required",
              })}
              className={`border-1 max-h-25 border-[#e8e2dc] text-sm bg-zinc-50 rounded-md w-full p-2 outline-none transition-colors ${
                errors.description
                  ? "animate-shake border-red-500  shadow-red-700"
                  : "focus:border-2 focus:border-stone-200  focus:shadow-[0_0_10px_1px] focus:shadow-stone-500/50 shadow-[0_0_0_transparent] "
              }`}
              onAnimationEnd={() => setError(false)}
              placeholder="Todo description"
            />
            <p className="text-xs text-red-600 font-semibold ml-1">
              {errors.description?.message}
            </p>
          </div>

          {/* priority input  */}
          <div className="flex flex-col gap-1">
            <Controller
              name="priority"
              control={control}
              rules={{
                required: "Priority is required",
                validate: (value) =>
                  ["1", "2", "3"].includes(value) || "Invalid priority",
              }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px] bg-zinc-50">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Low</SelectItem>
                    <SelectItem value="2">Medium</SelectItem>
                    <SelectItem value="3">High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            ></Controller>
            <p className="text-xs text-red-600 font-semibold ml-1">
              {errors.priority?.message}
            </p>
          </div>

          {/* Date Input  */}
          <div className="flex flex-col gap-1">
            <Controller
              control={control}
              name="dueDate"
              rules={{
                required: "Due date is required",
                validate: (value) =>
                  value > new Date() || "Date cannot be in the past",
              }}
              render={({ field }) => (
                <DatePickerCom
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
            <p className="text-xs text-red-600 font-semibold ml-1">
              {errors.dueDate?.message}
            </p>
          </div>

          <button className="w-full rounded-md bg-stone-700 hover:bg-stone-600 text-white p-2 mt-2">
            Add Todo
          </button>
          <DevTool control={control}></DevTool>
        </form>
      </div>

      <ClerkLoading>
        <div className="absolute bottom-0 right-40 flex items-center justify-center mb-10">
          <PropagateLoader size={15} className="opacity-20" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <AuthenticatorCom></AuthenticatorCom>
      </ClerkLoaded>
    </div>
  );
}

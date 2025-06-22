import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import { Header } from "./Header";
import Footer from "./Footer";

import { useAuth } from "@clerk/clerk-react";

import UseTodoContext from "../lib/Hooks";

export default function Todo() {
  const { getTodo } = UseTodoContext();
  const { userId, isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    getTodo();
  }, [userId]);

  return (
    <div className="flex justify-center items-center bg-orange-100 min-h-screen relative">
      <div className="text-9xl  select-none text-zinc-300/20 absolute font-bold top-12 tracking-widest hover:-translate-y-10 transition-all duration-1000">
        TODO APP
      </div>
      <div className=" relative w-full max-w-4xl bg-zinc-50 md:h-[525px] h-[1000px] m-4 md:m-2 lg:m-0 z-10 flex flex-col rounded-xl shadow-lg">
        <Header></Header>
        <div className="flex md:flex-row flex-col flex-1 ">
          <TodoList></TodoList>

          <TodoInput></TodoInput>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

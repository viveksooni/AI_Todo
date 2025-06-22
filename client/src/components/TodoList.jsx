import NoTodo from "./NoTodo";
import React from "react";
import UseTodoContext from "../lib/Hooks";
import { useAuth } from "@clerk/clerk-react";
import LoadingScreen from "./LoadingScreen";
import TodoListShow from "./TodoListShow";

export default function TodoList() {
  const { loading, todoList } = UseTodoContext();
  const { isLoaded } = useAuth();

  return loading || !isLoaded ? (
    <LoadingScreen />
  ) : todoList.length == 0 ? (
    <NoTodo></NoTodo>
  ) : (
    <TodoListShow></TodoListShow>
  );
}

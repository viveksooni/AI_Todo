import React, { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";

export default function UseTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("no context found");
  }
  return context;
}

import { MoreVertical, X } from "lucide-react";

import { DialogDemo } from "./DialogDemo";
import UseTodoContext from "../lib/Hooks";
export default function TodoItem({ todo }) {
  const { handleDeleteTodo, handleDoubleClick } = UseTodoContext();
  return (
    <div
      onDoubleClick={() => {
        handleDoubleClick(todo.id);
      }}
      key={todo.id}
      className={`p-4 capitalize select-none  border-b-2 border-gray-100 flex justify-between items-center transition-all duration-300 ${
        todo.status ? " bg-gray-400/20 text-gray-500 " : "hover:bg-[#e8e2dc]/30"
      }`}
    >
      <div
        className={`flex gap-2 flex-col max-w-[60%] ${
          todo.status ? "line-through" : ""
        }`}
      >
        <span className=" truncate ">{todo.title}</span>
        <span className="truncate text-xs text-neutral-400 italic ">
          {todo.description}
        </span>
      </div>

      <div className="flex gap-2 justify-center items-center">
        <div
          className={`text-xs p-2 px-3  rounded-full mr-10  ${
            todo.priority == 3
              ? "bg-red-100 text-red-500 "
              : todo.priority == 2
              ? "bg-amber-200 text-amber-600"
              : "bg-green-100 text-green-500"
          }`}
        >
          {todo.priority == 1 ? "Low" : todo.priority == 2 ? "Medium" : "High"}
        </div>
        <div
          className="text-red-600/80 hover:text-red-700 cursor-pointer  hover:scale-110 hover:bg-gray-100 rounded-full p-1 transition-all duration-300"
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
        >
          <X size={20} strokeWidth={4} />
        </div>
        <DialogDemo todo={todo}>
          <div
            className=" cursor-pointer text-gray-500/40 hover:text-gray-500/80 hover:scale-110 hover:bg-gray-100 rounded-full p-1 transition-all duration-300"
            onClick={() => {}}
          >
            <MoreVertical size={20} strokeWidth={3} />
          </div>
        </DialogDemo>
      </div>
    </div>
  );
}

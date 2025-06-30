import { Circle } from "./Circle";
import toast from "react-hot-toast";
import UseTodoContext from "../lib/Hooks";
import { Button } from "./ui/button";
import { GenAiButton } from "./GenAiButton";

export const Header = () => {
  const { todoList, CountCompletedTask, setSortBy, sortBy } = UseTodoContext();
  return (
    <div className="bg-[#e8e2dc]/30 min-h-12 flex justify-between px-6 items-center shadow-xs">
      <div
        className="flex gap-2 justify-center items-center "
        // onClick={() => toast.error("don't touch that", {})}
      >
        <Circle></Circle>
        <Circle></Circle>
        <Circle></Circle>
        <GenAiButton></GenAiButton>
        <div
          className={`text-xs bg-gray-200 px-2 py-2 rounded-full cursor-pointer text-gray-500 ${
            sortBy == "HighToLow" ? "border-2 border-black" : ""
          } `}
          onClick={() => {
            setSortBy((prev) =>
              prev === "HighToLow" ? "createdAt" : "HighToLow"
            );
          }}
        >
          {" "}
          priority Low to High
        </div>
        <div
          className={`text-xs bg-gray-200 px-2 py-2 rounded-full cursor-pointer text-gray-500 ${
            sortBy == "lowToHigh" ? "border-2 border-black" : ""
          } `}
          onClick={() => {
            setSortBy((prev) =>
              prev === "lowToHigh" ? "createdAt" : "lowToHigh"
            );
          }}
        >
          {" "}
          priority High to Low
        </div>
      </div>
      <div className="text-sm opacity-40">
        {todoList && todoList?.length == 0 ? (
          <span className="font-semibold">No Todos</span>
        ) : (
          <div>
            <strong>{CountCompletedTask()}</strong> / {todoList.length} Todos
            completed
          </div>
        )}
      </div>
    </div>
  );
};

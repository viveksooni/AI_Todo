import UseTodoContext from "../lib/Hooks";
import TodoItem from "./TodoItem";

export default function TodoListShow() {
  const { todoList } = UseTodoContext();

  return (
    <>
      <div className="md:w-[65%] w-full md:order-1 order-2 h-[475px]">
        <div className="flex flex-col  h-full overflow-y-auto">
          {todoList.map((todo) => (
            <TodoItem todo={todo} key={todo.id}></TodoItem>
          ))}
        </div>
      </div>
    </>
  );
}

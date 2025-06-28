import { SignIn, useAuth } from "@clerk/clerk-react";
import { createContext, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
export const TodoContext = createContext(null);
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import api from "@/lib/axiosConfig";

export default function TodoContextProvider({ children }) {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId, isSignedIn } = useAuth();
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  //React hook From
  const form = useForm();
  const { register, control, handleSubmit, formState, setValue, getValues } =
    form;
  const { errors } = formState;
  const navigate = useNavigate();

  const triggerError = () => {
    setError(true);
  };

  const SortBasedOn = () => {
    setTodoList((prev) => {
      switch (sortBy) {
        case "HighToLow":
          return PriorityHighToLowSort(prev);
        case "lowToHigh":
          return PriorityLowToHigh(prev);
        case "createdAt":
          return [...prev].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
        default:
          return prev;
      }
    });
  };

  useEffect(() => {
    if (!isSignedIn && todoList.length !== 0) {
      setTodoList([...JSON.parse(localStorage.getItem("localTodo"))]);
    }
    SortBasedOn();
  }, [sortBy]);

  const PriorityHighToLowSort = (list) => {
    return [...list].sort((a, b) => a.priority - b.priority);
  };
  const PriorityLowToHigh = (list) => {
    return [...list].sort((a, b) => b.priority - a.priority);
  };

  const handleTodoSubmit = async (data) => {
    if (!isSignedIn) {
      //toast msg for sign in to add more todos

      if (todoList.length >= 3) {
        toast((t) => {
          return (
            <div>
              Sign in to add more...{" "}
              <Button
                onClick={() => {
                  navigate("/sign-in");
                  toast.dismiss();
                }}
                className=" font-semibold ml-2 text-white bg-stone-700 hover:bg-stone-600 cursor-pointer"
              >
                SignIn
              </Button>
            </div>
          );
        });
        triggerError();
        return;
      }
      const localTodo = JSON.parse(localStorage.getItem("localTodo") || "[]");

      const newTodo = { ...data, id: Date.now(), isLocal: true };

      localStorage.setItem(
        "localTodo",
        JSON.stringify([...localTodo, newTodo])
      );

      setTodoList((prev) => [...prev, newTodo]);
    } else {
      try {
        const response = await api.post("/todos/createTodo", {
          ...data,
          clerkUserId: userId,
          dueDate: data.dueDate ? format(data.dueDate, "yyyy-MM-dd") : null,
        });

        setTodoList((prev) => {
          const newList = [...prev, response.data];
          return newList;
        });
        SortBasedOn();
      } catch (e) {
        toast.error(e.message);
      }
    }
  };
  const CountCompletedTask = () => {
    const completedTask = todoList.filter((todo) => todo.status).length;
    return completedTask;
  };

  const getTodo = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const response = await api.get(`/todos/${userId}`);

      if (response.data) {
        setTodoList(response.data);
      } else {
        setTodoList([]);
      }
    } catch (e) {
      toast.error("Failed to fetch todos: " + (e.message || "Unknown error"));
      setTodoList([]);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteTodo = async (id) => {
    if (!isSignedIn && todoList.length !== 0) {
      const newTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(newTodoList);
      localStorage.setItem("localTodo", JSON.stringify(newTodoList));
      return;
    }

    try {
      const deleteTodo = await api.delete(`todos/${id}`);

      if (deleteTodo.statusText !== "OK") {
        toast.error("Not able to delete Todo");
        return;
      }
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } catch (e) {
      toast.error("something unbelievable happened:" + e);
    }
  };
  const handleDoubleClick = async (id) => {
    if (!isSignedIn && todoList.length !== 0) {
      const newTodoList = todoList.map((todo) =>
        todo.id == id ? { ...todo, status: !todo.status } : todo
      );
      setTodoList(newTodoList);
      localStorage.setItem("localTodo", JSON.stringify(newTodoList));
      return;
    }

    try {
      const updated = await api.put("/todos/markComplete", {
        todoId: id,
      });

      if (!updated.data) {
        toast.error("not able to process request");
        return;
      }
      setTodoList(
        todoList.map((todo) =>
          todo.id === id ? { ...todo, status: !todo.status } : todo
        )
      );
    } catch (e) {
      toast.error(e?.error || "some thing happened");
    }
  };
  return (
    <TodoContext.Provider
      value={{
        todoList,
        sortBy,
        setSortBy,
        setTodoList,
        handleDeleteTodo,
        handleDoubleClick,
        getTodo,
        CountCompletedTask,
        setLoading,
        loading,
        error,
        setError,
        handleTodoSubmit,
        register,
        control,
        handleSubmit,
        formState,
        errors,
        getValues,
        setValue,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

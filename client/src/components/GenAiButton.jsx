import React, { useContext } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { TodoContext } from "@/Context/TodoContext";
import api from "@/lib/axiosConfig";

export const GenAiButton = () => {
  const { getValues, setValue } = useContext(TodoContext);
  const handleClick = async () => {
    if (getValues("title") == "") {
      console.log("title can not be empty");
      return;
    }
    const response = await api.post("/ai/getDescription", {
      title: getValues("title"),
    });
    console.log(response.data.description);
    setValue("description", response.data.description);
  };
  return <Button onClick={handleClick}>generate description</Button>;
};

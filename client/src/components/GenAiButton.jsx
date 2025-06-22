import React, { useContext } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { TodoContext } from "@/Context/TodoContext";

export const GenAiButton = () => {
  const { getValues, setValue } = useContext(TodoContext);
  const handleClick = async () => {
    if (getValues("title") == "") {
      console.log("title can not be empty");
      return;
    }
    const response = await axios.post("/api/ai/getDescription", {
      title: getValues("title"),
    });
    console.log(response.data.description);
    setValue("description", response.data.description);
  };
  return <Button onClick={handleClick}>generate description</Button>;
};

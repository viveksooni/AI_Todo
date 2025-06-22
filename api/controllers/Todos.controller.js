import { prisma } from "../lib/db.js";
export const createTodo = async (req, res) => {
  try {
    const { title, description, clerkUserId, priority, dueDate } = req.body;
    const newTodo = await prisma.todoItems.create({
      data: {
        title,
        description,
        clerkUserId,
        priority: Number(priority),
        dueDate: new Date(dueDate),
      },
    });

    return res.status(200).json(newTodo);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
};

export const getTodos = async (req, res) => {
  try {
    const clerkUserId = req.params.userId;
    console.log(`request from ${clerkUserId}`);
    const todosList = await prisma.todoItems.findMany({
      where: {
        clerkUserId,
      },
    });

    if (!todosList) {
      return res.status(500).json({ msg: "no todo" });
    }
    return res.status(200).json(todosList);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export const deleteTodos = async (req, res) => {
  try {
    const id = Number(req.params.todoId);
    const deletedTodo = await prisma.todoItems.delete({ where: { id } });
    if (!deletedTodo) {
      return res.status(404).json({ error: "not found the todo" });
    }
    return res.status(200).json(deletedTodo);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
};

export const markComplete = async (req, res) => {
  try {
    const id = Number(req.body.todoId);

    const currentTodo = await prisma.todoItems.findUnique({
      where: { id },
    });

    if (!currentTodo) {
      res.status(404).json({ error: "no do was found" });
    }
    const updatedTodo = await prisma.todoItems.update({
      where: { id },
      data: { status: !currentTodo.status },
    });

    res.status(200).json(updatedTodo);
  } catch (e) {
    res.status(500).json(e);
  }
};

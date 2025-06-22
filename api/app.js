import express from "express";
import {
  clerkMiddleware,
  requireAuth,
  getAuth,
  clerkClient,
} from "@clerk/express";
import cors from "cors";
import dotenv from "dotenv";
import { TodoRouter } from "./routes/todo.routes.js";
import { AiRouter } from "./routes/ai.routes.js";

const app = express();

app.use(clerkMiddleware());
dotenv.config();
app.use(cors());
app.use(express.json());
const Port = process.env.PORT || 5000;
const router = express.Router();

app.get("/api/userName", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const user = await clerkClient.users.getUser(userId);

  return res.json({ user });
});

app.listen(Port, () => {
  console.log(`Server running at ${Port}`);
});

router.use("/api/todos", TodoRouter);
router.use("/api/ai",AiRouter)
app.use(router);

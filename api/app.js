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
app.use(cors({
  origin: [
    'http://localhost:3000', // for local development
    'https://ai-todo-pi.vercel.app  ' // your Vercel domain
  ],
  credentials: true
}));
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

router.use("/todos", TodoRouter);
router.use("/ai",AiRouter)
app.use(router);

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Clock, Calendar, CheckCircle2 } from "lucide-react";

export function DialogDemo({ children, todo }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div variant="outline">{children}</div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span>{todo.title}</span>
            {todo.status && (
              <CheckCircle2 className="text-green-500" size={20} />
            )}
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            {todo.description || "No description provided"}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} />
              <Label>Created: {formatDate(todo.createdAt)}</Label>
            </div>
            {todo.dueDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={16} />
                <Label>Due: {formatDate(todo.dueDate)}</Label>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Label>Priority:</Label>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  todo.priority === 1
                    ? "bg-red-100 text-red-700"
                    : todo.priority === 2
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {todo.priority === 1
                  ? "High"
                  : todo.priority === 2
                  ? "Medium"
                  : "Low"}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

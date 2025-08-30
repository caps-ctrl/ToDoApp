import { Label } from "@radix-ui/react-label";
import { StatusPop } from "@/components/StatusPop";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Status } from "../app/types/Status";
import type { Tags } from "@/app/types/Tags";
import { TagsPop } from "./TagsPop";

import { useDispatch } from "react-redux";
import { addNewTask } from "@/features/TaskSlice/TaskSlice";
import { z } from "zod";

const TaskScheme = z.string().min(1, "wymagany chociaz znak cwelu");
type AddTaskProps = {
  onClose: () => void;
};

type TaskType = z.infer<typeof TaskScheme>;

const AddTask = ({ onClose }: AddTaskProps) => {
  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyboardEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent);
    };
  }, [onClose]);

  const [tag, setTag] = useState<Tags | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [task, setTask] = useState<TaskType>();
  const dispatch = useDispatch();

  const addTaskHandle = () => {
    dispatch(
      addNewTask({
        id: 1,
        status: status?.status,
        Task: task,
        tag: tag?.tag,
      })
    );
    onClose();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-stone-900/90">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTaskHandle();
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Add Task</CardTitle>
            <CardDescription>Add task to your container</CardDescription>
            <CardAction>
              {" "}
              <Button className="mx-1" type="submit">
                {" "}
                Add Task
              </Button>
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => onClose()}
              >
                Cancel
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="px-8">
              <div>
                {" "}
                <Label>Task:</Label>
                <Input
                  className="caret-black"
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTask(e.target.value)
                  }
                />
              </div>
              <div className="p-4 flex justify-evenly items-center">
                <StatusPop selectedStatus={status} onChange={setStatus} />

                <TagsPop selectedTag={tag} onChange={setTag} />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AddTask;

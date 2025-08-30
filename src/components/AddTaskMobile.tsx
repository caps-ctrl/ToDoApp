"use client";
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
type AddTaskMobileProps = {
  onClose: () => void;
};
type TaskType = z.infer<typeof TaskScheme>;

export const AddTaskMobile = ({ onClose }: AddTaskMobileProps) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState<TaskType>();
  const [status, setStatus] = useState<Status | null>(null);
  const [tag, setTag] = useState<Tags | null>(null);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [onClose]);

  const handleAddTask = () => {
    dispatch(
      addNewTask({
        id: 1,
        Task: task,
        status: status?.status,
        tag: tag?.tag,
      })
    );
    onClose();
  };

  return (
    <div className="w-screen h-screen bg-stone-900/90">
      <div className="fixed inset-0 z-50 flex justify-center items-center ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTask();
          }}
          className=" "
        >
          <Card>
            <CardHeader>
              <CardTitle>Add Task</CardTitle>
              <CardDescription>Add task to your container</CardDescription>
              <CardAction className="flex flex-col gap-2 mt-2 sm:flex-row sm:justify-end">
                <Button type="submit" className="w-full sm:w-auto">
                  Add Task
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onClose}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 px-4 sm:px-8">
                <div className="flex flex-col">
                  <Label>Task:</Label>
                  <Input
                    required
                    className="w-full"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setTask(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <StatusPop selectedStatus={status} onChange={setStatus} />
                  <TagsPop selectedTag={tag} onChange={setTag} />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

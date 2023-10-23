"use client";

import { useState } from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";

import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { useStore } from "@/stores/StoreProvider";

const AddTask = observer(() => {
  const { taskStore } = useStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const addTasks = async(newTask: any) => {
    try {
      const { data } = await axios.post('/api/task', newTask);
      taskStore.addTask(data.task);
    } catch(e) {
      setError(e.message);
    }
    setLoading(false);   
  } 

  const handleNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);   
    if (name.length < 3) {
      setError("Please enter a title with at least 3 characters");
    } else if (description.length < 3) {
      setError("Please enter a description with at least 3 characters");
    } else {
      const newTask = {
        name,
        description,
        status,
      };

      addTasks(newTask);
      // Reset the input values
      setName("");
      setDescription("");
      setStatus(undefined);
      setError("");
      setOpen(!open);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button variant="default">Add New Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Task</DialogTitle>
          <DialogDescription>
            Add a new Task to your TO Do App here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleNewTask}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label
                htmlFor="name"
                className="text-left"
              >
                Title
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label
                htmlFor="description"
                className="text-left"
              >
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label
                htmlFor="status"
                className="text-left"
              >
                Status
              </Label>
              <Select
                value={status}
                onValueChange={setStatus}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Task Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TO_DO">To Do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="DONE">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && (
              <p className="text-center py-1 rounded bg-error-background text-error-foreground">
                {error}
              </p>
            )}
            {loading && (
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Save Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default AddTask;

"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { types, Instance, applySnapshot } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import Task from "./Task";
import AddTask from "./AddTask";
import TaskFilter from "./TaskFilter";
import { useStore } from "@/stores/StoreProvider";
import { TaskModel, updateTaskStoreWithSnapshot } from "@/stores/TaskStore";
import axios from "axios";

const TaskList = observer(() => {
  const { taskStore } = useStore();
  const searchParams = useSearchParams();
  const tasksFilter = searchParams.get("tasks");
  const [ loading, setLoading ] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const fetchTasks = async() => {
    try {
      const { data } = await axios.get('/api/tasks');
      applySnapshot(taskStore.tasks, data.tasks)
    } catch(e) {
      setError(e.message);
    }
    setLoading(false);   
  } 

  useEffect(() => {
    setLoading(true);
    fetchTasks();
  },[])

  //@ts-ignore
  let filteredTasks: types.Array<Instance<typeof TaskModel>> = taskStore.tasks;

  if (tasksFilter === "TO_DO") {
    filteredTasks = taskStore.tasks.filter((task) => task.status === "TO_DO");
  } else if (tasksFilter === "IN_PROGRESS") {
    filteredTasks = taskStore.tasks.filter(
      (task) => task.status === "IN_PROGRESS"
    );
  } else if (tasksFilter === "DONE") {
    filteredTasks = taskStore.tasks.filter(
      (task) => task.status === "DONE"
    );
  }

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8 sm:mb-14">
        <h2 className="text-2xl font-semibold">
          All {" "}
          {tasksFilter === "TO_DO"
            ? "To Do"
            : tasksFilter === "IN_PROGRESS"
            ? "In Progress"
            : tasksFilter === "DONE"
            ? "Completed"
            : ""}{" "}
          Tasks
        </h2>
        <AddTask />
      </div>

      <TaskFilter />

      <div className="flex flex-col gap-2 px-4 py-5 max-h-[600px] overflow-auto">
        {filteredTasks.map((task: any) => (
          <Task
            key={task._id}
            id={task._id}
            title={task.name}
            description={task.description}
            status={task.status}
          />
        ))}
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
  );
});

export default TaskList;

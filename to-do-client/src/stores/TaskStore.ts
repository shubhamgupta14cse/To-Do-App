import { types, Instance, SnapshotIn, onSnapshot } from "mobx-state-tree";

export const TaskModel = types.model("Task", {
  _id: types.identifier,
  name: types.string,
  description: types.string,
  status: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  __v: types.number
});

export const TaskStore = types
  .model("TaskStore", {
    tasks: types.optional(types.array(TaskModel), []),
  })
  .actions((self) => {
    return {
      addTask(task: SnapshotIn<typeof TaskModel> | Instance<typeof TaskModel>) {
        self.tasks.push(task);
      },
      editTask(
        id: string,
        editedTask: { name: string; description: string; status: string }
      ) {
        const task = self.tasks.find((task) => task._id === id);
        if (task) {
          task.name = editedTask.name;
          task.description = editedTask.description;
          task.status = editedTask.status;
        }
      },
      deleteTask(taskId: string) {
        const taskIndex = self.tasks.findIndex((task) => task._id === taskId);
        if (taskIndex !== -1) {
          self.tasks.splice(taskIndex, 1);
        }
      },
    };
  });


export let taskStore = TaskStore.create({
  tasks: [],
});

// Function to update the store with the initial snapshot
export function updateTaskStoreWithSnapshot(snapshot: any) {
  taskStore = TaskStore.create(snapshot);
}


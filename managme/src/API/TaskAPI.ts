import type { Task } from "../Models/Task";

const TASKS_KEY = 'tasks';

export const TaskAPI = {
  getAllTasks(): Task[] {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  },

  getTaskById(id: string): Task | undefined {
    return this.getAllTasks().find((t) => t.id === id);
  },

  update(task: Task): void {
    const tasks = this.getAllTasks().map((t) => (t.id === task.id ? task : t));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },

  delete(id: string): void {
    const tasks = this.getAllTasks().filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },

  add(task: Task): void {
    const tasks = this.getAllTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    
  },
  
};



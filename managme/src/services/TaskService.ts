import type { Task, TaskStatus } from "../models/Task";

const TASKS_KEY = "managme_tasks";

class TaskService {
  private getAllInternal(): Task[] {
    const data = localStorage.getItem(TASKS_KEY);
    if (!data) {
      localStorage.setItem(TASKS_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(data);
  }

  private save(tasks: Task[]) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }

  getAll(): Task[] {
    return this.getAllInternal();
  }

  getById(id: string): Task | undefined {
    return this.getAllInternal().find((t) => t.id === id);
  }

  getByStory(storyId: string): Task[] {
    return this.getAllInternal().filter((t) => t.storyId === storyId);
  }

  create(task: Task): void {
    const tasks = this.getAllInternal();

    if (task.status !== "todo") {
      throw new Error("New task must start with status 'todo'");
    }

    tasks.push(task);
    this.save(tasks);
  }

  update(updatedTask: Task): void {
    const tasks = this.getAllInternal();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);

    if (index === -1) {
      throw new Error("Task not found");
    }

    this.validateTask(updatedTask);
    tasks[index] = updatedTask;
    this.save(tasks);
  }

  delete(id: string): void {
    const tasks = this.getAllInternal().filter((t) => t.id !== id);
    this.save(tasks);
  }

  private validateTask(task: Task) {
    if (task.status === "todo") {
      if (task.assignedUserId || task.startedAt || task.finishedAt) {
        throw new Error("Todo task cannot have assigned user or dates");
      }
    }

    if (task.status === "doing") {
      if (!task.assignedUserId || !task.startedAt) {
        throw new Error("Doing task must have assigned user and start date");
      }
      if (task.finishedAt) {
        throw new Error("Doing task cannot have finish date");
      }
    }

    if (task.status === "done") {
      if (!task.assignedUserId || !task.finishedAt) {
        throw new Error("Done task must have assigned user and finish date");
      }
    }
  }
}

export const taskService = new TaskService();

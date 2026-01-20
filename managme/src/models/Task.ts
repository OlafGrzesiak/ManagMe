export type TaskStatus = "todo" | "doing" | "done";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;

  name: string;
  description: string;
  priority: TaskPriority;

  storyId: string;          // ID historyjki
  estimatedHours: number;   // przewidywany czas wykonania

  status: TaskStatus;

  createdAt: string;        // data dodania
  startedAt?: string;       // ustawiana przy przejściu na "doing"
  finishedAt?: string;      // ustawiana przy przejściu na "done"

  assignedUserId?: string;  // devops / developer
};

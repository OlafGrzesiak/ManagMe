export type TaskState = "todo" | "doing" | "done";
export type Priority = "niski" | "średni" | "wysoki";

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  storyId: string;
  estimatedTime: number;
  createdAt: string;
  state: TaskState;
  startDate?: string;
  endDate?: string;
  assignedUserId?: string;
}

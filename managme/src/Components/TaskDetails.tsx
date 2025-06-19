import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskAPI } from "../API/TaskAPI";
import { UserAPI } from "../API/UserAPI";
import type { Task } from "../Models/Task";
import type { User } from "../Models/User";
import type { TaskState } from "../Models/Task";


export const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);

  useEffect(() => {
    const foundTask = TaskAPI.getTaskById(id!);
    if (foundTask) {
      setTask(foundTask);
    }

    const users = UserAPI.getAllUsers().filter(
      (u: { role: string; }) => u.role === "developer" || u.role === "devops"
    );
    setAvailableUsers(users);
  }, [id]);

  const handleAssign = (userId: string) => {
    if (!task) return;

    const updated = {
      ...task,
      assignedUserId: userId,
      state: "doing" as TaskState,
      startDate: new Date().toISOString(),
    };
    TaskAPI.update(task);
    setTask(updated);
  };

  const markAsDone = () => {
    if (!task) return;

    const updated = {
      ...task,
      state: "done" as TaskState,
      endDate: new Date().toISOString(),
    };
    TaskAPI.update(task);
    setTask(updated);
  };

  if (!task) return <p className="p-4">Nie znaleziono zadania</p>;

  const assignedUser = UserAPI.getUserById(task.assignedUserId || "");

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{task.name}</h1>
      <p><strong>Opis:</strong> {task.description}</p>
      <p><strong>Priorytet:</strong> {task.priority}</p>
      <p><strong>Historyjka:</strong> {task.storyId}</p>
      <p><strong>Przewidywany czas:</strong> {task.estimatedTime}h</p>
      <p><strong>Stan:</strong> {task.state}</p>
      <p><strong>Data dodania:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      {task.startDate && <p><strong>Start:</strong> {new Date(task.startDate).toLocaleString()}</p>}
      {task.endDate && <p><strong>Koniec:</strong> {new Date(task.endDate).toLocaleString()}</p>}
      {assignedUser && <p><strong>Osoba:</strong> {assignedUser.firstName} {assignedUser.secondName}</p>}

      {task.state === "todo" && (
        <div className="mt-4">
          <label className="block mb-2">Przypisz osobę:</label>
          <select
            onChange={(e) => handleAssign(e.target.value)}
            className="border p-2 rounded"
            defaultValue=""
          >
            <option value="" disabled>Wybierz użytkownika</option>
            {availableUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.firstName} {u.secondName} ({u.role})
              </option>
            ))}
          </select>
        </div>
      )}

      {task.state === "doing" && (
        <div className="mt-4">
          <button
            onClick={markAsDone}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Oznacz jako zakończone
          </button>
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 text-blue-600 hover:underline"
      >
        ← Wróć
      </button>
    </div>
  );
};

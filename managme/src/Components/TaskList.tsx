import React, { useEffect, useState } from "react";
import type { Task } from "../Models/Task";
import { TaskAPI } from "../API/TaskAPI";
import { useNavigate } from "react-router-dom";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTasks(TaskAPI.getAllTasks());
  }, []);

  const columns = {
    todo: "Do zrobienia",
    doing: "W trakcie",
    done: "Zrobione"
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {Object.entries(columns).map(([key, label]) => (
        <div key={key} className="bg-gray-100 rounded-xl p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">{label}</h2>
          {tasks
            .filter(task => task.state === key)
            .map(task => (
              <div
                key={task.id}
                className="bg-white p-2 rounded-md mb-2 cursor-pointer shadow hover:bg-gray-50"
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                <h3 className="font-bold">{task.name}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

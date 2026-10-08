import { useEffect, useState } from "react";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

export function TaskMenu() {
  const tasksList = JSON.parse(localStorage.getItem("items"));
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(tasksList || []);

  const handleAddTask = (text) => {
    const taskObject = {
      id: Date.now(),
      title: text,
      completed: false,
    };

    setTasks([...tasks, taskObject]);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto min-h-screen">
      <TaskForm setTask={setTask} task={task} handleAddTask={handleAddTask} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

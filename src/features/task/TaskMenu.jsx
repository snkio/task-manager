import { useEffect, useState } from "react";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { TaskFilter } from "./TaskFilter";

export function TaskMenu() {
  const tasksList = JSON.parse(localStorage.getItem("items"));
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(tasksList || []);
  const [currentFilter, setCurrentFilter] = useState("All");

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
    <div className="px-4 max-w-7xl mx-auto min-h-screen font-inter mt-40">
      <h1 className="text-4xl font-semibold">My tasks</h1>
      <TaskFilter
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        allTasks={tasks.length}
        activeTasks={tasks.filter((task) => !task.completed).length}
        completedTasks={tasks.filter((task) => task.completed).length}
      />
      <TaskForm setTask={setTask} task={task} handleAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        currentFilter={currentFilter}
      />
    </div>
  );
}

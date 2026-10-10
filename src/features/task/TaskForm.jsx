import { Plus } from "lucide-react";

export function TaskForm({ task, setTask, handleAddTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    handleAddTask(task);
    setTask("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2 items-center justify-between border rounded-md">
        <Plus size={24} />
        <input
          type="text"
          value={task}
          placeholder="What needs to get done?"
          className="w-full outline-none py-3 px-1"
          onChange={(e) => setTask(e.target.value)}
        />
        <button>Add task</button>
      </div>
    </form>
  );
}

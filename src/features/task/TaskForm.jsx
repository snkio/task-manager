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
      <div className="flex gap-2 items-center justify-between border border-gray-300 rounded-md px-2">
        <Plus size={24} />
        <input
          type="text"
          value={task}
          placeholder="What needs to get done?"
          className="w-full outline-none py-3 px-1"
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="cursor-pointer text-sm w-30 p-2 bg-gray-200 rounded-sm">
          Add task
        </button>
      </div>
    </form>
  );
}

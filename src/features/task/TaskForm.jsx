export function TaskForm({ task, setTask, handleAddTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    handleAddTask(task);
    setTask("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
    </form>
  );
}

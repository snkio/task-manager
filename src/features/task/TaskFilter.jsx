export function TaskFilter({ setCurrentFilter }) {
  return (
    <div className="flex gap-4">
      <button onClick={() => setCurrentFilter("All")}>All</button>
      <button onClick={() => setCurrentFilter("Active")}>Active</button>
      <button onClick={() => setCurrentFilter("Completed")}>Completed</button>
    </div>
  );
}

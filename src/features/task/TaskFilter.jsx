export function TaskFilter({
  currentFilter,
  setCurrentFilter,
  allTasks,
  activeTasks,
  completedTasks,
}) {
  return (
    <div className="flex items-center gap-6 border-b border-gray-200 mb-4">
      <div
        className={`flex gap-2 ${currentFilter === "All" ? "font-bold" : ""}`}
      >
        <button onClick={() => setCurrentFilter("All")}>All</button>
        <span className="font-normal text-sm text-center py-2 px-3 rounded-md bg-gray-100">
          {allTasks}
        </span>
      </div>
      <div
        className={`flex gap-2 ${currentFilter === "Active" ? "font-bold" : ""}`}
      >
        <button onClick={() => setCurrentFilter("Active")}>Active</button>
        <span className="font-normal text-sm text-center p-2 rounded-full bg-gray-100">
          {activeTasks}
        </span>
      </div>
      <div
        className={`flex gap-2 ${currentFilter === "Completed" ? "font-bold" : ""}`}
      >
        <button
          onClick={() => setCurrentFilter("Completed")}
          className={`${currentFilter === "Completed" ? "" : ""}`}
        >
          Completed
        </button>
        <span className="font-normal text-sm text-center p-2 rounded-full bg-gray-100">
          {completedTasks}
        </span>
      </div>
    </div>
  );
}

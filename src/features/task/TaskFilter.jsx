export function TaskFilter({
  currentFilter,
  setCurrentFilter,
  allTasks,
  activeTasks,
  completedTasks,
}) {
  const filters = [
    { name: "All", count: allTasks },
    { name: "Active", count: activeTasks },
    { name: "Completed", count: completedTasks },
  ];

  return (
    <div className="flex items-center gap-6 border-b border-gray-200 mb-4">
      {filters.map(({ name, count }) => (
        <div
          key={name}
          className={`relative flex gap-2 py-3 after:absolute after:content-[''] after:bottom-0 after:left-0 after:border-b after:transition-all after:delay-100 after:ease-out ${currentFilter === name ? "font-bold after:w-full" : "after:w-0"}`}
        >
          <button
            className={`transition-opacity delay-100 ease-out ${currentFilter === name ? "opacity-100" : "opacity-75 hover:opacity-100"}`}
            onClick={() => setCurrentFilter(name)}
          >
            {name}
          </button>
          <span className="font-normal text-sm text-center py-2 px-3 rounded-md bg-gray-100">
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}

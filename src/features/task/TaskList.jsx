import { useState, useRef, useEffect } from "react";
import { X, Check } from "lucide-react";

export function TaskList({ tasks, setTasks, currentFilter }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingTaskId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTaskId]);

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const filteredTasks =
    currentFilter === "Active"
      ? activeTasks
      : currentFilter === "Completed"
        ? completedTasks
        : tasks;

  const deleteItem = (task) => {
    setTasks((prev) => prev.filter((item) => item.id !== task.id));

    if (editingTaskId === task.id) {
      setEditingTaskId(null);
      setEditText("");
    }
  };

  const toggleTaskComplete = (task) => {
    setTasks((prev) =>
      prev.map((item) => {
        return item.id === task.id
          ? { ...item, completed: !item.completed }
          : item;
      }),
    );
  };

  const handleSaveEdit = (id) => {
    if (!editText.trim()) return;

    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: editText.trim() } : item,
      ),
    );
    setEditingTaskId(null);
    setEditText("");
  };

  return (
    <>
      <ul>
        {filteredTasks.length === 0 ? (
          <li className="py-4">No tasks found.</li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="w-full py-4 gap-2 flex items-center justify-between flex-wrap border-b border-gray-200"
            >
              <div className="flex flex-1 gap-4">
                <button
                  className="cursor-pointer"
                  onClick={() => toggleTaskComplete(task)}
                  aria-label={`Mark ${task.title} as ${task.completed ? "active" : "completed"}`}
                >
                  <span
                    className={`relative flex justify-center items-center w-6 h-6 border border-gray-500 rounded-full after:transition-transform after:absolute after:content-[''] after:duration-300 after:ease-out  ${task.completed ? "after:w-2 after:h-4 after:border-b-2 after:border-r-2 after:rotate-45 after:opacity-100 after:scale-100" : "after:rotate-0 after:opacity-0 after:scale-0"}`}
                  ></span>
                </button>
                {editingTaskId === task.id ? (
                  <div className="flex border justify-between border-gray-300 rounded-md px-2 py-1 w-full">
                    <input
                      className="outline-none p-2 flex-1 w-full"
                      ref={inputRef}
                      value={editText}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveEdit(task.id);
                        }
                        if (e.key === "Escape") {
                          setEditingTaskId(null);
                          setEditText("");
                        }
                      }}
                      onChange={(text) => setEditText(text.target.value)}
                    ></input>
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="cursor-pointer border border-gray-200 rounded-md px-2"
                        aria-label="Cancel editing"
                        onClick={() => {
                          setEditingTaskId(null);
                          setEditText("");
                        }}
                      >
                        <X className="transition-transform duration-300 ease-out hover:rotate-90" />
                      </button>
                      <button
                        className="cursor-pointer bg-gray-200 rounded-md px-2"
                        aria-label="Save changes"
                        onClick={() => handleSaveEdit(task.id)}
                      >
                        <Check className="transition-transform duration-300 ease-out hover:scale-110" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p
                    className={`relative wrap-anywhere min-w-0 flex-1 after:absolute after:content-[''] after:h-0.5 after:rounded-full after:left-0 after:top-1/2 after:bg-black/80 after:transition-all after:duration-300 after:ease-out ${task.completed ? "text-black/60 after:w-full" : "after:w-0"}`}
                  >
                    {task.title}
                  </p>
                )}
              </div>

              <div className="flex gap-6 flex-wrap">
                <button
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditText(task.title);
                  }}
                  className={`cursor-pointer delay-200 ${editingTaskId === task.id ? "hidden" : ""}`}
                >
                  Edit
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => deleteItem(task)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

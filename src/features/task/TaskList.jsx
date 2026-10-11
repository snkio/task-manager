import { useState } from "react";

export function TaskList({ tasks, setTasks, currentFilter }) {
  const [editItem, setEditItem] = useState(null);
  const [editText, setEditText] = useState("");

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

    if (editItem === task.id) {
      setEditItem(null);
      setEditText("");
    }
  };

  const completedItem = (task) => {
    setTasks((prev) =>
      prev.map((item) => {
        return item.id === task.id
          ? { ...item, completed: !item.completed }
          : item;
      }),
    );
  };

  const editedText = (id) => {
    if (!editText.trim()) return;

    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: editText.trim() } : item,
      ),
    );
    setEditItem(null);
    setEditText("");
  };

  return (
    <>
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="py-4 flex items-center justify-between flex-wrap border-b border-gray-200"
          >
            <div className="flex gap-4">
              <button
                onClick={() => completedItem(task)}
                className={`${editItem === task.id ? "hidden" : ""}`}
                aria-label="Complete and uncomplete button"
              >
                <span
                  className={`relative flex justify-center align-center w-6 h-6 border border-gray-500 rounded-full after:transition-transform after:absolute after:content-[''] after:duration-300 after:ease-out  ${task.completed ? "after:w-3 after:h-5 after:border-b-2 after:border-r-2 after:rotate-45 after:opacity-100 after:scale-100" : "after:rotate-0 after:opacity-0 after:scale-0"}`}
                ></span>
              </button>
              {editItem === task.id ? (
                <div className="flex border">
                  <input
                    value={editText}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        editedText(task.id);
                      }
                      if (e.key === "Escape") {
                        setEditItem(null);
                        setEditText("");
                      }
                    }}
                    onChange={(text) => setEditText(text.target.value)}
                  ></input>
                  <div className="flex gap-2">
                    <button onClick={() => editedText(task.id)}>Save</button>
                    <button
                      onClick={() => {
                        setEditItem(null);
                        setEditText("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className={`${task.completed ? "line-through" : ""}`}>
                  {task.title}
                </p>
              )}
            </div>

            <div className="flex gap-6 flex-wrap">
              <button
                onClick={() => {
                  setEditItem(task.id);
                  setEditText(task.title);
                }}
                className={`${editItem === task.id ? "hidden" : ""}`}
              >
                Edit
              </button>
              <button onClick={() => deleteItem(task)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

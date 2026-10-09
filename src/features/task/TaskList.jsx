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
          <li key={task.id} className="flex gap-4">
            <button
              onClick={() => completedItem(task)}
              className={`${editItem === task.id ? "hidden" : ""}`}
            >
              Completed
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

            <button onClick={() => deleteItem(task)}>Delete</button>
            <button
              onClick={() => {
                setEditItem(task.id);
                setEditText(task.title);
              }}
              className={`${editItem === task.id ? "hidden" : ""}`}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

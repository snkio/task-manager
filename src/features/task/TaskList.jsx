import { useState } from "react";

export function TaskList({ tasks, setTasks }) {
  const [editItem, setEditItem] = useState(null);
  const [editText, setEditText] = useState("");

  const deleteItem = (task) => {
    setTasks((prev) => prev.filter((item) => item.id !== task.id));
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
        {tasks.map((task) => (
          <li key={task.id} className="flex gap-4">
            <button onClick={() => completedItem(task)}>Completed</button>
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

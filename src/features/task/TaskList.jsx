export function TaskList({ tasks, setTasks }) {
  const deleteItem = (e) => {
    setTasks((prev) => prev.filter((tasks) => tasks.id !== e.id));
  };
  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex gap-4">
            <p>{task.title}</p>
            <button onClick={() => deleteItem(task)}>Удалить</button>
          </li>
        ))}
      </ul>
    </>
  );
}

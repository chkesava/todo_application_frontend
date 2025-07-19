import { useState } from "react";
import API from "../../services/api";

export default function TodoItem({ todo, onChange }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  async function toggleComplete() {
    try {
      await API.put(`/todos/${todo._id}`, { completed: !todo.completed });
      onChange();
    } catch {
      alert("Failed to update todo.");
    }
  }

  async function deleteTodo() {
    if (!confirm("Are you sure you want to delete this todo?")) return;
    try {
      await API.put(`/todos/${todo._id}/soft-delete`);
      onChange();
    } catch {
      alert("Failed to delete todo.");
    }
  }

  async function saveEdit() {
    if (!text.trim()) return alert("Text cannot be empty.");
    try {
      await API.put(`/todos/${todo._id}`, { text });
      setEditing(false);
      onChange();
    } catch {
      alert("Failed to update todo.");
    }
  }

  return (
    <li className="p-4 bg-white rounded shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div className="flex items-center gap-3 flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="w-5 h-5"
        />
        {editing ? (
          <input
            className="input input-bordered flex-grow"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <span
            className={`text-lg ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.text}
          </span>
        )}
        {todo.priority && (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
              todo.priority === "high"
                ? "bg-red-200 text-red-700"
                : todo.priority === "medium"
                ? "bg-yellow-200 text-yellow-700"
                : "bg-green-200 text-green-700"
            }`}
          >
            {todo.priority}
          </span>
        )}
      </div>

      <div className="flex gap-2 items-center flex-wrap mt-2 md:mt-0">
        {editing ? (
          <button
            className="btn btn-success btn-sm"
            onClick={saveEdit}
            title="Save"
          >
            Save
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setEditing(true)}
            title="Edit"
          >
            Edit
          </button>
        )}
        <button
          className="btn btn-error btn-sm"
          onClick={deleteTodo}
          title="Delete"
        >
          Delete
        </button>
      </div>

      {todo.category && (
        <p className="text-sm text-gray-500 mt-1 md:mt-0 md:ml-4">
          Category: {todo.category}
        </p>
      )}
      {todo.dueDate && (
        <p className="text-sm text-gray-500 mt-1 md:mt-0 md:ml-4">
          Due: {new Date(todo.dueDate).toLocaleDateString()}
        </p>
      )}

      {todo.subtasks && todo.subtasks.length > 0 && (
        <ul className="mt-2 ml-7 list-disc space-y-1">
          {todo.subtasks.map((subtask, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={async () => {
                  const updatedSubtasks = todo.subtasks.map((st, i) =>
                    i === idx ? { ...st, completed: !st.completed } : st
                  );
                  try {
                    await API.put(`/todos/${todo._id}`, {
                      subtasks: updatedSubtasks,
                    });
                    onChange();
                  } catch {
                    alert("Failed to update subtask.");
                  }
                }}
                className="w-4 h-4"
              />
              <span
                className={`${
                  subtask.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {subtask.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

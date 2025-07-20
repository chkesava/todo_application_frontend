import { useState } from "react";
import API from "../../services/api";

export default function TodoItem({ todo, onChange }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  async function toggleComplete() {
    try {
      await API.put(`/todos/${todo._id}`, { completed: !todo.completed });
      onChange("complete");
    } catch {
      alert("Failed to update todo.");
    }
  }

  async function deleteTodo() {
    if (!confirm("Are you sure you want to delete this todo?")) return;
    try {
      await API.put(`/todos/${todo._id}/soft-delete`);
      onChange("delete");
    } catch {
      alert("Failed to delete todo.");
    }
  }

  async function saveEdit() {
    if (!text.trim()) return alert("Text cannot be empty.");
    try {
      await API.put(`/todos/${todo._id}`, { text });
      setEditing(false);
      onChange("edit");
    } catch {
      alert("Failed to update todo.");
    }
  }

  return (
    <li
      className="p-5 rounded-xl border border-[var(--color-neon-blue)]
                 bg-[var(--color-glass)] backdrop-blur-md shadow-neon
                 text-white animate-neon transition-all duration-200"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        {/* Checkbox + Text or Input */}
        <div className="flex items-start md:items-center gap-3 flex-grow">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={toggleComplete}
            className="w-5 h-5 accent-[var(--color-neon-blue)]"
          />

          {/* Text (edit mode or not) */}
          {editing ? (
            <input
              className="neon-input w-full"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <span
              className={`text-lg leading-snug ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
          )}

          {/* Priority Badge */}
          {todo.priority && (
            <span
              className={`px-2 py-1 rounded text-xs font-semibold uppercase
                ${
                  todo.priority === "high"
                    ? "bg-red-500 text-white"
                    : todo.priority === "medium"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-500 text-black"
                }`}
            >
              {todo.priority}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 items-center flex-wrap">
          {editing ? (
            <button
              className="neon-btn px-3 py-1 text-sm"
              onClick={saveEdit}
            >
              Save
            </button>
          ) : (
            <button
              className="neon-btn px-3 py-1 text-sm"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}
          <button
            className="bg-rose-600 px-3 py-1 text-sm text-white rounded-xl hover:bg-rose-700"
            onClick={deleteTodo}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Optional Meta Info ✨ */}
      {(todo.category || todo.dueDate) && (
        <div className="mt-3">
          {todo.category && (
            <p className="text-sm text-neon-cyan">🎯 Category: {todo.category}</p>
          )}
          {todo.dueDate && (
            <p className="text-sm text-neon-cyan">
              📅 Due: {new Date(todo.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {/* Subtasks */}
      {todo.subtasks && todo.subtasks.length > 0 && (
        <ul className="mt-3 list-disc list-inside space-y-1">
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
                    onChange("edit");
                  } catch {
                    alert("Failed to update subtask.");
                  }
                }}
                className="w-4 h-4 accent-[var(--color-neon-blue)]"
              />
              <span
                className={`text-sm ${
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

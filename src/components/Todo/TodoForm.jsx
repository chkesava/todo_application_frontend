import { useState } from "react";
import API from "../../services/api";

export default function TodoForm({ onAdd }) {
  const [form, setForm] = useState({
    text: "",
    priority: "medium",
    category: "",
    dueDate: "",
    subtasks: [{ text: "", completed: false }],
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function updateSubtask(index, value) {
    const subtasks = [...form.subtasks];
    subtasks[index].text = value;
    setForm({ ...form, subtasks });
  }

  function addSubtask() {
    setForm({
      ...form,
      subtasks: [...form.subtasks, { text: "", completed: false }],
    });
  }

  function removeSubtask(index) {
    setForm({
      ...form,
      subtasks: form.subtasks.filter((_, i) => i !== index),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.text.trim()) return;
    try {
      await API.post("/todos", form);
      setForm({
        text: "",
        priority: "medium",
        category: "",
        dueDate: "",
        subtasks: [{ text: "", completed: false }],
      });
      if (onAdd) onAdd();
    } catch (err) {
      alert("Failed to add todo.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[color:var(--color-glass)] backdrop-blur-md rounded-super border border-[var(--color-neon-blue)] shadow-neon p-6 space-y-5 animate-neon"
    >
      {/* Main Task Text */}
      <input
        type="text"
        name="text"
        placeholder="What do you need to do?"
        className="neon-input w-full"
        value={form.text}
        onChange={handleChange}
        required
      />

      {/* PRI / CAT / DUE */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="neon-input flex-1"
        >
          <option value="low">⬇️ Low Priority</option>
          <option value="medium">⚖️ Medium Priority</option>
          <option value="high">⬆️ High Priority</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="📦 Category (optional)"
          className="neon-input flex-1"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          className="neon-input flex-1 text-white"
          value={form.dueDate}
          onChange={handleChange}
        />
      </div>

      {/* Subtasks */}
      <div>
        <label className="block font-semibold text-neon-cyan mb-2 mt-4">🧩 Subtasks</label>
        {form.subtasks.map((subtask, i) => (
          <div key={i} className="flex gap-3 items-center mb-2">
            <input
              type="text"
              placeholder={`Subtask ${i + 1}`}
              className="neon-input w-full"
              value={subtask.text}
              onChange={(e) => updateSubtask(i, e.target.value)}
            />
            {form.subtasks.length > 1 && (
              <button
                type="button"
                className="bg-rose-600 text-white px-2 py-1 rounded-xl hover:bg-rose-700"
                onClick={() => removeSubtask(i)}
              >
                ❌
              </button>
            )}
          </div>
        ))}
        {/* Add subtask button */}
        <button
          type="button"
          onClick={addSubtask}
          className="neon-btn px-4 py-2 mt-2 text-sm"
        >
          ➕ Add Subtask
        </button>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full neon-btn py-3 text-lg tracking-wide">
        ✅ Add To-Do
      </button>
    </form>
  );
}

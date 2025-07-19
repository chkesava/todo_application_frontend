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
      alert("Failed to add todo", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded">
      <input
        type="text"
        name="text"
        placeholder="What do you need to do?"
        className="input input-bordered w-full"
        value={form.text}
        onChange={handleChange}
        required
      />

      <div className="flex gap-2 flex-wrap">
        <select name="priority" value={form.priority} onChange={handleChange} className="select select-bordered">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category (optional)"
          className="input input-bordered flex-grow"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          className="input input-bordered"
          value={form.dueDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="font-semibold mb-1 block">Subtasks:</label>
        {form.subtasks.map((subtask, i) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              placeholder="Subtask text"
              className="input input-bordered flex-grow"
              value={subtask.text}
              onChange={(e) => updateSubtask(i, e.target.value)}
            />
            {form.subtasks.length > 1 && (
              <button type="button" className="btn btn-error" onClick={() => removeSubtask(i)}>
                &times;
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-outline" onClick={addSubtask}>
          + Add Subtask
        </button>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Add To-Do
      </button>
    </form>
  );
}

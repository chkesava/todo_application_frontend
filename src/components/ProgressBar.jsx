import React, { useEffect, useState } from "react";
import API from "../services/api"; // Adjust the path as needed

export default function ProgressBar() {
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setLoading(true);
        // Fetch all todos with no filter on completion,
        // adjust limit if needed or implement pagination.
        const { data } = await API.get("/todos");
        const todos = data.todos || [];
        const completedCount = todos.filter((todo) => todo.completed).length;

        setCompleted(completedCount);
        setTotal(todos.length);
      } catch (err) {
        console.error("Failed to fetch todos for progress bar:", err);
        setCompleted(0);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-4">
      <div className="flex j  ustify-between text-xs text-neon-cyan mb-1">
        <span>Progress</span>
        <span>{loading ? "Loading..." : `${percent}% (${completed}/${total})`}</span>
      </div>
      <div className="w-full bg-[rgba(24,186,255,0.12)] h-4 rounded-full overflow-hidden">
        <div
          className="h-full bg-neon-blue transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

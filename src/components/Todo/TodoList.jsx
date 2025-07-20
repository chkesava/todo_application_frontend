import { useEffect, useState } from "react";
import API from "../../services/api";
import TodoItem from "./TodoItem";

export default function TodoList({ filters, refreshFlag, onChange }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      setLoading(true);
      try {
        const { data } = await API.get("/todos", { params: filters });
        setTodos(data.todos || []);
      } finally {
        setLoading(false);
      }
    }
    fetchTodos();
  }, [filters, refreshFlag]);

  if (loading) {
    return (
      <div className="text-center py-6 text-[var(--color-neon-blue)] font-bold animate-pulse">
        🔄 Loading your glowing to-dos...
      </div>
    );
  }

  if (!todos.length) {
    return (
      <div className="text-center text-sm text-[var(--color-neon-cyan)] bg-[color:var(--color-glass)] p-6 rounded-super border border-neon shadow-neon mt-6 animate-neon">
        📭 You have no tasks yet!<br />
        Tap the neon button above to add your first to-do.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onChange={onChange}
        />
      ))}
    </ul>
  );
}

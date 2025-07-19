import { useEffect, useState } from "react";
import API from "../../services/api";
import TodoItem from "./TodoItem";

export default function TodoList({ filters, refreshFlag, onChange }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const { data } = await API.get("/todos", { params: filters });
        setTodos(data.todos || []);
      } catch {
        alert("Failed to load todos.");
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [filters, refreshFlag]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!todos.length)
    return <div className="p-4 text-center text-gray-500">No to-dos found.</div>;

  return (
    <ul className="space-y-4 mt-4">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onChange={onChange} />
      ))}
    </ul>
  );
}

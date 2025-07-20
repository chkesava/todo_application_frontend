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
    return <div className="text-center py-4 text-blue-500 font-semibold">Loading your todos...</div>;
  }

  if (!todos.length) {
    return <div className="text-center text-gray-500 py-4 text-lg">📭 You have no to-dos yet!</div>;
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onChange={onChange} />
      ))}
    </ul>
  );
}

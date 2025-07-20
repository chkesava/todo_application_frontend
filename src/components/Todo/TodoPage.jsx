import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import API from "../../services/api";
import { Navigate } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import ProgressBar from "../ProgressBar";
import { useNotification } from "../../context/useNotification";

export default function TodoPage() {
  const { user, logout, token } = useAuth();
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ search: "", priority: "", category: "", completed: "" });
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [dateTime, setDateTime] = useState(new Date());
  const { notify } = useNotification();

  useEffect(() => { const timer = setInterval(() => setDateTime(new Date()), 20000); return () => clearInterval(timer); }, []);

  useEffect(() => {
    if (!token) return;
    API.get("/todos", { params: filters })
      .then(({ data }) => setTodos(data.todos ?? []))
      .catch(() => notify("Failed to load todos.", "error"));
  }, [filters, refreshFlag]);

  if (!user) return <Navigate to="/login" />;

  const greet = (() => {
    const h = dateTime.getHours();
    if (h < 5) return "Late night";
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();
  const completed = todos.filter((t) => t.completed).length;
  const triggerRefresh = () => setRefreshFlag((n) => n + 1);

  return (
    <div className="min-h-screen bg-perplexity-dark text-white p-6">
      <div className="max-w-3xl mx-auto bg-[color:var(--color-glass)] rounded-super neon-border backdrop-blur-md shadow-2xl p-8 space-y-7 animate-neon">
        <header className="flex gap-3 items-start sm:items-center justify-between flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold text-neon-blue drop-shadow">{greet}, {user.name}!</h1>
            <p className="text-sm text-neon-cyan">{dateTime.toLocaleString()}</p>
          </div>
          <button
            onClick={logout}
            className="neon-btn py-2 text-base tracking-wider"
          >Logout</button>
        </header>
        <ProgressBar completed={completed} total={todos.length} />
        <TodoForm onAdd={() => { triggerRefresh(); notify("To-do added!", "success"); }} />
        <TodoFilter
          filters={filters}
          setFilters={setFilters}
          onFilterChange={triggerRefresh}
        />
        <TodoList
          filters={filters}
          refreshFlag={refreshFlag}
          onChange={(type) => {
            triggerRefresh();
            notify(
              type === "delete" ? "To-do deleted" :
              type === "edit" ? "To-do updated" :
              type === "complete" ? "Task marked complete!" :"Updated",
              type === "delete" ? "error" : "info"
            );
          }}
        />
      </div>
    </div>
  );
}

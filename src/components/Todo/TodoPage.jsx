import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import API from "../../services/api";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import ProgressBar from "../ProgressBar";
import { Navigate } from "react-router-dom";
import { useNotification } from "../../context/useNotification";

export default function TodoPage() {
  const { user, logout, token } = useAuth();
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ search: "", priority: "", category: "", completed: "" });
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [dateTime, setDateTime] = useState(new Date());
  const { notify } = useNotification();

  const hour = dateTime.getHours();
  const greet =
    hour < 5 ? "Late night" :
    hour < 12 ? "Good morning" :
    hour < 17 ? "Good afternoon" :
    "Good evening";

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 20000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!token) return;
    API.get("/todos", { params: filters })
      .then(({ data }) => setTodos(data.todos ?? []))
      .catch(() => notify("Failed to load todos.", "error"));
  }, [filters, refreshFlag]);

  if (!user) return <Navigate to="/login" />;

  const completed = todos.filter((t) => t.completed).length;
  const triggerRefresh = () => setRefreshFlag((n) => n + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
        <header className="flex gap-3 items-start sm:items-center justify-between flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">{greet}, {user.name}!</h1>
            <p className="text-sm text-gray-500">{dateTime.toLocaleString()}</p>
          </div>
          <button
            onClick={logout}
            className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 text-sm"
          >
            Logout
          </button>
        </header>

        <ProgressBar completed={completed} total={todos.length} />

        <TodoForm onAdd={() => {
          triggerRefresh();
          notify("To-do added!", "success");
        }} />

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
              type === "complete" ? "Task marked complete!" :
              "Updated",
              type === "delete" ? "error" : "info"
            );
          }}
        />
      </div>
    </div>
  );
}

import useAuth from "../../hooks/useAuth";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import { useState } from "react";

export default function TodoPage() {
  const { logout, user } = useAuth();
  const [filters, setFilters] = useState({ search: "", priority: "", category: "", completed: "" });
  const [refreshFlag, setRefreshFlag] = useState(0);

  const triggerRefresh = () => setRefreshFlag((f) => f + 1);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6 flex flex-col gap-4">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">
            Hello, {user?.name || "Guest"}!
          </h1>
          <button
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        </header>

        <TodoForm onAdd={triggerRefresh} />
        <TodoFilter filters={filters} setFilters={setFilters} onFilterChange={triggerRefresh} />
        <TodoList filters={filters} refreshFlag={refreshFlag} onChange={triggerRefresh} />
      </div>
    </div>
  );
}

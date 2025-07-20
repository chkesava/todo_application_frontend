import { useEffect } from "react";

export default function TodoFilter({ filters, setFilters, onFilterChange }) {
  function setFilter(value, key) {
    setFilters({ ...filters, [key]: value });
  }

  useEffect(() => {
    onFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div
      className="flex flex-wrap gap-3 p-6 mt-6 backdrop-blur-md rounded-super border border-[var(--color-neon-blue)]
                 bg-[rgba(20,20,30,0.7)] shadow-neon animate-neon"
    >
      {/* Search input */}
      <input
        type="text"
        placeholder="🔎 Search To-Dos"
        value={filters.search}
        onChange={(e) => setFilter(e.target.value, "search")}
        className="neon-input flex-1 min-w-[220px]"
      />

      {/* Priority dropdown */}
      <select
        value={filters.priority}
        onChange={(e) => setFilter(e.target.value, "priority")}
        className="neon-input w-48"
      >
        <option value="">🎯 Priority</option>
        <option value="low">⬇️ Low</option>
        <option value="medium">⚖️ Medium</option>
        <option value="high">⬆️ High</option>
      </select>

      {/* Category input */}
      <input
        type="text"
        placeholder="📦 Category"
        value={filters.category}
        onChange={(e) => setFilter(e.target.value, "category")}
        className="neon-input w-48"
      />

      {/* Completion filter */}
      <select
        value={filters.completed}
        onChange={(e) => setFilter(e.target.value, "completed")}
        className="neon-input w-40"
      >
        <option value="">📝 All</option>
        <option value="false">🟡 Active</option>
        <option value="true">✅ Completed</option>
      </select>
    </div>
  );
}

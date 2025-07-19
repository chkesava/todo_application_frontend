import { useEffect } from "react";

export default function TodoFilter({ filters, setFilters, onFilterChange }) {
  function setFilter(value, key) {
    setFilters({ ...filters, [key]: value });
  }

  // Trigger filter change on filters update
  useEffect(() => {
    onFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded mt-4">
      <input
        type="text"
        placeholder="Search To-Dos"
        value={filters.search}
        onChange={(e) => setFilter(e.target.value, "search")}
        className="input input-bordered flex-grow min-w-[220px]"
      />
      <select
        className="select select-bordered"
        value={filters.priority}
        onChange={(e) => setFilter(e.target.value, "priority")}
      >
        <option value="">Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={filters.category}
        onChange={(e) => setFilter(e.target.value, "category")}
        className="input input-bordered"
      />
      <select
        className="select select-bordered"
        value={filters.completed}
        onChange={(e) => setFilter(e.target.value, "completed")}
      >
        <option value="">All</option>
        <option value="false">Active</option>
        <option value="true">Completed</option>
      </select>
    </div>
  );
}

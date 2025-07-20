export default function ProgressBar({ completed, total }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Progress</span>
        <span>{percent}% ({completed}/{total})</span>
      </div>
      <div className="w-full bg-slate-300 h-4 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function ProgressBar({ completed, total }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-neon-cyan mb-1">
        <span>Progress</span>
        <span>{percent}% ({completed}/{total})</span>
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

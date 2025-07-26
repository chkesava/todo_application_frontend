import { useEffect } from "react";

const updatesData = [
  // {
  //   date: "2025-07-20",
  //   title: "Backend Security Update",
  //   description: "Improved authentication flows and rate limiting for all API endpoints.",
  // },
  // {
  //   date: "2025-07-21",
  //   title: "UI Overhaul",
  //   description: "Applied neon Perplexity-inspired dark visual theme across the entire app.",
  // },
  // {
  //   date: "2025-08-01",
  //   title: "Scheduled Downtime",
  //   description: "App maintenance window: Aug 1, 11:00 PM – 1:00 AM IST.",
  // }
  // Add more updates as needed
  // {
  //   date: "TO be announced",
  //   title: "kanban style app Update",
  //   description: "this was a huge update stepping a big ahead converting a normal app to a kanban style app with a lot of new features and bug fixes.",
  // },
  {
  "date": "2025-07-26",
  "title": "Improved Filtering and Progress Tracking Update",
  "description": "Fixed the frontend filter to correctly show all todos when 'All' is selected. Updated backend API to properly handle completed filter including empty string as no filter. Improved frontend API calls to omit filter parameters when not needed. Refactored ProgressBar component to fetch and display progress independently. Enhanced error handling and loading states for a smoother user experience."
},

];

export default function UpdatesModal({ show, onClose }) {
  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="max-w-lg w-full bg-[color:var(--color-glass)] border border-[var(--color-neon-blue)] rounded-super shadow-neon p-7 animate-neon relative">
        <button
          className="absolute top-4 right-4 text-neon-pink text-2xl font-bold hover:scale-110 transition"
          onClick={onClose}
          aria-label="Close updates"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold text-neon-blue mb-4 text-center">📢 What's New / Scheduled Updates</h3>
        <ul className="space-y-5">
          {updatesData.map((update, idx) => (
            <li key={idx} className="p-4 rounded-xl border border-[var(--color-neon-cyan)] bg-[color:var(--color-surface)] shadow">
              <div className="text-neon-cyan text-sm mb-1">{update.date}</div>
              <div className="font-bold text-lg text-white mb-1">{update.title}</div>
              <div className="text-gray-200">{update.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

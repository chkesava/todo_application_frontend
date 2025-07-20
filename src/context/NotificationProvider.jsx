import { useCallback, useState } from "react";
import { NotificationContext } from "./notification-context";

export default function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const notify = useCallback((msg, type = "info") => {
    const id = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 items-end pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-5 py-3 rounded-xl font-semibold text-white shadow-xl animate-slideIn
              ${t.type === "success" ? "bg-blue-600" :
                t.type === "error" ? "bg-rose-500" : "bg-cyan-600"}`}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

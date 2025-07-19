// import { Routes, Route, Navigate } from "react-router-dom";
// import useAuth from "./hooks/useAuth";
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
// import TodoPage from "./components/Todo/TodoPage";

// function PrivateRoute({ children }) {
//   const { token } = useAuth();
//   return token ? children : <Navigate to="/login" />;
// }

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/" element={<PrivateRoute><TodoPage /></PrivateRoute>} />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

import React from "react";
import {motion} from "framer-motion";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-6">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700 p-10 max-w-xl text-center"
      >
        <motion.h1
          className="text-5xl font-extrabold text-yellow-400 mb-4"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🚧 Under Construction
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
          We're making exciting improvements in{" "}
          <span className="text-cyan-400 font-semibold">UI</span>,{" "}
          <span className="text-cyan-400 font-semibold">performance</span>, and{" "}
          <span className="text-cyan-400 font-semibold">usability</span> to give you a better experience.
        </p>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-5 rounded-xl transition-all duration-300 shadow-lg"
          >
            Notify Me
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-2 px-5 rounded-xl transition-all duration-300"
          >
            Learn More
          </motion.button>
        </div>

        <p className="mt-10 text-sm text-gray-500 tracking-wide">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
      </motion.div>
    </div>
  );
};

export default App;

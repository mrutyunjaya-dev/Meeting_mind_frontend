import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Dashboard from "@/pages/Dashboard";
import Upload from "@/pages/Upload";
import NotFound from "@/pages/NotFound";
import MeetingDetail from "@/pages/MeetingDetail"

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/meetings/:id" element={<MeetingDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 py-8 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} MeetingMind
      </footer>
    </div>
  );
}

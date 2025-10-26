import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/80 dark:border-gray-800 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-40">
      <div className="container-app flex h-14 items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/favicon.svg" className="h-6 w-6" alt="logo" />
          <Link to="/" className="font-semibold text-gray-900 dark:text-white">MeetingMind</Link>
          <div className="hidden sm:flex items-center space-x-4 ml-6 text-sm">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Dashboard</Link>
            <Link to="/upload" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Upload</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

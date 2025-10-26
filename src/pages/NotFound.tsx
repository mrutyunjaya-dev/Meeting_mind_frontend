import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-app py-24 text-center">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="text-slate-500 mt-2">This page could not be found.</p>
      <Link to="/" className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-white">Go home</Link>
    </div>
  );
}

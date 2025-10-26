export default function Loader() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-transparent" />
      <span className="ml-2 text-sm text-slate-500">Loading...</span>
    </div>
  );
}

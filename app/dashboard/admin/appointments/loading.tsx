export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      <span className="ml-3 text-gray-600 text-lg">Loading dashboard...</span>
    </div>
  );
}

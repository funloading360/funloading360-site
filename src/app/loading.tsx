export default function Loading() {
  return (
    <div className="bg-[#0a0a0e] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#f5a623]/20 border-t-[#f5a623] animate-spin motion-reduce:animate-none" />
        <p className="text-gray-500 text-sm">Loading…</p>
      </div>
    </div>
  );
}

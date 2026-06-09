const skeletonRows = Array.from({ length: 4 }, (_, index) => index);

export const Loading = () => (
  <main className="min-h-screen bg-[#070712] px-4 py-8 text-white sm:px-6 lg:px-8">
    <div className="mx-auto max-w-[1180px] animate-pulse space-y-6">
      <div className="h-16 rounded-full border border-purple-300/10 bg-white/[0.05]" />
      <div className="h-80 rounded-[2rem] border border-purple-300/10 bg-white/[0.05]" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {skeletonRows.map((row) => (
          <div key={row} className="h-60 rounded-[1.75rem] border border-purple-300/10 bg-white/[0.05]" />
        ))}
      </div>
      <div className="h-72 rounded-[2rem] border border-purple-300/10 bg-white/[0.05]" />
    </div>
  </main>
);

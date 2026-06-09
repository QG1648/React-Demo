interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = 'No data available',
  description = 'There is nothing to display for this selection yet.',
}: EmptyStateProps) => (
  <div className="rounded-3xl border border-purple-300/15 bg-white/[0.04] p-8 text-center text-slate-300">
    <p className="text-lg font-semibold text-white">{title}</p>
    <p className="mt-2 text-sm text-slate-400">{description}</p>
  </div>
);

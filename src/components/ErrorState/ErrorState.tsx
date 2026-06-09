import { Button } from '../Button/Button';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <div className="mx-auto max-w-xl rounded-3xl border border-red-300/20 bg-red-500/10 p-8 text-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
    <p className="text-xl font-semibold text-white">Something went wrong</p>
    <p className="mt-3 text-sm text-red-100/80">{message}</p>
    <Button className="mt-6" onClick={onRetry}>
      Retry
    </Button>
  </div>
);

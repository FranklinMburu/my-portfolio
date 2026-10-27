/** Marks real client work, as opposed to self-initiated showcase sites. */
export const ClientWorkBadge = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400 ${className}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
    Client work
  </span>
);

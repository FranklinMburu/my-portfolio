import type { ReactNode } from 'react';

interface BrowserFrameProps {
  children: ReactNode;
  url?: string;
  className?: string;
  /** Light chrome reads better on light screenshots. */
  light?: boolean;
  compact?: boolean;
}

export const BrowserFrame = ({ children, url, className = '', light = false, compact = false }: BrowserFrameProps) => (
  <div
    className={`overflow-hidden rounded-xl border ${light ? 'border-white/20' : 'border-white/10'} bg-[#0A0F1F] ${className}`}
  >
    <div
      className={`flex items-center gap-3 border-b ${compact ? 'px-3 py-2' : 'px-4 py-3'} ${
        light ? 'bg-[#e2e8f0] border-black/5' : 'bg-[#111827]/95 border-white/10'
      }`}
    >
      <div className="flex gap-1.5">
        <span className={`rounded-full ${compact ? 'h-2 w-2' : 'h-3 w-3'} ${light ? 'bg-slate-400' : 'bg-[#ef4444]'}`} />
        <span className={`rounded-full ${compact ? 'h-2 w-2' : 'h-3 w-3'} ${light ? 'bg-slate-400' : 'bg-[#f59e0b]'}`} />
        <span className={`rounded-full ${compact ? 'h-2 w-2' : 'h-3 w-3'} ${light ? 'bg-slate-400' : 'bg-[#10b981]'}`} />
      </div>
      {url && (
        <div className="mx-auto hidden max-w-sm flex-1 truncate rounded-md bg-white/5 px-3 py-1.5 text-center text-xs text-[#9ca3af] sm:block">
          {url}
        </div>
      )}
    </div>
    <div className="overflow-hidden">{children}</div>
  </div>
);

export const PhoneFrame = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div
    className={`rounded-[34px] border border-white/15 bg-[#0b0f19] p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.6)] ${className}`}
  >
    <div className="h-full w-full overflow-hidden rounded-[25px]">{children}</div>
  </div>
);

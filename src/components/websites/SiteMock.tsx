/**
 * Drawn stand-ins for website screenshots, used until a real screenshot is added
 * to src/data/websites.ts. Each variant suggests a different kind of site.
 */
export type MockVariant = 'warm' | 'saas' | 'teal' | 'gold' | 'dashboard';

const bar = (w: string, h: number, c: string, extra = '') => (
  <div className={`rounded ${extra}`} style={{ width: w, height: h, background: c }} />
);

export const DesktopMock = ({ variant }: { variant: MockVariant }) => {
  switch (variant) {
    case 'warm':
      return (
        <div className="h-full w-full flex flex-col gap-[6%] p-[4%_5%]" style={{ background: '#1c140f' }}>
          <div className="flex items-center justify-between">
            {bar('16%', 14, '#f5d0a9')}
            <div className="flex items-center gap-4">
              {bar('44px', 7, '#7c5a43')}
              {bar('44px', 7, '#7c5a43', 'hidden sm:block')}
              <div className="rounded-full" style={{ width: 84, height: 28, background: '#d97706' }} />
            </div>
          </div>
          <div className="flex flex-1 gap-[5%]">
            <div className="flex flex-1 flex-col justify-center gap-[6%]">
              {bar('92%', 30, '#fef3c7')}
              {bar('68%', 30, '#fef3c7')}
              {bar('86%', 8, '#8b6b55', 'mt-2')}
              {bar('74%', 8, '#8b6b55')}
              <div className="mt-3 flex gap-3">
                <div className="rounded-full" style={{ width: '38%', height: 38, background: '#d97706' }} />
                <div className="rounded-full border" style={{ width: '38%', height: 38, borderColor: '#8b6b55' }} />
              </div>
            </div>
            <div className="relative flex-1 overflow-hidden rounded-2xl" style={{ background: '#b45309' }}>
              <div className="absolute rounded-full opacity-70" style={{ width: '70%', aspectRatio: '1', background: '#f59e0b', right: '-15%', bottom: '-20%' }} />
              <div className="absolute rounded-full opacity-85" style={{ width: '32%', aspectRatio: '1', background: '#fde68a', left: '14%', top: '12%' }} />
            </div>
          </div>
        </div>
      );
    case 'saas':
      return (
        <div className="h-full w-full flex flex-col items-center gap-[4%] p-[3%_5%]" style={{ background: '#f8fafc' }}>
          <div className="flex w-full items-center justify-between">
            {bar('12%', 11, '#1e293b')}
            <div className="rounded-md" style={{ width: 64, height: 20, background: '#4f46e5' }} />
          </div>
          {bar('90px', 13, '#e0e7ff', 'rounded-full mt-[2%]')}
          {bar('64%', 20, '#0f172a')}
          {bar('46%', 20, '#0f172a')}
          <div className="flex gap-2">
            <div className="rounded-md" style={{ width: 90, height: 28, background: '#4f46e5' }} />
            <div className="rounded-md border bg-white" style={{ width: 90, height: 28, borderColor: '#cbd5e1' }} />
          </div>
          <div className="flex w-full flex-1 gap-3 rounded-t-lg border border-b-0 bg-white p-3" style={{ borderColor: '#e2e8f0' }}>
            <div className="w-[22%] rounded" style={{ background: '#eef2ff' }} />
            <div className="flex-1 rounded" style={{ background: '#e0e7ff' }} />
          </div>
        </div>
      );
    case 'teal':
      return (
        <div className="h-full w-full flex flex-col gap-[5%] p-[4%_5%]" style={{ background: '#052e2b' }}>
          <div className="flex justify-between">
            {bar('14%', 11, '#99f6e4')}
            <div className="rounded-full" style={{ width: 62, height: 20, background: '#14b8a6' }} />
          </div>
          {bar('72%', 24, '#ccfbf1', 'mt-[3%]')}
          {bar('50%', 24, '#ccfbf1')}
          <div className="grid flex-1 grid-cols-3 gap-3">
            <div className="rounded-lg" style={{ background: '#0f766e' }} />
            <div className="rounded-lg" style={{ background: '#115e59' }} />
            <div className="rounded-lg" style={{ background: '#0f766e' }} />
          </div>
        </div>
      );
    case 'gold':
      return (
        <div className="h-full w-full flex flex-col gap-[5%] p-[4%_5%]" style={{ background: '#0c0a09' }}>
          <div className="flex items-center justify-between">
            {bar('18%', 9, '#d6b56d')}
            <div className="flex gap-3">
              {bar('30px', 5, '#57534e')}
              {bar('30px', 5, '#57534e')}
              {bar('30px', 5, '#57534e')}
            </div>
          </div>
          <div className="flex flex-1 gap-[4%]">
            <div className="relative flex-[1.3] overflow-hidden rounded" style={{ background: '#292524' }}>
              <div className="absolute inset-[8%] border opacity-50" style={{ borderColor: '#d6b56d' }} />
              <div className="absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ aspectRatio: '1', background: '#44403c' }} />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-3">
              {bar('36px', 2, '#d6b56d')}
              {bar('90%', 16, '#fafaf9')}
              {bar('68%', 16, '#fafaf9')}
              <div className="mt-2 border" style={{ width: 88, height: 28, borderColor: '#d6b56d' }} />
            </div>
          </div>
        </div>
      );
    case 'dashboard':
    default:
      return (
        <div className="flex h-full w-full" style={{ background: '#0f172a' }}>
          <div className="flex w-14 flex-col items-center gap-3 pt-4" style={{ background: '#020617' }}>
            <div className="h-6 w-6 rounded-md" style={{ background: '#22c55e' }} />
            {bar('20px', 5, '#334155')}
            {bar('20px', 5, '#334155')}
            {bar('20px', 5, '#334155')}
          </div>
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="h-14 rounded-lg" style={{ background: '#1e293b' }} />
              <div className="h-14 rounded-lg" style={{ background: '#1e293b' }} />
              <div className="h-14 rounded-lg" style={{ background: '#14532d' }} />
            </div>
            <div className="relative flex-1 rounded-lg" style={{ background: '#1e293b' }}>
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex h-[62%] items-end gap-2">
                {[40, 65, 50, 85, 70, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 5 ? '#4ade80' : '#22c55e' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
  }
};

const phoneColours: Record<MockVariant, { bg: string; logo: string; block: string; head: string; line: string; cta: string }> = {
  warm: { bg: '#1c140f', logo: '#f5d0a9', block: '#b45309', head: '#fef3c7', line: '#8b6b55', cta: '#d97706' },
  saas: { bg: '#f8fafc', logo: '#1e293b', block: '#e0e7ff', head: '#0f172a', line: '#94a3b8', cta: '#4f46e5' },
  teal: { bg: '#052e2b', logo: '#99f6e4', block: '#0f766e', head: '#ccfbf1', line: '#2dd4bf', cta: '#14b8a6' },
  gold: { bg: '#0c0a09', logo: '#d6b56d', block: '#292524', head: '#fafaf9', line: '#57534e', cta: '#d6b56d' },
  dashboard: { bg: '#0f172a', logo: '#e2e8f0', block: '#1e293b', head: '#e2e8f0', line: '#334155', cta: '#22c55e' }
};

export const PhoneMock = ({ variant, alt = false }: { variant: MockVariant; alt?: boolean }) => {
  const c = phoneColours[variant];
  if (alt) {
    return (
      <div className="flex h-full w-full flex-col gap-2.5 px-3 py-4" style={{ background: c.bg }}>
        {bar('60%', 13, c.head)}
        <div className="grid flex-1 grid-cols-2 gap-2">
          <div className="rounded-lg" style={{ background: c.block }} />
          <div className="rounded-lg opacity-80" style={{ background: c.block }} />
          <div className="rounded-lg opacity-80" style={{ background: c.block }} />
          <div className="rounded-lg" style={{ background: c.block }} />
        </div>
        <div className="rounded-full" style={{ height: 32, background: c.cta }} />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col gap-2.5 px-3 py-4" style={{ background: c.bg }}>
      <div className="flex items-center justify-between">
        {bar('34%', 9, c.logo)}
        <div style={{ width: 16, height: 10, borderTop: `2px solid ${c.line}`, borderBottom: `2px solid ${c.line}` }} />
      </div>
      <div className="rounded-xl" style={{ height: '38%', background: c.block }} />
      {bar('90%', 13, c.head)}
      {bar('62%', 13, c.head)}
      {bar('85%', 5, c.line)}
      <div className="mt-auto rounded-full" style={{ height: 32, background: c.cta }} />
    </div>
  );
};

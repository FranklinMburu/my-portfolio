import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

/** Counts the leading number of a value up from zero ("100+" -> 0+ ... 100+). */
const CountUp = ({ value, delay = 0, duration = 1400 }: { value: string; delay?: number; duration?: number }) => {
  const match = value.match(/^(\d+)(.*)$/);
  const end = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const [shown, setShown] = useState(() => (match && !prefersReducedMotion() ? 0 : end));
  const frame = useRef(0);

  useEffect(() => {
    if (!match || prefersReducedMotion()) {
      setShown(end);
      return;
    }
    let start = 0;
    const step = (time: number) => {
      if (!start) start = time;
      const t = Math.min(1, (time - start) / duration);
      setShown(Math.round(end * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame.current = requestAnimationFrame(step);
    };
    const timer = window.setTimeout(() => {
      frame.current = requestAnimationFrame(step);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!match) return <>{value}</>;
  return (
    <>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
};

export default CountUp;

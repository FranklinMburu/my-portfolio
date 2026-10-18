import { useRef, type ReactNode } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../../lib/motion';

/** Tilts its content a few degrees toward the cursor (desktop only). */
const Tilt = ({ children, max = 4, className = '' }: { children: ReactNode; max?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== 'mouse' || !hasFinePointer() || prefersReducedMotion()) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transition = 'transform 0.15s ease-out';
    node.style.transform = `perspective(1000px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)';
    node.style.transform = '';
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`h-full ${className}`}>
      {children}
    </div>
  );
};

export default Tilt;

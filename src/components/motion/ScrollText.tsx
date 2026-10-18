import { useRef } from 'react';
import { useScrollVar } from '../../lib/motion';

export interface TextPart {
  text: string;
  className?: string;
}

/**
 * A paragraph whose words light up one after another as it scrolls through the screen.
 * Without scroll updates (reduced motion) every word is fully lit.
 */
const ScrollText = ({ parts, className = '' }: { parts: TextPart[]; className?: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  useScrollVar(ref, '--read', (element) => {
    const vh = window.innerHeight;
    const top = element.getBoundingClientRect().top;
    return (vh * 0.85 - top) / (vh * 0.5);
  });

  const words = parts.flatMap((part) =>
    part.text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((word) => ({ word, className: part.className }))
  );
  const total = words.filter((w) => w.word.trim()).length;
  let index = 0;

  return (
    <p ref={ref} className={className}>
      {words.map(({ word, className: wordClass }, i) => {
        if (!word.trim()) return word;
        const n = index++;
        return (
          <span
            key={i}
            className={`transition-opacity duration-300 ${wordClass ?? ''}`}
            style={{ opacity: `clamp(0.22, calc(var(--read, 1) * ${total + 4} - ${n}), 1)` }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
};

export default ScrollText;

import { useEffect, useId, useState } from 'react';
import type { Diagram, DiagramNode, DiagramNodeKind } from '../../types';

/**
 * Draws a case-study diagram as inline SVG: rows of boxes from top to bottom, joined by arrows.
 * Two layouts from the same data: a wide one for tablets and up, a narrow one for phones,
 * so text keeps a readable size instead of shrinking with the drawing.
 * Colours come from the site's CSS variables, so the diagram follows the light and dark themes.
 */

const WIDE = 760;
const NARROW = 360;
const PAD_X = 14;
const GAP_X = 14;
const GAP_Y = 46;
const LABEL = 14;
const SUB = 11.5;
const LINE_H = 17;
const SUB_LINE_H = 14.5;
const PAD_Y = 12;

const AMBER = '245 158 11';
const ROSE = '244 63 94';

/** Accent per kind, as "r g b" or a CSS variable reference. */
const accent: Record<DiagramNodeKind, string> = {
  io: 'var(--c-muted)',
  core: 'var(--c-accent)',
  ai: 'var(--c-violet)',
  human: 'var(--c-signal)',
  gate: AMBER,
  stop: ROSE
};

const legend: { kind: DiagramNodeKind; label: string }[] = [
  { kind: 'core', label: 'Code' },
  { kind: 'ai', label: 'AI model' },
  { kind: 'gate', label: 'Check' },
  { kind: 'human', label: 'Person' },
  { kind: 'stop', label: 'Stops here' }
];

const rgb = (value: string, alpha = 1) => `rgb(${value} / ${alpha})`;

/** Greedy word wrap by an average character width. */
const wrap = (text: string, maxWidth: number, size: number) => {
  const perChar = size * 0.55;
  const max = Math.max(6, Math.floor(maxWidth / perChar));
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
};

interface Box {
  node: DiagramNode;
  x: number;
  y: number;
  w: number;
  h: number;
  labelLines: string[];
  subLines: string[];
}

const layout = (rows: DiagramNode[][], width: number) => {
  const boxes = new Map<string, Box>();
  let y = 8;
  for (const row of rows) {
    const count = row.length;
    // Lone boxes stay narrower than the drawing so arrows read as a column.
    const maxRowWidth = width - PAD_X * 2;
    const single = Math.min(maxRowWidth, width >= WIDE ? 340 : 280);
    const w = count === 1 ? single : (maxRowWidth - GAP_X * (count - 1)) / count;
    const inner = w - 20;
    const measured = row.map((node) => {
      const labelLines = wrap(node.label, inner, LABEL);
      const subLines = node.sub ? wrap(node.sub, inner, SUB) : [];
      const h = PAD_Y * 2 + labelLines.length * LINE_H + subLines.length * SUB_LINE_H + (subLines.length ? 2 : 0);
      return { node, labelLines, subLines, h };
    });
    const rowH = Math.max(...measured.map((m) => m.h));
    const total = w * count + GAP_X * (count - 1);
    let x = (width - total) / 2;
    for (const m of measured) {
      boxes.set(m.node.id, { ...m, x, y, w, h: rowH });
      x += w + GAP_X;
    }
    y += rowH + GAP_Y;
  }
  return { boxes, height: y - GAP_Y + 8 };
};

const useNarrow = () => {
  const query = '(max-width: 639px)';
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setNarrow(list.matches);
    update();
    list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, []);
  return narrow;
};

const FlowDiagram = ({ diagram }: { diagram: Diagram }) => {
  const narrow = useNarrow();
  const width = narrow ? NARROW : WIDE;
  const { boxes, height } = layout(diagram.rows, width);
  const id = useId().replace(/:/g, '');
  const used = new Set(diagram.rows.flat().map((n) => n.kind ?? 'core'));

  // Arrows that go back up (loops) drop below their box, then run up the nearest side margin,
  // one lane each, so they never cut through other boxes.
  const all = [...boxes.values()];
  const rightEdge = Math.max(...all.map((b) => b.x + b.w));
  const leftEdge = Math.min(...all.map((b) => b.x));
  let rightLanes = 0;
  let leftLanes = 0;
  const edges = diagram.edges.map((edge, i) => {
    const a = boxes.get(edge.from);
    const b = boxes.get(edge.to);
    if (!a || !b) return null;
    let d: string;
    let lx: number;
    let ly: number;
    if (b.y > a.y) {
      const x1 = a.x + a.w / 2;
      const y1 = a.y + a.h;
      const x2 = b.x + b.w / 2;
      const y2 = b.y - 3;
      const mid = (y1 + y2) / 2;
      d = `M${x1} ${y1} C${x1} ${mid} ${x2} ${mid} ${x2} ${y2}`;
      lx = (x1 + x2) / 2;
      ly = mid;
    } else if (b.y === a.y) {
      const leftToRight = b.x > a.x;
      const x1 = leftToRight ? a.x + a.w : a.x;
      const x2 = leftToRight ? b.x - 3 : b.x + b.w + 3;
      const yy = a.y + a.h / 2;
      d = `M${x1} ${yy} L${x2} ${yy}`;
      lx = (x1 + x2) / 2;
      ly = yy - 8;
    } else {
      const onRight = a.x + a.w / 2 >= width / 2;
      const laneX = onRight ? rightEdge + 12 + rightLanes++ * 9 : leftEdge - 12 - leftLanes++ * 9;
      const x1 = a.x + a.w / 2;
      const y1 = a.y + a.h;
      const drop = y1 + 12;
      const y2 = b.y + b.h / 2;
      const x2 = onRight ? b.x + b.w + 3 : b.x - 3;
      d = `M${x1} ${y1} V${drop} H${laneX} V${y2} H${x2}`;
      lx = onRight ? laneX : laneX - 30;
      ly = (drop + y2) / 2;
    }
    return (
      <g key={i}>
        <path
          d={d}
          fill="none"
          stroke={edge.dashed ? rgb('var(--c-muted)', 0.75) : rgb('var(--c-accent)', 0.7)}
          strokeWidth={1.6}
          strokeDasharray={edge.dashed ? '5 5' : undefined}
          markerEnd={`url(#${id}-${edge.dashed ? 'muted' : 'accent'})`}
        />
        {edge.label && (
          <text x={lx + 6} y={ly + 4} fontSize={11} fontWeight={600} style={{ fill: rgb('var(--c-muted)') }}>
            {edge.label}
          </text>
        )}
      </g>
    );
  });

  // Room for loop lanes on either side.
  const viewLeft = leftLanes ? Math.min(0, leftEdge - 16 - leftLanes * 9) : 0;
  const viewRight = rightLanes ? Math.max(width, rightEdge + 16 + rightLanes * 9) : width;
  const viewWidth = viewRight - viewLeft;

  return (
    <figure className="m-0">
      <div className="rounded-2xl border border-line bg-card/30 p-4 backdrop-blur-sm sm:p-8">
        <svg
          viewBox={`${viewLeft} 0 ${viewWidth} ${height}`}
          className="mx-auto block h-auto w-full"
          style={{ maxWidth: narrow ? undefined : viewWidth * 1.1 }}
          role="img"
          aria-labelledby={`${id}-title`}
          fontFamily="Inter, system-ui, sans-serif"
        >
          <title id={`${id}-title`}>{`${diagram.title}. ${diagram.caption}`}</title>
          <defs>
            {(['accent', 'muted'] as const).map((tone) => (
              <marker key={tone} id={`${id}-${tone}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" style={{ fill: rgb(tone === 'accent' ? 'var(--c-accent)' : 'var(--c-muted)', 0.85) }} />
              </marker>
            ))}
          </defs>
          {edges}
          {[...boxes.values()].map(({ node, x, y, w, h, labelLines, subLines }) => {
            const kind = node.kind ?? 'core';
            const tone = accent[kind];
            const textTop = y + h / 2 - (labelLines.length * LINE_H + subLines.length * SUB_LINE_H + (subLines.length ? 2 : 0)) / 2;
            return (
              <g key={node.id}>
                <rect x={x} y={y} width={w} height={h} rx={12} style={{ fill: rgb('var(--c-card)', 0.92), stroke: rgb(tone, kind === 'io' ? 0.45 : 0.6) }} strokeWidth={1.3} />
                <rect x={x} y={y + 10} width={3} height={h - 20} rx={1.5} style={{ fill: rgb(tone, kind === 'io' ? 0.5 : 0.95) }} />
                {labelLines.map((line, li) => (
                  <text key={li} x={x + w / 2} y={textTop + LINE_H * (li + 1) - 4} textAnchor="middle" fontSize={LABEL} fontWeight={600} style={{ fill: rgb('var(--c-ink)') }}>
                    {line}
                  </text>
                ))}
                {subLines.map((line, si) => (
                  <text
                    key={si}
                    x={x + w / 2}
                    y={textTop + labelLines.length * LINE_H + 2 + SUB_LINE_H * (si + 1) - 3}
                    textAnchor="middle"
                    fontSize={SUB}
                    style={{ fill: rgb('var(--c-muted)') }}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
        <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted" aria-label="Key">
          {legend
            .filter((item) => used.has(item.kind))
            .map((item) => (
              <li key={item.kind} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: rgb(accent[item.kind]) }} aria-hidden="true" />
                {item.label}
              </li>
            ))}
        </ul>
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-muted">
        <span className="font-semibold text-ink">{diagram.title}.</span> {diagram.caption}
      </figcaption>
    </figure>
  );
};

export default FlowDiagram;

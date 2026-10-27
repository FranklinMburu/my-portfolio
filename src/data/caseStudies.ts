import type { CaseStudy } from '../types';

/**
 * Case studies shown at /projects/:slug.
 *
 * Facts only: each statement comes from the project's public repository, from what was
 * checked by hand on the live deployment, or from Franklin's own project records.
 * Keep "limits" as honest as "results".
 */

export const floodCaseStudy: CaseStudy = {
  summary: 'An auditable flood-loss engine for a 600-building Nairobi portfolio, built to stop rather than guess.',
  role: 'Team lead. I built the backend and the catastrophe-risk model; teammates built the interface.',
  context: 'Kenya Re AI4Insurance Hackathon 2026, Nairobi Urban Flood Challenge',
  year: '2026',
  problem: [
    'An insurer holding many buildings in Nairobi needs to know what a flood could cost the portfolio, and an underwriter has to be able to see how every figure was reached.',
    'The organisers supplied a synthetic portfolio of 600 buildings and hazard layers that rank flood susceptibility. The layers say where flooding is more likely; they do not give flood depths or how often floods happen. The challenge was to produce loss figures that stay honest about that gap and can be audited line by line.'
  ],
  architecture: [
    'The engine runs one chain, in order: hazard, exposure, vulnerability, financial loss, portfolio risk, AI analysis, human decision. Each stage is a separate checkpoint with its own checks, and a failed check stops the run.',
    'A FastAPI upload service adapts CSV, XLSX, GeoJSON and PDF tables into the exposure format. Validation applies rules V1 to V11. The configuration holds four default loss scenarios, every value tagged with its source. Building losses are added up into tier summaries and five loss points per scenario, and every output table carries the run ID of the record that produced it.',
    'New buildings can also arrive as free text. An AI model may only extract facts it can quote word for word; a deterministic verifier checks each quote and number, and a person approves before anything reaches the engine.'
  ],
  diagrams: [
    {
      title: 'How a run flows',
      caption: 'Both inputs end up as exposure rows; amber steps are checks that stop the run when they fail.',
      rows: [
        [
          { id: 'file', label: 'Exposure file', sub: 'CSV, XLSX, GeoJSON, PDF table', kind: 'io' },
          { id: 'text', label: 'Free-text submission', sub: 'new buildings', kind: 'io' }
        ],
        [
          { id: 'upload', label: 'Upload service', sub: 'FastAPI adapter', kind: 'core' },
          { id: 'ai', label: 'AI extraction', sub: 'exact quotes only', kind: 'ai' }
        ],
        [
          { id: 'valid', label: 'Validation', sub: 'rules V1 to V11', kind: 'gate' },
          { id: 'human', label: 'Verifier, then a person', sub: 'approve, reject or review', kind: 'human' }
        ],
        [{ id: 'engine', label: 'Loss engine', sub: 'four tagged scenarios', kind: 'core' }],
        [{ id: 'agg', label: 'Portfolio totals', sub: 'checks C1 to C8', kind: 'gate' }],
        [{ id: 'out', label: 'Five loss points per scenario', sub: 'every table carries its run ID', kind: 'io' }]
      ],
      edges: [
        { from: 'file', to: 'upload' },
        { from: 'text', to: 'ai' },
        { from: 'upload', to: 'valid' },
        { from: 'ai', to: 'human' },
        { from: 'valid', to: 'engine' },
        { from: 'human', to: 'engine' },
        { from: 'engine', to: 'agg' },
        { from: 'agg', to: 'out' }
      ]
    },
    {
      title: 'From a submission to a model run',
      caption: 'The approval records hashes of everything it saw, so a changed input can never run on an old approval.',
      rows: [
        [{ id: 'doc', label: 'Submitted document', kind: 'io' }],
        [{ id: 'extract', label: 'AI extracts stated facts', sub: 'each with an exact quote', kind: 'ai' }],
        [
          { id: 'verify', label: 'Verifier checks quotes and numbers', kind: 'gate' },
          { id: 'rejected', label: 'Rejected', sub: 'nothing runs', kind: 'stop' }
        ],
        [{ id: 'decide', label: 'A person decides', sub: 'every flag acknowledged by name', kind: 'human' }],
        [
          { id: 'lock', label: 'Approval locked by hashes', kind: 'core' },
          { id: 'stale', label: 'Input changed', sub: 'approval is stale', kind: 'stop' }
        ],
        [{ id: 'run', label: 'Exposure rows, then the model runs', kind: 'io' }]
      ],
      edges: [
        { from: 'doc', to: 'extract' },
        { from: 'extract', to: 'verify' },
        { from: 'verify', to: 'rejected', dashed: true },
        { from: 'verify', to: 'decide' },
        { from: 'decide', to: 'lock' },
        { from: 'lock', to: 'stale', dashed: true },
        { from: 'lock', to: 'run' }
      ]
    }
  ],
  decisions: [
    {
      title: 'Stop the run instead of fixing the data',
      chose: 'Any exposure row that breaks one of the rules V1 to V11 stops the run with the reason. Nothing is ever corrected.',
      rejected: 'Cleaning the file on the way in: filling gaps, clamping odd values, dropping bad rows.',
      why: 'A silently repaired portfolio still produces a confident loss figure, and nobody can trace where it went wrong. A stop says exactly which row and which rule to fix.'
    },
    {
      title: 'Tag every parameter with its source',
      chose: 'Each configuration value carries a source tag, and the whole set is hashed into a parameter set ID. The same values always give the same ID.',
      rejected: 'Constants written into the code, with assumptions explained only in documents.',
      why: 'Every loss result can be traced to the exact parameters behind it, and changing one assumption produces a new, visible ID.'
    },
    {
      title: 'Let the AI read, and a person decide',
      chose: 'The model only extracts facts it can quote. A deterministic verifier checks every quote and number, and a person approves, rejects or asks for review.',
      rejected: 'Letting the model fill gaps, estimate values or approve its own output.',
      why: 'Insurance figures need a traceable source and a named decision. The model is useful for reading documents, not for vouching for them.'
    }
  ],
  results: [
    'Under the reference scenario, modelled portfolio loss rises from about KES 468m at the 10-year tier to about KES 5.10bn at the 250-year tier.',
    'Every output table carries the ID of the run record that produced it, and each configuration has a reproducible parameter set ID.',
    'The pytest suite runs on GitHub Actions on every push.',
    'The live demo opens without signing in and shows the dashboard, risk map, exposure, loss analysis, reports and model runs (checked on 19 October 2026).'
  ],
  limits: [
    'The 600 buildings are synthetic, supplied by the organisers. They do not describe real properties.',
    'The hazard layers rank susceptibility. They are not flood depths, so the return periods attached to the five tiers are provisional assumptions.',
    'Expected annual loss, PML and TVaR are deliberately not reported: the five points leave annual loss anywhere between about KES 104m and 371m.',
    'One damage curve is used for all housing classes, and the class damage ceilings are team assumptions, not calibrated values.',
    'The approver’s name is recorded but not authenticated.',
    'In the live demo, approving the example submission or running the model from Submissions often fails with “Submission not found”.'
  ]
};

export const ailayerCaseStudy: CaseStudy = {
  summary: 'One ask() call in front of four free LLM providers, and a measured answer to whether free models are good enough.',
  role: 'Design, code and evaluation',
  context: 'Shared infrastructure for my own AI projects, in development',
  year: '2026',
  problem: [
    'My projects call language models from several free tiers. Each provider has its own client library, limits and ways of failing: a rate limit from one stalls a whole run, and open models often wrap their answer in reasoning text that breaks JSON.',
    'I wanted one interface that hides those differences, costs nothing to run and keeps going when a provider says no. I also wanted evidence on how good free models really are before building anything on them.'
  ],
  architecture: [
    'A caller asks for an answer and names a tier: bulk, standard, critical or private. The router picks the models for that tier across Google (Gemini and hosted Gemma), Groq, NVIDIA and local Ollama, and paces each model separately.',
    'Server errors are retried. A rate limit puts that model on a cooldown and the request moves to another model or provider. Answers from open models have their reasoning traces stripped, and when JSON is expected the output is validated, with one repair round if it fails.',
    'Usage is logged without prompts, outputs or keys. Around the package sit a probe tool that checks which models each key can reach without printing the key, an offline test suite that runs against a fake server, and a blind evaluation harness.'
  ],
  diagrams: [
    {
      title: 'One request, end to end',
      caption: 'The caller sees one function; providers, pacing and clean-up stay behind it.',
      rows: [
        [{ id: 'ask', label: 'ask(prompt, tier)', sub: 'bulk, standard, critical, private', kind: 'io' }],
        [{ id: 'route', label: 'Router', sub: 'models for the tier', kind: 'core' }],
        [{ id: 'pace', label: 'Pacing per model', kind: 'gate' }],
        [
          { id: 'gemini', label: 'Gemini', sub: 'and Gemma', kind: 'ai' },
          { id: 'groq', label: 'Groq', kind: 'ai' },
          { id: 'nvidia', label: 'NVIDIA', kind: 'ai' },
          { id: 'ollama', label: 'Ollama', sub: 'local', kind: 'ai' }
        ],
        [{ id: 'clean', label: 'Strip reasoning traces', kind: 'core' }],
        [{ id: 'json', label: 'JSON check', sub: 'one repair round', kind: 'gate' }],
        [{ id: 'answer', label: 'Answer and usage log', sub: 'no prompts, outputs or keys', kind: 'io' }]
      ],
      edges: [
        { from: 'ask', to: 'route' },
        { from: 'route', to: 'pace' },
        { from: 'pace', to: 'gemini' },
        { from: 'pace', to: 'groq' },
        { from: 'pace', to: 'nvidia' },
        { from: 'pace', to: 'ollama' },
        { from: 'gemini', to: 'clean' },
        { from: 'groq', to: 'clean' },
        { from: 'nvidia', to: 'clean' },
        { from: 'ollama', to: 'clean' },
        { from: 'clean', to: 'json' },
        { from: 'json', to: 'answer' }
      ]
    },
    {
      title: 'When a call fails',
      caption: 'Resilience comes from other models and providers, not from extra keys.',
      rows: [
        [{ id: 'call', label: 'Call the next model in the tier', kind: 'core' }],
        [
          { id: 'err', label: 'Server error', kind: 'gate' },
          { id: 'limit', label: 'Rate limited', kind: 'gate' },
          { id: 'ok', label: 'Answer', kind: 'io' }
        ],
        [
          { id: 'retry', label: 'Retry', sub: 'same model', kind: 'core' },
          { id: 'cool', label: 'Cooldown', sub: 'try another model or provider', kind: 'core' },
          { id: 'valid', label: 'Valid JSON?', kind: 'gate' }
        ],
        [
          { id: 'done', label: 'Return the answer', kind: 'io' },
          { id: 'repair', label: 'One repair round', kind: 'core' }
        ]
      ],
      edges: [
        { from: 'call', to: 'err' },
        { from: 'call', to: 'limit' },
        { from: 'call', to: 'ok' },
        { from: 'err', to: 'retry' },
        { from: 'limit', to: 'cool' },
        { from: 'ok', to: 'valid' },
        { from: 'retry', to: 'call', dashed: true },
        { from: 'cool', to: 'call', dashed: true },
        { from: 'valid', to: 'repair', label: 'no', dashed: true },
        { from: 'valid', to: 'done', label: 'yes' },
        { from: 'repair', to: 'done' }
      ]
    }
  ],
  decisions: [
    {
      title: 'Standard library only',
      chose: 'The package needs nothing outside the Python standard library.',
      rejected: 'Each provider’s own SDK.',
      why: 'It drops into any project with nothing to install and no dependency clashes, which matters when several small projects share it.'
    },
    {
      title: 'One account per provider, fall back instead',
      chose: 'One account per provider and no key rotation. When a model is limited, the request moves to another model or provider.',
      rejected: 'Rotating several keys on the same provider to stretch its free limits.',
      why: 'Resilience comes from having several providers rather than several keys, and usage stays simple to account for.'
    },
    {
      title: 'Measure before integrating',
      chose: 'A blind evaluation first. The gateway is deliberately not yet plugged into the Content Studio.',
      rejected: 'Swapping it into the Content Studio as soon as it worked.',
      why: 'The evaluation showed free mid-size models fall short on storytelling. Integrating first would have lowered the quality of every video.'
    }
  ],
  results: [
    'When grounded on source pages, free mid-size models wrote accurate scripts, but scored about 3.0 out of 5 for storytelling against 4.3 for the reference model (Claude).',
    'Grounding fixed factual accuracy. A second editing pass did not raise the storytelling score.',
    'It costs nothing to run: free tiers only.'
  ],
  limits: [
    'The code is not public yet.',
    'Phase 2, testing large open models through NVIDIA and Groq, is still in progress.',
    'Free tiers change their limits and model lists without notice, so the tier configuration needs upkeep.'
  ]
};

export const miniAgenticCaseStudy: CaseStudy = {
  summary: 'Three Gemini workers plan, write and review, and nothing they return runs until it passes a strict check.',
  role: 'Design, code and tests',
  context: 'Personal project, public on GitHub',
  year: '2026',
  problem: [
    'An agent that writes files acts on whatever the model returns. A malformed reply, an unknown action or a path outside the project can do real damage, and a run that takes minutes is a black box while it happens.',
    'The goal was a small engine that splits work between specialised workers, checks every action before it runs and shows each step live.'
  ],
  architecture: [
    'A FastAPI server exposes REST endpoints for runs and a WebSocket for live events. The orchestrator runs the control loop: it sends each step to the Planner (at most eight steps), the Coder or the Reviewer, applies the action that comes back and saves state after every operation.',
    'Workers call Gemini through the google-genai client behind a token-bucket rate limiter. Every reply must be strict JSON describing one known action. File tools are confined to a workspace folder, and every event goes into a buffer of the last 2,000 events that streams to the dashboard.'
  ],
  diagrams: [
    {
      title: 'The parts',
      caption: 'The orchestrator is the only part that acts; workers only propose. Events stream back to the dashboard.',
      rows: [
        [{ id: 'ui', label: 'Live dashboard', sub: 'browser', kind: 'io' }],
        [{ id: 'server', label: 'FastAPI server', sub: 'REST and WebSocket', kind: 'core' }],
        [
          { id: 'tools', label: 'Tools', sub: 'workspace files, memory', kind: 'core' },
          { id: 'orch', label: 'Orchestrator', sub: 'saves state each step', kind: 'core' },
          { id: 'events', label: 'Event bus', sub: 'last 2,000 events', kind: 'core' }
        ],
        [
          { id: 'planner', label: 'Planner', kind: 'ai' },
          { id: 'coder', label: 'Coder', kind: 'ai' },
          { id: 'reviewer', label: 'Reviewer', kind: 'ai' }
        ],
        [{ id: 'gemini', label: 'Gemini', sub: 'rate limited', kind: 'ai' }]
      ],
      edges: [
        { from: 'ui', to: 'server' },
        { from: 'server', to: 'orch' },
        { from: 'orch', to: 'tools' },
        { from: 'orch', to: 'events' },
        { from: 'orch', to: 'planner' },
        { from: 'orch', to: 'coder' },
        { from: 'orch', to: 'reviewer' },
        { from: 'planner', to: 'gemini' },
        { from: 'coder', to: 'gemini' },
        { from: 'reviewer', to: 'gemini' },
        { from: 'events', to: 'ui', dashed: true }
      ]
    },
    {
      title: 'What happens to a worker’s reply',
      caption: 'A reply that fails a check is rejected with a reason; it never reaches the file system.',
      rows: [
        [{ id: 'reply', label: 'Worker reply', kind: 'ai' }],
        [{ id: 'parse', label: 'Parse strict JSON', kind: 'gate' }],
        [
          { id: 'check', label: 'Known action, required fields', kind: 'gate' },
          { id: 'reject', label: 'Rejected with a reason', kind: 'stop' }
        ],
        [
          { id: 'file', label: 'Write a file or call a tool', kind: 'core' },
          { id: 'path', label: 'Path stays in the workspace', kind: 'gate' },
          { id: 'flow', label: 'Plan, finish a step or ask the user', kind: 'core' }
        ],
        [{ id: 'save', label: 'Run, save state, emit event', kind: 'io' }]
      ],
      edges: [
        { from: 'reply', to: 'parse' },
        { from: 'parse', to: 'check' },
        { from: 'parse', to: 'reject', dashed: true },
        { from: 'check', to: 'reject', dashed: true },
        { from: 'check', to: 'file' },
        { from: 'check', to: 'flow' },
        { from: 'file', to: 'path' },
        { from: 'path', to: 'save' },
        { from: 'flow', to: 'save' }
      ]
    }
  ],
  decisions: [
    {
      title: 'Check every action against a fixed shape',
      chose: 'Each reply must be strict JSON with one known action type (plan, tool call, write file, step complete, need user) and the right fields for it.',
      rejected: 'Running whatever the model returns, or reading actions out of free text.',
      why: 'A malformed or unknown action stops at the check with a stated reason, instead of reaching tools that change files.'
    },
    {
      title: 'Confine file tools to a workspace',
      chose: 'No absolute paths, no "..", and the resolved path must stay inside the workspace, which also blocks escapes through symlinks.',
      rejected: 'Trusting paths written by the model.',
      why: 'The Coder writes files from model output. With the sandbox, the worst case is a bad file inside the workspace.'
    },
    {
      title: 'Spend the free quota carefully',
      chose: 'A token-bucket rate limiter (5 requests a minute by default, set by environment variables) and retries only for timeouts, network errors and 5xx responses, after 1, 2 and 4 seconds.',
      rejected: 'No limit, or retrying every failure.',
      why: 'Free-tier quotas are small. Retrying a request that can never succeed only burns quota and hides the real error.'
    }
  ],
  results: [
    'Public code with 66 automated tests across ten test files.',
    'On 27 October 2026 the model calls were moved from a wrapper around the removed google.generativeai text call to the google-genai client. All 66 tests pass with the change, up from 59.'
  ],
  limits: [
    'That fix is on a branch that has not yet been merged, so the public main branch still fails when it calls the model.',
    'There is no live demo. The server needs WebSockets, background threads and a local disk, so it needs a long-running host rather than serverless hosting.',
    'The tests use stand-ins for the model; a full run against Gemini was not part of this check.',
    'The default rate suits the free tier, so runs are slow.'
  ]
};

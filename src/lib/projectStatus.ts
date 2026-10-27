/** Status colours and hover hints shared by project cards and case-study pages. */

export const statusHint: Record<string, string> = {
  Live: 'A working public deployment is linked',
  'Public code': 'Source code is public on GitHub',
  Hackathon: 'Built during a hackathon; source code is public',
  Private: 'Source code and deployment are not public',
  'In Development': 'Still being built'
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Live':
      return 'bg-signal/15 text-green-700 dark:text-green-400 border-signal/30';
    case 'Public code':
      return 'bg-primary-cyan/15 text-primary-cyan border-primary-cyan/30';
    case 'Hackathon':
      return 'bg-accent-purple/15 text-violet-700 dark:text-purple-300 border-accent-purple/30';
    case 'In Development':
      return 'bg-yellow-500/15 text-amber-700 dark:text-yellow-400 border-yellow-500/30';
    case 'Private':
      return 'bg-subtle/15 text-muted border-subtle/30';
    default:
      return 'bg-primary-blue/15 text-primary-blue border-primary-blue/30';
  }
};

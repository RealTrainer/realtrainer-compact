import { Badge } from '../atoms/Badge';

interface WorkoutHeaderProps {
  title: string;
  date: string;
  tags: string[];
  emojis?: string;
  points?: number;
}

export function WorkoutHeader({ title, date, tags, emojis, points }: WorkoutHeaderProps) {
  return (
    <header className="space-y-4 border-b border-slate-700/70 pb-5">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-[0.28em] text-slate-100 sm:text-4xl">{title}</h1>
        <p className="text-sm text-slate-400">{date}</p>
        {typeof points === 'number' && <Badge tone="warn">{points}/100</Badge>}
      </div>

      {(tags.length > 0 || emojis) && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tags.map((tag) => (
            <Badge key={tag} tone="good">
              {tag}
            </Badge>
          ))}
          {emojis && <Badge tone="accent">{emojis}</Badge>}
        </div>
      )}
    </header>
  );
}

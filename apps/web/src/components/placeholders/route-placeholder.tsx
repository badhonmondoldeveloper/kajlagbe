import Link from 'next/link';
import { Badge } from '@kajlagbe/ui';

interface RoutePlaceholderProps {
  title: string;
  category: string;
  moduleTarget: string;
  description: string;
  backHref?: string;
}

export function RoutePlaceholder({
  title,
  category,
  moduleTarget,
  description,
  backHref = '/',
}: RoutePlaceholderProps) {
  return (
    <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6">
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center sm:p-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Badge variant="secondary">{category}</Badge>
          <Badge variant="outline">{moduleTarget}</Badge>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500 leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            href={backHref}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            ← Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}


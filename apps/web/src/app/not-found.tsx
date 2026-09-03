import Link from 'next/link';
import { EmptyState } from '@kajlagbe/ui';

export default function RootNotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <EmptyState
        title="404 — Page Not Found"
        description="The page or marketplace resource you are looking for does not exist or has been relocated."
        action={
          <Link
            href="/"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Return to Marketplace Home
          </Link>
        }
      />
    </div>
  );
}


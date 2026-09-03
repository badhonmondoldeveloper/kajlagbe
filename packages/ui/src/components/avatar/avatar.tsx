import * as React from 'react';
import { User } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
}

export function Avatar({
  src,
  alt = '',
  fallback,
  size = 'md',
  isOnline,
  className,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const getInitials = (text: string) => {
    return text
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-full bg-slate-100 font-semibold text-slate-700 ring-2 ring-white select-none',
          sizes[size],
          className,
        )}
        {...props}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : fallback ? (
          <span>{getInitials(fallback)}</span>
        ) : (
          <User className="h-1/2 w-1/2 text-slate-400" />
        )}
      </div>
      {isOnline !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
            size === 'sm' ? 'h-2 w-2' : 'h-2.5 w-2.5',
            isOnline ? 'bg-emerald-500' : 'bg-slate-300',
          )}
        />
      )}
    </div>
  );
}

export function AvatarGroup({
  children,
  limit = 4,
  className,
}: {
  children: React.ReactNode;
  limit?: number;
  className?: string;
}) {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, limit);
  const remaining = items.length - limit;

  return (
    <div className={cn('flex items-center -space-x-2.5 overflow-hidden', className)}>
      {visible}
      {remaining > 0 && (
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 ring-2 ring-white select-none">
          +{remaining}
        </div>
      )}
    </div>
  );
}


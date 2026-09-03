import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface StarRatingProps {
  value: number; // 0 to 5
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (val: number) => void;
  className?: string;
}

export function StarRating({
  value,
  max = 5,
  size = 'md',
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  const [hoverVal, setHoverVal] = React.useState<number | null>(null);

  const sizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-6 w-6',
  };

  const activeValue = hoverVal !== null ? hoverVal : value;

  return (
    <div className={cn('inline-flex items-center gap-1 select-none', className)}>
      {Array.from({ length: max }).map((_, idx) => {
        const starIndex = idx + 1;
        const isFilled = starIndex <= activeValue;
        const isHalf = !isFilled && starIndex - 0.5 <= activeValue;

        return (
          <button
            key={idx}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starIndex)}
            onMouseEnter={() => interactive && setHoverVal(starIndex)}
            onMouseLeave={() => interactive && setHoverVal(null)}
            className={cn(
              'transition-transform',
              interactive ? 'cursor-pointer hover:scale-110 focus:outline-none' : 'cursor-default pointer-events-none',
            )}
            aria-label={`Rate ${starIndex} stars`}
          >
            <Star
              className={cn(
                sizes[size],
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : isHalf
                  ? 'fill-amber-200 text-amber-400'
                  : 'fill-slate-100 text-slate-300',
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export function RatingSummary({
  rating,
  totalReviews,
  breakdown,
  className,
}: {
  rating: number;
  totalReviews: number;
  breakdown?: { [stars: number]: number }; // percentage 0-100
  className?: string;
}) {
  return (
    <div className={cn('space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs', className)}>
      <div className="flex items-center gap-4">
        <div className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">
          {rating.toFixed(1)}
        </div>
        <div className="space-y-1">
          <StarRating value={rating} size="sm" />
          <p className="text-xs text-slate-500">
            {totalReviews} টি রিভিউ এর গড় রেটিং
          </p>
        </div>
      </div>

      {breakdown && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          {[5, 4, 3, 2, 1].map((stars) => {
            const pct = breakdown[stars] || 0;
            return (
              <div key={stars} className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-3 text-right font-medium">{stars}</span>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
                <div className="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-slate-400 font-mono">{pct}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


import { LoadingState } from '@kajlagbe/ui';

export default function RootLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingState message="Loading KajLagbe platform..." />
    </div>
  );
}

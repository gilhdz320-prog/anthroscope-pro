import { lazy, useState, useEffect, Suspense } from 'react';
import type { Avatar3DProps } from './Avatar3D';

const Avatar3DComponent = lazy(() => import('./Avatar3D').then(m => ({ default: m.Avatar3D })));

function AvatarFallback() {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (timedOut) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center text-slate-400">
        <p className="text-sm">3D Avatar unavailable</p>
        <p className="text-xs text-slate-300 mt-1">WebGL may be disabled on this device</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] flex items-center justify-center text-slate-400">
      <p className="text-sm">Loading 3D Avatar...</p>
    </div>
  );
}

export function Avatar3DLazy(props: Avatar3DProps) {
  return (
    <Suspense fallback={<AvatarFallback />}>
      <Avatar3DComponent {...props} />
    </Suspense>
  );
}

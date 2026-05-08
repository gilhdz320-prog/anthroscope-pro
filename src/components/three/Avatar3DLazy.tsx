import { lazy, Suspense, useState, useEffect, Component, type ReactNode } from 'react';

// Local type definition - NO import from Avatar3D to avoid pulling Three.js into main bundle
export interface Avatar3DProps {
  estatura: number;
  masaCorporal: number;
  siriPorcentajeGrasa: number;
  cincoComponentes?: {
    porcentajeMuscular: number;
    porcentajeAdiposo: number;
    porcentajeOseo: number;
  };
  somatotipo?: {
    endomorfia: number;
    mesomorfia: number;
    ectomorfia: number;
  };
  labels?: {
    grasa: string;
    musculo: string;
    hueso: string;
    imo: string;
    somatotipo: string;
  };
}

class ErrorBoundary extends Component<{ children: ReactNode; onError: () => void }> {
  componentDidCatch() { this.props.onError(); }
  render() { return this.props.children; }
}

// True lazy loading - only loads Three.js when the avatar is rendered
const Avatar3DComponent = lazy(() => import('./Avatar3D').then(m => ({ default: m.Avatar3D })));

export function Avatar3DLazy(props: Avatar3DProps) {
  const [showFallback, setShowFallback] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full text-[#8a8d9e]">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-[#D4FF00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Cargando visualización 3D...</p>
              {showFallback && <p className="text-xs text-[#55576b] mt-2">Esto puede tardar unos segundos la primera vez</p>}
            </div>
          </div>
        }
      >
        {loadError ? (
          <div className="flex items-center justify-center h-full text-[#8a8d9e]">
            <p>Error cargando el avatar 3D</p>
          </div>
        ) : (
          <ErrorBoundary onError={() => setLoadError(true)}>
            <Avatar3DComponent {...props} />
          </ErrorBoundary>
        )}
      </Suspense>
    </div>
  );
}

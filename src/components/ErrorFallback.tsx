import { AlertTriangle } from 'lucide-react';

export function ErrorFallback({ name }: { name: string }) {
  return (
    <div className="p-8 text-center">
      <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
      <p className="text-sm text-[#8a8d9e]">{name}</p>
      <p className="text-xs text-[#55576b] mt-1">Cargando...</p>
    </div>
  );
}

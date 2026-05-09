import { useState, useEffect, ComponentType } from 'react';
import { ErrorFallback } from './ErrorFallback';

export function SafeComponent<T extends Record<string, unknown>>({ 
  component: Component, 
  name,
  ...props 
}: { 
  component: ComponentType<T>; 
  name: string 
} & T) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, []);

  if (hasError) {
    return <ErrorFallback name={name} />;
  }

  try {
    return <Component {...(props as T)} />;
  } catch {
    setHasError(true);
    return <ErrorFallback name={name} />;
  }
}

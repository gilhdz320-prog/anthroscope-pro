import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: '' };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[GlobalErrorBoundary] Error caught:', error);
    console.error('[GlobalErrorBoundary] Component stack:', errorInfo.componentStack);
    this.setState({ errorInfo: errorInfo.componentStack });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleClearStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">
                Algo salio mal
              </h1>
              <p className="text-sm text-gray-400">
                La aplicacion encontro un error inesperado. No te preocupes, tus datos estan seguros.
              </p>
            </div>

            {/* Error details (collapsible) */}
            <details className="text-left">
              <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400 flex items-center gap-2 justify-center">
                <Bug className="w-3 h-3" />
                Ver detalles tecnicos
              </summary>
              <div className="mt-2 p-3 bg-[#1a1a2e] rounded-lg border border-[#333] text-left overflow-auto max-h-40">
                <p className="text-xs text-red-400 font-mono mb-2">
                  {this.state.error?.name}: {this.state.error?.message}
                </p>
                {this.state.error?.stack && (
                  <pre className="text-[10px] text-gray-500 font-mono whitespace-pre-wrap">
                    {this.state.error.stack.split('\n').slice(0, 5).join('\n')}
                  </pre>
                )}
              </div>
            </details>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={this.handleReload}
                className="w-full bg-[#6366f1] hover:bg-[#5a5fdf] text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Recargar aplicacion
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex-1 border-[#333] text-gray-400 hover:bg-[#1a1a2e]"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ir al inicio
                </Button>
                <Button
                  variant="outline"
                  onClick={this.handleClearStorage}
                  className="flex-1 border-[#333] text-gray-400 hover:bg-[#1a1a2e]"
                >
                  Limpiar cache
                </Button>
              </div>
            </div>

            {/* Footer */}
            <p className="text-[10px] text-gray-600">
              Si el problema persiste, contacta soporte en gilhdz320@gmail.com
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

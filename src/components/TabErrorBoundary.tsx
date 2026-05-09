import { Component, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  tabName: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class TabErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(`Error en tab ${this.props.tabName}:`, error);
    this.setState({ error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center bg-[#11121a] border border-red-900/30 rounded-xl m-4">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <p className="text-[#f0f0f5] font-semibold mb-1">Error cargando: {this.props.tabName}</p>
          <p className="text-sm text-[#8a8d9e] mb-3">
            Este modulo no pudo cargarse. Los demas modulos siguen funcionando.
          </p>
          {this.state.error && (
            <p className="text-xs text-[#55576b] font-mono bg-black/30 p-2 rounded max-w-md mx-auto overflow-hidden text-ellipsis">
              {this.state.error.message}
            </p>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Avatar3D Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="h-[300px] flex flex-col items-center justify-center text-slate-400">
          <p className="text-sm">3D Avatar unavailable</p>
        </div>
      );
    }
    return this.props.children;
  }
}

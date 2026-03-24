import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = '알 수 없는 오류가 발생했습니다.';
      try {
        const parsed = JSON.parse(this.state.error?.message || '');
        if (parsed.error) {
          errorMessage = `Firestore 오류: ${parsed.error}`;
        }
      } catch {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100 max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">문제가 발생했습니다</h2>
            <p className="text-neutral-500 font-light leading-relaxed">
              {errorMessage}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-neutral-900 text-white py-3 rounded-full font-bold hover:bg-neutral-800 transition-all"
            >
              새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

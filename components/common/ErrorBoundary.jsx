'use client';

import { Component } from 'react';

/**
 * Error boundary component to catch and handle errors gracefully
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Something went wrong</h2>
            <p className="error-message">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button 
              className="error-button"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try again
            </button>
          </div>
          <style jsx>{`
            .error-boundary {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 400px;
              padding: 2rem;
            }
            .error-content {
              text-align: center;
              max-width: 500px;
            }
            .error-icon {
              font-size: 4rem;
              margin-bottom: 1rem;
            }
            .error-title {
              font-size: 1.5rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
              color: #d32f2f;
            }
            .error-message {
              font-size: 1rem;
              color: #666;
              margin-bottom: 1.5rem;
            }
            .error-button {
              background-color: #1976d2;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              font-size: 1rem;
              border-radius: 4px;
              cursor: pointer;
              transition: background-color 0.2s;
            }
            .error-button:hover {
              background-color: #1565c0;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

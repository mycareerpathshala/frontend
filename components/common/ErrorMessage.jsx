'use client';

/**
 * Error message component for displaying API errors
 */
export default function ErrorMessage({ 
  error, 
  onRetry = null,
  title = 'Error' 
}) {
  if (!error) return null;

  return (
    <div className="error-message-container">
      <div className="error-message-content">
        <div className="error-icon">❌</div>
        <h3 className="error-title">{title}</h3>
        <p className="error-text">{error}</p>
        {onRetry && (
          <button className="retry-button" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
      <style jsx>{`
        .error-message-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          padding: 2rem;
        }
        .error-message-content {
          text-align: center;
          max-width: 500px;
          background: #fff3f3;
          border: 1px solid #ffcdd2;
          border-radius: 8px;
          padding: 2rem;
        }
        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .error-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #d32f2f;
        }
        .error-text {
          font-size: 1rem;
          color: #666;
          margin-bottom: 1rem;
        }
        .retry-button {
          background-color: #d32f2f;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          font-size: 0.875rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .retry-button:hover {
          background-color: #c62828;
        }
      `}</style>
    </div>
  );
}

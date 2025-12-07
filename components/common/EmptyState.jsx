'use client';

/**
 * Consistent EmptyState component for displaying empty data states
 * Provides a uniform user experience across all pages
 */
export default function EmptyState({ 
  title = 'No data available', 
  description = 'There are no items to display at the moment.',
  icon = '📭',
  action = null 
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div className="empty-state-icon">{icon}</div>
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-description">{description}</p>
        {action && (
          <div className="empty-state-action">
            {action}
          </div>
        )}
      </div>
      <style jsx>{`
        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          padding: 2rem;
        }
        .empty-state-content {
          text-align: center;
          max-width: 500px;
        }
        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        .empty-state-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
        }
        .empty-state-description {
          font-size: 1rem;
          color: #666;
          margin-bottom: 1.5rem;
        }
        .empty-state-action {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}

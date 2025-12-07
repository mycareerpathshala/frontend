'use client';

import Link from 'next/link';

/**
 * University card component for displaying MBBS university information
 */
export default function UniversityCard({ university }) {
  if (!university) return null;

  const { id, attributes } = university;
  const { name, location, ranking, fees, description } = attributes || {};

  return (
    <Link href={`/mbbs/${id}`} className="university-card-link">
      <div className="university-card">
        <div className="university-card-header">
          <h3 className="university-name">{name || 'Unknown University'}</h3>
          {ranking && (
            <span className="university-ranking">Rank #{ranking}</span>
          )}
        </div>
        <div className="university-card-body">
          {location && (
            <p className="university-location">📍 {location}</p>
          )}
          {fees && (
            <p className="university-fees">💰 {fees}</p>
          )}
          {description && (
            <p className="university-description">
              {description.substring(0, 150)}
              {description.length > 150 ? '...' : ''}
            </p>
          )}
        </div>
        <div className="university-card-footer">
          <span className="view-details">View Details →</span>
        </div>
      </div>
      <style jsx>{`
        .university-card-link {
          text-decoration: none;
          color: inherit;
        }
        .university-card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .university-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        .university-card-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
        }
        .university-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          color: #1a1a1a;
        }
        .university-ranking {
          background: #1976d2;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .university-card-body {
          margin-bottom: 1rem;
        }
        .university-location,
        .university-fees {
          font-size: 0.875rem;
          color: #666;
          margin: 0.5rem 0;
        }
        .university-description {
          font-size: 0.875rem;
          color: #666;
          line-height: 1.5;
          margin: 0.75rem 0;
        }
        .university-card-footer {
          border-top: 1px solid #f0f0f0;
          padding-top: 1rem;
        }
        .view-details {
          color: #1976d2;
          font-size: 0.875rem;
          font-weight: 500;
        }
      `}</style>
    </Link>
  );
}

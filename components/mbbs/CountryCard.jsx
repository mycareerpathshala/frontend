'use client';

import Link from 'next/link';

/**
 * Country card component for displaying MBBS countries
 */
export default function CountryCard({ country }) {
  if (!country) return null;

  const { id, attributes } = country;
  const { name, flag, university_count, description } = attributes || {};

  return (
    <Link href={`/mbbs/country/${id}`} className="country-card-link">
      <div className="country-card">
        <div className="country-card-header">
          {flag && <span className="country-flag">{flag}</span>}
          <h3 className="country-name">{name || 'Unknown Country'}</h3>
        </div>
        <div className="country-card-body">
          {university_count && (
            <p className="university-count">
              🏫 {university_count} {university_count === 1 ? 'University' : 'Universities'}
            </p>
          )}
          {description && (
            <p className="country-description">
              {description.substring(0, 120)}
              {description.length > 120 ? '...' : ''}
            </p>
          )}
        </div>
        <div className="country-card-footer">
          <span className="view-universities">View Universities →</span>
        </div>
      </div>
      <style jsx>{`
        .country-card-link {
          text-decoration: none;
          color: inherit;
        }
        .country-card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .country-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        .country-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .country-flag {
          font-size: 3rem;
        }
        .country-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          color: #1a1a1a;
        }
        .country-card-body {
          margin-bottom: 1rem;
        }
        .university-count {
          font-size: 0.875rem;
          color: #666;
          margin: 0.5rem 0;
          font-weight: 500;
        }
        .country-description {
          font-size: 0.875rem;
          color: #666;
          line-height: 1.5;
          margin: 0.75rem 0;
        }
        .country-card-footer {
          border-top: 1px solid #f0f0f0;
          padding-top: 1rem;
        }
        .view-universities {
          color: #1976d2;
          font-size: 0.875rem;
          font-weight: 500;
        }
      `}</style>
    </Link>
  );
}

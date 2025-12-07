'use client';

import { useEffect, useState } from 'react';
import { getMBBSCountries, getMBBSUniversities } from '@/lib/api/mbbs';
import { verifyStrapiTokenPermissions } from '@/lib/strapi';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import ErrorMessage from '@/components/common/ErrorMessage';
import CountryCard from '@/components/mbbs/CountryCard';
import UniversityCard from '@/components/mbbs/UniversityCard';

/**
 * Main MBBS page with token verification and proper error handling
 */
export default function MBBSPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tokenValid, setTokenValid] = useState(null);
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [activeTab, setActiveTab] = useState('countries');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError(null);

    try {
      // First verify token permissions
      const tokenVerification = await verifyStrapiTokenPermissions();
      setTokenValid(tokenVerification.valid);

      if (!tokenVerification.valid) {
        setError(tokenVerification.error || 'Authentication failed. Please check your API token.');
        setLoading(false);
        return;
      }

      // Load countries and universities in parallel
      const [countriesResult, universitiesResult] = await Promise.all([
        getMBBSCountries(),
        getMBBSUniversities({ pagination: { pageSize: DEFAULT_PAGE_SIZE } }),
      ]);

      if (countriesResult.error && universitiesResult.error) {
        setError('Failed to load data. Please try again.');
      } else {
        setCountries(countriesResult.data);
        setUniversities(universitiesResult.data);
      }
    } catch (err) {
      console.error('Error loading MBBS data:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading MBBS programs..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={loadData} />;
  }

  return (
    <ErrorBoundary>
      <div className="mbbs-page">
        <header className="mbbs-header">
          <h1>MBBS Programs Abroad</h1>
          <p>Explore top medical universities around the world</p>
          {tokenValid && (
            <div className="token-status">✓ API Connected</div>
          )}
        </header>

        <div className="mbbs-tabs">
          <button
            className={`tab ${activeTab === 'countries' ? 'active' : ''}`}
            onClick={() => setActiveTab('countries')}
          >
            By Country
          </button>
          <button
            className={`tab ${activeTab === 'universities' ? 'active' : ''}`}
            onClick={() => setActiveTab('universities')}
          >
            All Universities
          </button>
        </div>

        <div className="mbbs-content">
          {activeTab === 'countries' && (
            <div className="countries-grid">
              {countries.length > 0 ? (
                countries.map((country) => (
                  <CountryCard key={country.id} country={country} />
                ))
              ) : (
                <EmptyState
                  title="No countries available"
                  description="We don't have any MBBS countries listed at the moment."
                  icon="🌍"
                />
              )}
            </div>
          )}

          {activeTab === 'universities' && (
            <div className="universities-grid">
              {universities.length > 0 ? (
                universities.map((university) => (
                  <UniversityCard key={university.id} university={university} />
                ))
              ) : (
                <EmptyState
                  title="No universities available"
                  description="We don't have any MBBS universities listed at the moment."
                  icon="🏫"
                />
              )}
            </div>
          )}
        </div>

        <style jsx>{`
          .mbbs-page {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .mbbs-header {
            text-align: center;
            margin-bottom: 2rem;
          }
          .mbbs-header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #1a1a1a;
          }
          .mbbs-header p {
            font-size: 1.125rem;
            color: #666;
          }
          .token-status {
            display: inline-block;
            margin-top: 0.5rem;
            padding: 0.25rem 0.75rem;
            background: #4caf50;
            color: white;
            border-radius: 12px;
            font-size: 0.875rem;
          }
          .mbbs-tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            border-bottom: 2px solid #e0e0e0;
          }
          .tab {
            background: none;
            border: none;
            padding: 1rem 2rem;
            font-size: 1rem;
            font-weight: 500;
            color: #666;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            margin-bottom: -2px;
            transition: all 0.2s;
          }
          .tab:hover {
            color: #1976d2;
          }
          .tab.active {
            color: #1976d2;
            border-bottom-color: #1976d2;
          }
          .countries-grid,
          .universities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
          }
          @media (max-width: 768px) {
            .countries-grid,
            .universities-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
}

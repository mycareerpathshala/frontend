'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMBBSUniversitiesByCountry } from '@/lib/api/mbbs';
import { verifyStrapiTokenPermissions } from '@/lib/strapi';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import ErrorMessage from '@/components/common/ErrorMessage';
import UniversityCard from '@/components/mbbs/UniversityCard';

/**
 * Country-specific MBBS universities page with guards and error handling
 * Validates country ID and handles API errors
 */
export default function CountryUniversitiesPage() {
  const params = useParams();
  const router = useRouter();
  const countryID = params?.countryID;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // Guard: Validate country ID
    if (!countryID || isNaN(Number(countryID))) {
      setError('Invalid country ID');
      setLoading(false);
      return;
    }

    loadCountryUniversities();
  }, [countryID]);

  async function loadCountryUniversities() {
    setLoading(true);
    setError(null);

    try {
      // Verify token before making API calls
      const tokenVerification = await verifyStrapiTokenPermissions();
      
      if (!tokenVerification.valid) {
        setError('Authentication failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      // Fetch universities for this country
      const result = await getMBBSUniversitiesByCountry(countryID);

      if (result.error) {
        setError(result.error);
      } else {
        setUniversities(result.data);
      }
    } catch (err) {
      console.error('Error loading country universities:', err);
      setError('Failed to load universities. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading universities..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={loadCountryUniversities}
        title="Failed to load universities"
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className="country-universities-page">
        <div className="page-header">
          <button onClick={() => router.back()} className="back-button">
            ← Back
          </button>
          <h1>MBBS Universities</h1>
          <p>Explore medical universities in this country</p>
        </div>

        <div className="universities-content">
          {universities.length > 0 ? (
            <div className="universities-grid">
              {universities.map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No universities found"
              description="There are no MBBS universities available in this country at the moment."
              icon="🏫"
              action={
                <button onClick={() => router.push('/mbbs')} className="action-button">
                  View All Countries
                </button>
              }
            />
          )}
        </div>

        <style jsx>{`
          .country-universities-page {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .page-header {
            margin-bottom: 2rem;
          }
          .page-header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 1rem 0 0.5rem 0;
            color: #1a1a1a;
          }
          .page-header p {
            font-size: 1.125rem;
            color: #666;
          }
          .back-button,
          .action-button {
            background: #1976d2;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            font-size: 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .back-button:hover,
          .action-button:hover {
            background: #1565c0;
          }
          .universities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
          }
          @media (max-width: 768px) {
            .universities-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMBBSUniversityById, getMBBSPrograms } from '@/lib/api/mbbs';
import { verifyStrapiTokenPermissions } from '@/lib/strapi';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import ErrorMessage from '@/components/common/ErrorMessage';

/**
 * University detail page with proper guards and error handling
 * Validates university ID and handles 401 errors
 */
export default function UniversityPage() {
  const params = useParams();
  const router = useRouter();
  const universityID = params?.universityID;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [university, setUniversity] = useState(null);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    // Guard: Validate university ID
    if (!universityID || isNaN(Number(universityID))) {
      setError('Invalid university ID');
      setLoading(false);
      return;
    }

    loadUniversityData();
  }, [universityID]);

  async function loadUniversityData() {
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

      // Fetch university and programs data
      const [universityResult, programsResult] = await Promise.all([
        getMBBSUniversityById(universityID),
        getMBBSPrograms(universityID),
      ]);

      if (universityResult.error) {
        setError(universityResult.error);
        setLoading(false);
        return;
      }

      // Guard: Check if university exists
      if (!universityResult.data) {
        setError('University not found');
        setLoading(false);
        return;
      }

      setUniversity(universityResult.data);
      setPrograms(programsResult.data || []);
    } catch (err) {
      console.error('Error loading university:', err);
      setError('Failed to load university data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading university details..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={loadUniversityData}
        title="Failed to load university"
      />
    );
  }

  // Guard: Ensure university data is available
  if (!university) {
    return (
      <EmptyState
        title="University not found"
        description="The requested university could not be found."
        icon="🏫"
        action={
          <button onClick={() => router.push('/mbbs')} className="back-button">
            Back to Universities
          </button>
        }
      />
    );
  }

  const { attributes } = university;
  const { name, location, ranking, fees, description, website, email } = attributes || {};

  return (
    <ErrorBoundary>
      <div className="university-page">
        <div className="university-header">
          <button onClick={() => router.back()} className="back-button">
            ← Back
          </button>
          <h1>{name || 'Unknown University'}</h1>
          {location && <p className="location">📍 {location}</p>}
        </div>

        <div className="university-content">
          <div className="university-info">
            {ranking && (
              <div className="info-card">
                <h3>Ranking</h3>
                <p>#{ranking}</p>
              </div>
            )}
            {fees && (
              <div className="info-card">
                <h3>Tuition Fees</h3>
                <p>{fees}</p>
              </div>
            )}
            {website && (
              <div className="info-card">
                <h3>Website</h3>
                <a href={website} target="_blank" rel="noopener noreferrer">
                  Visit Website →
                </a>
              </div>
            )}
            {email && (
              <div className="info-card">
                <h3>Contact</h3>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            )}
          </div>

          {description && (
            <div className="university-description">
              <h2>About</h2>
              <p>{description}</p>
            </div>
          )}

          <div className="programs-section">
            <h2>MBBS Programs</h2>
            {programs.length > 0 ? (
              <div className="programs-grid">
                {programs.map((program) => (
                  <div key={program.id} className="program-card">
                    <h3>{program.attributes?.name || 'MBBS Program'}</h3>
                    {program.attributes?.duration && (
                      <p>Duration: {program.attributes.duration}</p>
                    )}
                    {program.attributes?.description && (
                      <p className="program-description">
                        {program.attributes.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No programs available"
                description="This university doesn't have any MBBS programs listed yet."
                icon="📚"
              />
            )}
          </div>
        </div>

        <style jsx>{`
          .university-page {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .university-header {
            margin-bottom: 2rem;
          }
          .university-header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 1rem 0;
            color: #1a1a1a;
          }
          .location {
            font-size: 1.125rem;
            color: #666;
            margin: 0.5rem 0;
          }
          .back-button {
            background: #1976d2;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            font-size: 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .back-button:hover {
            background: #1565c0;
          }
          .university-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
          }
          .info-card {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 1.5rem;
          }
          .info-card h3 {
            font-size: 0.875rem;
            color: #666;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
          }
          .info-card p,
          .info-card a {
            font-size: 1.125rem;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0;
          }
          .info-card a {
            color: #1976d2;
            text-decoration: none;
          }
          .info-card a:hover {
            text-decoration: underline;
          }
          .university-description,
          .programs-section {
            margin-bottom: 2rem;
          }
          .university-description h2,
          .programs-section h2 {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1a1a1a;
          }
          .university-description p {
            font-size: 1rem;
            line-height: 1.6;
            color: #333;
          }
          .programs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
          }
          .program-card {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 1.5rem;
          }
          .program-card h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #1a1a1a;
          }
          .program-card p {
            font-size: 0.875rem;
            color: #666;
            margin: 0.5rem 0;
          }
          .program-description {
            margin-top: 0.75rem;
            line-height: 1.5;
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
}

'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to My Career Pathshala</h1>
        <p>Your gateway to medical education abroad</p>
        <div className="links">
          <Link href="/mbbs" className="primary-link">
            Explore MBBS Programs →
          </Link>
        </div>
      </div>
      <style jsx>{`
        .home-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .home-content {
          text-align: center;
          color: white;
        }
        .home-content h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .home-content p {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        .links {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .primary-link {
          display: inline-block;
          background: white;
          color: #667eea;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .primary-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        @media (max-width: 768px) {
          .home-content h1 {
            font-size: 2rem;
          }
          .home-content p {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}

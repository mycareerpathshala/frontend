import './globals.css';

export const metadata = {
  title: 'My Career Pathshala - MBBS Programs',
  description: 'Explore MBBS programs and universities around the world',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

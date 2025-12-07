# My Career Pathshala Frontend

A Next.js application for exploring MBBS programs and universities worldwide, with robust Strapi CMS integration and authentication handling.

## Features

- 🏥 **MBBS Programs**: Browse MBBS universities by country or view all universities
- 🔐 **Authentication**: Robust Strapi token authentication with automatic 401 error handling
- 🛡️ **Input Guards**: Validation for all dynamic routes (universityID, countryID)
- 🎨 **Consistent UI**: Uniform empty states, loading spinners, and error messages
- 📱 **Responsive Design**: Mobile-friendly interface
- ⚡ **Error Boundaries**: Graceful error handling throughout the application

## Project Structure

```
frontend/
├── app/
│   ├── (routers)/
│   │   └── mbbs/
│   │       ├── page.jsx                    # Main MBBS page
│   │       ├── [universityID]/
│   │       │   └── page.jsx               # University detail page
│   │       └── country/
│   │           └── [countryID]/
│   │               └── page.jsx           # Country universities page
│   ├── api/
│   │   └── health/
│   │       └── route.js                   # Health check endpoint
│   ├── layout.jsx                         # Root layout
│   ├── page.jsx                          # Home page
│   └── globals.css                        # Global styles
├── components/
│   ├── common/
│   │   ├── EmptyState.jsx                # Consistent empty state component
│   │   ├── ErrorBoundary.jsx             # Error boundary wrapper
│   │   ├── ErrorMessage.jsx              # Error display component
│   │   └── LoadingSpinner.jsx            # Loading state component
│   └── mbbs/
│       ├── CountryCard.jsx               # Country card component
│       └── UniversityCard.jsx            # University card component
├── lib/
│   ├── api/
│   │   └── mbbs.js                       # MBBS API functions
│   └── strapi.js                         # Strapi client with auth
└── package.json

```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A running Strapi CMS instance
- Strapi API token with appropriate permissions

### Strapi Setup Requirements

Before running this application, you need to set up the following content types in your Strapi instance:

#### 1. Countries Collection Type
```
Fields:
- name (String, required)
- flag (String) - emoji or image
- has_mbbs (Boolean)
- university_count (Number)
- description (Text)
```

#### 2. MBBS Universities Collection Type
```
Fields:
- name (String, required)
- location (String)
- ranking (Number)
- fees (String)
- description (Text)
- website (String)
- email (Email)
- country (Relation: Many-to-One with Countries)
```

#### 3. MBBS Programs Collection Type
```
Fields:
- name (String, required)
- duration (String)
- description (Text)
- university (Relation: Many-to-One with MBBS Universities)
```

**Note**: These content types must be created in Strapi with the exact API IDs:
- `countries`
- `mbbs-universities`
- `mbbs-programs`

See `lib/api/mbbs.js` for detailed schema documentation.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mycareerpathshala/frontend.git
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your Strapi credentials:
```
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your_api_token_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication & API

### Strapi Token Management

The application includes robust token management:

- **Token Storage**: Tokens are stored in localStorage on the client side
- **Token Verification**: `verifyStrapiTokenPermissions()` validates tokens before API calls
- **401 Error Handling**: Automatic token refresh on 401 Unauthorized errors
- **Fallback**: Uses environment token if localStorage token is invalid

### API Endpoints

#### Health Check
```
GET /api/health
```
Returns Strapi connection status and token validity.

### Strapi API Functions

Located in `lib/api/mbbs.js`:

- `getMBBSUniversities(params)` - Fetch all MBBS universities
- `getMBBSUniversityById(universityId)` - Get single university
- `getMBBSUniversitiesByCountry(countryId)` - Get universities by country
- `getMBBSCountries()` - Get all MBBS countries
- `getMBBSPrograms(universityId)` - Get programs for a university
- `getMBBSProgramById(programId)` - Get single program

## Hardening & Guards

All dynamic route pages include:

### Input Validation
- ✅ Verify parameters exist and are valid numbers
- ✅ Return error messages for invalid IDs

### Authentication Guards
- ✅ Token verification before API calls
- ✅ Clear error messages for authentication failures
- ✅ Automatic retry with refreshed tokens

### Error Handling
- ✅ Consistent error messages across all pages
- ✅ Retry functionality for failed requests
- ✅ Empty states when no data is available
- ✅ Loading states during data fetching

## Resolving 401 Errors

If you encounter 401 Unauthorized errors:

1. **Verify Token Permissions**: Check that your Strapi token has read permissions for:
   - `mbbs-universities`
   - `mbbs-programs`
   - `countries`

2. **Check Token in Strapi Admin**:
   - Go to Settings → API Tokens
   - Ensure your token has the correct permissions
   - Regenerate token if necessary

3. **Test Connection**:
```bash
curl http://localhost:3000/api/health
```

4. **Update Environment Variables**:
   - Ensure `NEXT_PUBLIC_STRAPI_API_TOKEN` is correctly set
   - Restart the dev server after changes

## Building for Production

```bash
npm run build
npm start
```

## Linting

```bash
npm run lint
```

## Key Improvements

1. **401 Error Handling**: Axios interceptors automatically catch and retry failed requests
2. **Consistent Empty States**: Uniform `EmptyState` component used across all pages
3. **Input Guards**: All dynamic routes validate IDs before making API calls
4. **Token Verification**: `verifyStrapiTokenPermissions()` checks token validity
5. **Error Boundaries**: React error boundaries catch and display errors gracefully
6. **Loading States**: Consistent loading spinners during data fetching

## License

MIT
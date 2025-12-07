# Architecture Documentation

## Project Overview

My Career Pathshala Frontend is a Next.js 14 application that provides an interface for browsing MBBS universities and programs worldwide, with robust Strapi CMS integration.

## Technology Stack

- **Framework**: Next.js 14.2.33 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Styled-JSX (CSS-in-JS)
- **HTTP Client**: Axios 1.6.2
- **CMS**: Strapi (headless CMS)
- **Package Manager**: npm

## Directory Structure

```
frontend/
├── app/                          # Next.js App Router pages
│   ├── (routers)/               # Route group for organization
│   │   └── mbbs/               # MBBS-related pages
│   │       ├── page.jsx        # Main listing (/mbbs)
│   │       ├── [universityID]/ # Dynamic university detail
│   │       └── country/        # Country-specific pages
│   ├── api/                    # API routes
│   │   └── health/            # Health check endpoint
│   ├── layout.jsx             # Root layout
│   ├── page.jsx              # Home page
│   └── globals.css           # Global styles
├── components/                # React components
│   ├── common/               # Reusable UI components
│   │   ├── EmptyState.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── LoadingSpinner.jsx
│   └── mbbs/                # MBBS-specific components
│       ├── CountryCard.jsx
│       └── UniversityCard.jsx
├── lib/                      # Utility libraries
│   ├── api/                 # API client functions
│   │   └── mbbs.js
│   ├── strapi.js           # Strapi client with auth
│   └── constants.js        # App-wide constants
├── public/                  # Static assets
├── .env.example            # Environment variables template
├── next.config.js         # Next.js configuration
└── package.json          # Dependencies and scripts
```

## Authentication Flow

### Token Management Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Browser                              │
│                                                               │
│  ┌──────────────┐                                            │
│  │ localStorage │  ← stores strapiToken & strapiRefreshToken │
│  └──────────────┘                                            │
│         ↑                                                     │
│         │                                                     │
│  ┌──────┴──────┐                                             │
│  │ Next.js App │                                             │
│  └──────┬──────┘                                             │
└─────────┼────────────────────────────────────────────────────┘
          │
          │ HTTP Request with Bearer Token
          ↓
┌─────────────────────────────────────────────────────────────┐
│                  Strapi API (Backend)                         │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Authorization Check                                 │    │
│  │  1. Verify token validity                           │    │
│  │  2. Check token permissions                         │    │
│  │  3. Return data or 401 error                        │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Request Interceptor Flow

```javascript
// lib/strapi.js - Request Interceptor

1. API Request Initiated
   ↓
2. Interceptor Adds Token
   - Try localStorage (client-side)
   - Fallback to env variable (server-side)
   ↓
3. Set Authorization Header
   - "Bearer {token}"
   ↓
4. Send Request to Strapi
```

### Response Interceptor Flow

```javascript
// lib/strapi.js - Response Interceptor

1. Response Received
   ↓
2. Check Status Code
   ├─ 200-299: Success → Return Data
   │
   └─ 401: Unauthorized
      ↓
   3. Check if Already Retried
      ├─ Yes: Redirect to /login
      │
      └─ No: Attempt Token Refresh
         ↓
      4. Call refreshStrapiToken()
         ├─ Try refresh token endpoint
         ├─ Fallback to env token
         │
         ├─ Success: Update localStorage
         │   ↓
         │   5. Retry Original Request
         │      ↓
         │   6. Return Response
         │
         └─ Failure: Clear localStorage
            ↓
            7. Redirect to /login
```

## Page Architecture

### Component Hierarchy

```
┌────────────────────────────────────────────────────────┐
│ ErrorBoundary (catches runtime errors)                 │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Page Component                                    │ │
│  │  ┌────────────────────────────────────────────┐  │ │
│  │  │ Loading State (LoadingSpinner)             │  │ │
│  │  └────────────────────────────────────────────┘  │ │
│  │  ┌────────────────────────────────────────────┐  │ │
│  │  │ Error State (ErrorMessage)                 │  │ │
│  │  └────────────────────────────────────────────┘  │ │
│  │  ┌────────────────────────────────────────────┐  │ │
│  │  │ Data State                                 │  │ │
│  │  │  ┌──────────────────────────────────────┐ │  │ │
│  │  │  │ Has Data: Render Cards/Content      │ │  │ │
│  │  │  └──────────────────────────────────────┘ │  │ │
│  │  │  ┌──────────────────────────────────────┐ │  │ │
│  │  │  │ No Data: EmptyState Component        │ │  │ │
│  │  │  └──────────────────────────────────────┘ │  │ │
│  │  └────────────────────────────────────────────┘  │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### Page Lifecycle

```javascript
1. Component Mount
   ↓
2. Validate Route Parameters
   ├─ Invalid: Show Error → Exit
   └─ Valid: Continue
      ↓
3. Set Loading State (true)
   ↓
4. Verify Strapi Token
   ├─ Invalid: Show Auth Error → Exit
   └─ Valid: Continue
      ↓
5. Fetch Data from API
   ├─ Error: Show Error Message
   └─ Success: Update State
      ↓
6. Set Loading State (false)
   ↓
7. Render Content
   ├─ Has Data: Display Cards/Lists
   └─ No Data: Display EmptyState
```

## API Client Architecture

### Strapi Client (`lib/strapi.js`)

```javascript
// Singleton Axios Instance
const strapiClient = axios.create({
  baseURL: `${STRAPI_API_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
});

// Request Interceptor
strapiClient.interceptors.request.use(addAuthToken);

// Response Interceptor
strapiClient.interceptors.response.use(
  handleSuccess,
  handle401AndRetry
);

// Export Functions
export { strapiClient, verifyStrapiTokenPermissions, setStrapiToken, clearStrapiToken };
```

### API Functions (`lib/api/mbbs.js`)

All API functions follow this pattern:

```javascript
export async function getResource(params) {
  try {
    const response = await strapiClient.get('/endpoint', { params });
    return {
      data: response.data.data || [],
      meta: response.data.meta,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching resource:', error);
    return {
      data: [],
      meta: null,
      error: error.response?.data?.error?.message || 'Failed to fetch',
    };
  }
}
```

**Benefits**:
- Consistent error handling
- Always returns same structure
- No exceptions thrown to caller
- Detailed error logging

## Guard Implementation

### Input Validation Guard Pattern

Every dynamic route implements this guard:

```javascript
useEffect(() => {
  // Guard: Validate parameter
  if (!paramID || isNaN(Number(paramID))) {
    setError('Invalid ID');
    setLoading(false);
    return; // Exit early
  }

  loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [paramID]);
```

**Prevents**:
- ❌ API calls with invalid IDs
- ❌ Type errors from non-numeric IDs
- ❌ Unnecessary network requests
- ❌ Poor error messages

**Provides**:
- ✅ Clear error messages
- ✅ Fast failure feedback
- ✅ Better user experience
- ✅ Reduced server load

## State Management

### Component State Pattern

```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [data, setData] = useState([]);

// Loading State: Show spinner
if (loading) return <LoadingSpinner />;

// Error State: Show error with retry
if (error) return <ErrorMessage error={error} onRetry={retry} />;

// Empty State: Show empty message
if (data.length === 0) return <EmptyState />;

// Success State: Render data
return <DataDisplay data={data} />;
```

### State Transitions

```
Initial (loading=true, error=null, data=[])
  ↓
Loading → LoadingSpinner
  ↓
Fetch Data
  ├─ Success → Data State
  │   ├─ Has Data → Render Content
  │   └─ No Data → EmptyState
  │
  └─ Error → Error State → ErrorMessage
      ↓
      Retry → Back to Loading
```

## Component Design Principles

### 1. Consistent UI Components

All UI feedback uses standardized components:
- `LoadingSpinner` - Loading states
- `ErrorMessage` - Error states with retry
- `EmptyState` - No data states
- `ErrorBoundary` - Uncaught errors

### 2. Error Resilience

Multiple layers of error handling:
1. **Try-Catch** in async functions
2. **Error state** in components
3. **Error boundaries** around pages
4. **401 interceptor** in API client

### 3. Progressive Enhancement

Pages work even with partial failures:
- Main page can load universities even if countries fail
- Error on one component doesn't crash entire page
- Failed requests can be retried

## Data Flow

### Complete Request Flow

```
User Action (Page Visit)
  ↓
Component Mount
  ↓
Guard Validation
  ↓
Token Verification (verifyStrapiTokenPermissions)
  ↓
API Request (via strapiClient)
  ↓
Request Interceptor (adds token)
  ↓
Strapi API
  ↓
Response Interceptor
  ├─ Success (200-299)
  │   ↓
  │   Update Component State
  │   ↓
  │   Render Data
  │
  └─ Failure (401)
      ↓
      Refresh Token
      ↓
      Retry Request
      ↓
      Success → Update State
      Failure → Show Error
```

## Performance Considerations

### Optimization Strategies

1. **Static Generation**: Home page is statically generated
2. **Dynamic Rendering**: Detail pages render on-demand
3. **Parallel Requests**: Countries and universities load simultaneously
4. **Pagination**: Default page size of 20 items
5. **Error Boundaries**: Prevent full page re-renders on errors

### Bundle Size

```
Route (app)                    Size      First Load JS
├ ○ /                         944 B     100 kB
├ ○ /mbbs                     2.6 kB    125 kB
├ ƒ /mbbs/[universityID]      2.06 kB   116 kB
└ ƒ /mbbs/country/[countryID] 2.13 kB   125 kB

Shared JS: 87.3 kB
```

## Security Architecture

### Defense in Depth

1. **Client-Side**
   - Input validation before API calls
   - Sanitized error messages
   - No sensitive data in client code

2. **API Layer**
   - Token-based authentication
   - Automatic token refresh
   - Request/response interceptors

3. **Strapi CMS**
   - Role-based permissions
   - API token restrictions
   - CORS configuration

### Token Security Flow

```
┌──────────────────────────────────────┐
│ Environment Variable                  │
│ NEXT_PUBLIC_STRAPI_API_TOKEN         │ (Build time)
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ Initial Request                       │
│ Uses env token                        │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ localStorage (Client-side)            │
│ Persists token between sessions       │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ Request Interceptor                   │
│ Attaches token to every request       │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ Strapi API                            │
│ Validates token & permissions         │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ Response Interceptor                  │
│ Handles 401 → refresh → retry         │
└──────────────────────────────────────┘
```

## Error Handling Hierarchy

```
Level 1: Try-Catch in API Functions
  ↓ (if error)
Level 2: Component Error State
  ↓ (if uncaught)
Level 3: Error Boundary
  ↓ (if catastrophic)
Level 4: Next.js Error Pages
```

## Deployment Architecture

### Build Process

```bash
1. npm install        # Install dependencies
2. npm run lint      # Check code quality
3. npm run build     # Create production build
   ├─ Compile TypeScript/JSX
   ├─ Optimize images
   ├─ Generate static pages
   └─ Bundle JavaScript
4. npm start         # Serve production build
```

### Environment Configuration

**Development**: `.env.local`
```
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=dev_token_here
```

**Production**: Environment variables
```
NEXT_PUBLIC_STRAPI_API_URL=https://api.production.com
NEXT_PUBLIC_STRAPI_API_TOKEN=prod_token_here
```

## Future Enhancements

### Planned Improvements

1. **Caching Layer**
   - React Query for server state
   - Cache API responses
   - Optimistic updates

2. **Search & Filters**
   - Full-text search
   - Filter by location, fees, ranking
   - Sort options

3. **Authentication**
   - User login/registration
   - Saved favorites
   - Application tracking

4. **Performance**
   - Image optimization
   - Lazy loading
   - Code splitting

5. **Testing**
   - Unit tests (Jest)
   - Integration tests (Testing Library)
   - E2E tests (Playwright)

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [Axios Documentation](https://axios-http.com/docs)
- [React Documentation](https://react.dev)

Last Updated: December 7, 2025

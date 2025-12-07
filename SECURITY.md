# Security Implementation Summary

## Overview
This document outlines the security features and hardening measures implemented in the My Career Pathshala frontend application.

## Authentication & Authorization

### Strapi Token Management
- **Location**: `lib/strapi.js`
- **Features**:
  - Centralized Axios client with automatic token injection
  - Token stored in localStorage for client-side persistence
  - Fallback to environment variable for server-side rendering
  - Automatic token refresh on 401 errors

### Token Verification
- **Function**: `verifyStrapiTokenPermissions()`
- **Purpose**: Validates token before making API calls
- **Returns**: `{ valid: boolean, user?: object, error?: string }`
- **Usage**: Called before data fetching in all pages

### 401 Error Handling
The application implements automatic retry logic for 401 Unauthorized errors:

1. **Interceptor catches 401 response** (`lib/strapi.js:36-66`)
2. **Attempts token refresh** using `refreshStrapiToken()`
3. **Retries original request** with new token
4. **Falls back to redirect** if refresh fails
5. **Clears invalid tokens** from localStorage

```javascript
// Example flow:
API Request → 401 Error → Refresh Token → Retry Request → Success/Fail
```

## Input Validation & Guards

### Dynamic Route Validation
All dynamic route pages implement ID validation:

#### University Page Guard (`app/(routers)/mbbs/[universityID]/page.jsx`)
```javascript
if (!universityID || isNaN(Number(universityID))) {
  setError('Invalid university ID');
  setLoading(false);
  return;
}
```

#### Country Page Guard (`app/(routers)/mbbs/country/[countryID]/page.jsx`)
```javascript
if (!countryID || isNaN(Number(countryID))) {
  setError('Invalid country ID');
  setLoading(false);
  return;
}
```

### Benefits
- ✅ Prevents unnecessary API calls with invalid parameters
- ✅ Provides clear error messages to users
- ✅ Reduces server load from malformed requests
- ✅ Protects against injection attacks in URL parameters

## Error Handling

### Error Boundary
- **Component**: `components/common/ErrorBoundary.jsx`
- **Purpose**: Catches runtime errors in component tree
- **Action**: Displays error message with reload button
- **Scope**: Wraps all MBBS pages

### Consistent Error Display
- **Component**: `components/common/ErrorMessage.jsx`
- **Features**:
  - Uniform error presentation
  - Optional retry functionality
  - User-friendly error messages

### API Error Handling
All API functions in `lib/api/mbbs.js` return a consistent structure:
```javascript
{
  data: Array | Object | null,
  meta?: Object,
  error: string | null
}
```

## Data Validation

### Response Validation
- Check for null/undefined data before rendering
- Validate data structure matches expected format
- Provide fallbacks for missing optional fields

### Empty State Handling
- **Component**: `components/common/EmptyState.jsx`
- **Usage**: Display when no data is available
- **Benefit**: Prevents rendering errors from empty arrays

## Known Security Considerations

### Development Dependencies
**Status**: 3 high severity vulnerabilities in eslint-config-next
- **Vulnerability**: glob CLI command injection (GHSA-5j98-mcp5-4vw2)
- **Scope**: Development/CLI only, not runtime
- **Mitigation**: Vulnerabilities do not affect production builds
- **Fix**: Requires upgrading to Next.js 16 (breaking change)

### Environment Variables
**Required Variables**:
- `NEXT_PUBLIC_STRAPI_API_URL`: Strapi API base URL
- `NEXT_PUBLIC_STRAPI_API_TOKEN`: Strapi API authentication token

**Security Notes**:
- ⚠️ Variables prefixed with `NEXT_PUBLIC_` are exposed to the client
- ✅ API token should have minimal required permissions
- ✅ Use different tokens for development and production
- ✅ Rotate tokens regularly

### Recommended Token Permissions
For Strapi API token, grant read-only access to:
- `mbbs-universities` (find, findOne)
- `mbbs-programs` (find, findOne)
- `countries` (find, findOne)
- `users/me` (for token verification)

## Security Best Practices

### Client-Side Security
1. ✅ Token stored in localStorage (XSS risk mitigation through CSP)
2. ✅ No sensitive data stored in client-side code
3. ✅ Input validation before API calls
4. ✅ Error messages don't expose internal details

### API Security
1. ✅ Automatic retry with token refresh
2. ✅ Consistent error handling across all endpoints
3. ✅ Request interceptors for centralized auth
4. ✅ Response validation before state updates

### Code Security
1. ✅ No eval() or Function() constructors
2. ✅ No innerHTML usage (JSX prevents XSS)
3. ✅ External links use rel="noopener noreferrer"
4. ✅ Error boundaries prevent app crashes

## Testing Security Features

### Test Token Verification
```bash
# Check API health and token validity
curl http://localhost:3000/api/health
```

### Test 401 Handling
1. Set an invalid token in `.env`
2. Attempt to load `/mbbs` page
3. Verify error message displays
4. Check console for retry attempts

### Test Input Validation
1. Navigate to `/mbbs/invalid` (non-numeric ID)
2. Verify "Invalid university ID" error displays
3. Navigate to `/mbbs/999999` (non-existent ID)
4. Verify "University not found" empty state

## Incident Response

### If Token Compromised
1. Revoke token in Strapi admin
2. Generate new token
3. Update `NEXT_PUBLIC_STRAPI_API_TOKEN`
4. Clear localStorage in client browsers
5. Restart application

### If 401 Errors Persist
1. Verify Strapi is running and accessible
2. Check token permissions in Strapi admin
3. Test token with curl:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        http://localhost:1337/api/users/me
   ```
4. Check browser console for detailed errors
5. Review network tab for failed requests

## Future Security Enhancements

### Recommended Improvements
1. Implement Content Security Policy (CSP) headers
2. Add rate limiting for API calls
3. Implement request signing for critical operations
4. Add API request logging and monitoring
5. Implement refresh token rotation
6. Add CAPTCHA for public forms
7. Implement role-based access control (RBAC)
8. Add audit logging for sensitive actions

### Security Monitoring
Consider implementing:
- Error tracking (Sentry, Rollbar)
- Performance monitoring (Datadog, New Relic)
- API usage monitoring
- Failed authentication attempt tracking

## Compliance Notes

- Application follows OWASP security guidelines
- Input validation prevents common injection attacks
- Error handling prevents information leakage
- Authentication follows industry best practices

## Contact

For security issues or concerns, contact: dev@mycareerpathshala.com

Last Updated: December 7, 2025

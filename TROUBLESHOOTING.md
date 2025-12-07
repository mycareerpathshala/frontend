# Troubleshooting Guide

This guide helps resolve common issues with the My Career Pathshala frontend application.

## Table of Contents
1. [401 Unauthorized Errors](#401-unauthorized-errors)
2. [Build Failures](#build-failures)
3. [API Connection Issues](#api-connection-issues)
4. [Empty Pages or No Data](#empty-pages-or-no-data)
5. [Development Server Issues](#development-server-issues)

## 401 Unauthorized Errors

### Symptom
- Pages show "Authentication failed. Please check your credentials."
- Console shows 401 errors from Strapi API
- Health check endpoint shows `connected: false`

### Diagnosis
```bash
# Test API health
curl http://localhost:3000/api/health

# Test Strapi connection directly
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:1337/api/users/me
```

### Solutions

#### 1. Invalid or Missing Token
**Cause**: API token not set or incorrect in environment variables

**Fix**:
```bash
# Check .env file
cat .env

# Should contain:
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your_valid_token_here
```

**Steps**:
1. Log into Strapi admin panel
2. Go to Settings → API Tokens
3. Create new token or copy existing token
4. Update `.env` file with token
5. Restart dev server: `npm run dev`

#### 2. Insufficient Token Permissions
**Cause**: Token lacks permissions for required content types

**Fix**:
1. In Strapi admin, go to Settings → API Tokens
2. Select your token
3. Grant permissions for:
   - `mbbs-universities`: find, findOne
   - `mbbs-programs`: find, findOne
   - `countries`: find, findOne
4. Save changes
5. Clear browser localStorage
6. Reload application

#### 3. Token Expired
**Cause**: API token has expired

**Fix**:
1. Generate new token in Strapi admin
2. Update `NEXT_PUBLIC_STRAPI_API_TOKEN` in `.env`
3. Clear localStorage:
   ```javascript
   // In browser console
   localStorage.clear();
   ```
4. Restart application

#### 4. CORS Issues
**Cause**: Strapi not allowing requests from your domain

**Fix in Strapi** (`config/middlewares.js`):
```javascript
{
  name: 'strapi::cors',
  config: {
    origin: ['http://localhost:3000', 'your-production-domain.com'],
    credentials: true,
  },
}
```

## Build Failures

### Symptom
- `npm run build` fails with errors
- Compilation errors during build process

### Common Issues

#### 1. Missing Dependencies
**Error**: `Cannot find module 'X'`

**Fix**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

#### 2. Styled-JSX in Server Component
**Error**: `'client-only' cannot be imported from a Server Component`

**Fix**: Add `'use client'` directive at top of file:
```javascript
'use client';

import { useState } from 'react';
// ... rest of component
```

#### 3. ESLint Errors
**Error**: Build fails due to linting errors

**Fix**:
```bash
# Run lint and fix automatically
npm run lint -- --fix

# Or disable for specific line
// eslint-disable-next-line rule-name
```

## API Connection Issues

### Symptom
- "Failed to load data" errors
- Network errors in console
- Infinite loading states

### Solutions

#### 1. Strapi Not Running
**Diagnosis**:
```bash
# Test Strapi health
curl http://localhost:1337/_health
```

**Fix**:
```bash
# Start Strapi (in Strapi directory)
npm run develop
# or
yarn develop
```

#### 2. Wrong API URL
**Diagnosis**: Check environment variable

**Fix**:
```bash
# .env should match your Strapi URL
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
# NOT: http://localhost:1337/api (don't include /api)
```

#### 3. Network/Firewall Issues
**Diagnosis**:
```bash
# Test direct connection
curl -v http://localhost:1337/api/mbbs-universities
```

**Fix**:
- Check firewall settings
- Verify Strapi is bound to correct interface
- Check for network proxy issues

## Empty Pages or No Data

### Symptom
- Pages show "No data available" message
- Empty grids or lists

### Solutions

#### 1. No Content in Strapi
**Cause**: Content not created in Strapi

**Fix**:
1. Log into Strapi admin
2. Navigate to Content Manager
3. Create entries for:
   - Countries (with `has_mbbs: true`)
   - MBBS Universities
   - MBBS Programs
4. Publish all entries
5. Refresh frontend

#### 2. Content Not Published
**Cause**: Draft content not published in Strapi

**Fix**:
1. In Strapi Content Manager
2. Select entries
3. Click "Publish" button
4. Refresh frontend

#### 3. Wrong Filter Criteria
**Cause**: API filters returning no results

**Check**: `lib/api/mbbs.js` filter parameters
```javascript
// Example: countries filter
filters: {
  has_mbbs: {
    $eq: true,  // Check this matches your data
  },
}
```

#### 4. Permissions Issue
**Cause**: Public role lacks find permissions

**Fix in Strapi**:
1. Settings → Roles → Public
2. Check permissions for content types
3. Enable "find" and "findOne" for required types

## Development Server Issues

### Symptom
- `npm run dev` fails to start
- Port already in use errors
- Hot reload not working

### Solutions

#### 1. Port Already in Use
**Error**: `EADDRINUSE: address already in use :::3000`

**Fix**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

#### 2. Module Not Found After Adding Dependency
**Cause**: New dependency not installed

**Fix**:
```bash
# Install specific dependency
npm install package-name

# Or reinstall all
npm install
```

#### 3. Cache Issues
**Symptom**: Changes not reflected, stale data

**Fix**:
```bash
# Clear Next.js cache
rm -rf .next

# Clear browser cache
# In browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

# Clear localStorage
# In browser console: localStorage.clear();

# Restart dev server
npm run dev
```

## Invalid ID Errors

### Symptom
- "Invalid university ID" or "Invalid country ID" errors
- 404-like behavior on detail pages

### Solutions

#### 1. Non-Numeric IDs in URL
**Cause**: Trying to access `/mbbs/abc` instead of `/mbbs/123`

**Fix**: Use numeric IDs in URLs
```javascript
// Correct
<Link href={`/mbbs/${university.id}`}>

// Wrong
<Link href={`/mbbs/${university.slug}`}>
```

#### 2. ID Not Matching Strapi IDs
**Cause**: Using wrong ID field

**Fix**: Ensure you're using `id` field from Strapi response:
```javascript
const { id, attributes } = university;
// Use `id`, not `attributes.id` or other fields
```

## Console Warnings

### Common Warnings and Fixes

#### 1. React Hooks Dependencies
**Warning**: `React Hook useEffect has a missing dependency`

**Already Fixed**: Added `eslint-disable-next-line` comments
```javascript
useEffect(() => {
  loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);
```

#### 2. Image Optimization
**Warning**: `Image with src "X" is missing required "width" or "height"`

**Fix**: Add dimensions to Image components
```javascript
<Image 
  src="/image.jpg" 
  width={500} 
  height={300} 
  alt="Description"
/>
```

## Performance Issues

### Symptom
- Slow page loads
- Laggy interactions

### Solutions

#### 1. Too Much Data Loading
**Fix**: Implement pagination
```javascript
// In API calls
getMBBSUniversities({ 
  pagination: { 
    page: 1, 
    pageSize: 20 
  } 
})
```

#### 2. Unnecessary Re-renders
**Fix**: Use React.memo for components
```javascript
const UniversityCard = React.memo(({ university }) => {
  // component code
});
```

## Still Having Issues?

### Debugging Steps
1. **Check browser console** for JavaScript errors
2. **Check Network tab** for failed API requests
3. **Check Strapi logs** for backend errors
4. **Enable verbose logging**:
   ```javascript
   // In lib/strapi.js
   console.log('API Request:', config);
   console.log('API Response:', response);
   ```

### Getting Help
1. Check existing GitHub issues
2. Review Strapi documentation
3. Review Next.js documentation
4. Contact: dev@mycareerpathshala.com

### Useful Commands
```bash
# Check versions
node --version
npm --version

# View logs
npm run dev 2>&1 | tee debug.log

# Test build
npm run build

# Analyze bundle
npm run build -- --analyze

# Check for outdated packages
npm outdated
```

## Preventive Measures

### Before Deploying
- [ ] Run `npm run build` successfully
- [ ] Run `npm run lint` with no errors
- [ ] Test all pages manually
- [ ] Verify API connection
- [ ] Check environment variables
- [ ] Test with production Strapi URL

### Regular Maintenance
- Keep dependencies updated
- Rotate API tokens regularly
- Monitor error logs
- Review security advisories
- Backup Strapi data

Last Updated: December 7, 2025

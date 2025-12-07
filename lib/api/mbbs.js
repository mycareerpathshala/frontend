import strapiClient from '../strapi';

/**
 * Fetch all MBBS universities
 */
export async function getMBBSUniversities(params = {}) {
  try {
    const response = await strapiClient.get('/mbbs-universities', {
      params: {
        populate: '*',
        ...params,
      },
    });
    return {
      data: response.data.data || [],
      meta: response.data.meta,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching MBBS universities:', error);
    return {
      data: [],
      meta: null,
      error: error.response?.data?.error?.message || 'Failed to fetch universities',
    };
  }
}

/**
 * Fetch MBBS university by ID
 */
export async function getMBBSUniversityById(universityId) {
  try {
    const response = await strapiClient.get(`/mbbs-universities/${universityId}`, {
      params: {
        populate: '*',
      },
    });
    return {
      data: response.data.data,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching MBBS university:', error);
    return {
      data: null,
      error: error.response?.data?.error?.message || 'Failed to fetch university',
    };
  }
}

/**
 * Fetch MBBS universities by country
 */
export async function getMBBSUniversitiesByCountry(countryId) {
  try {
    const response = await strapiClient.get('/mbbs-universities', {
      params: {
        filters: {
          country: {
            id: {
              $eq: countryId,
            },
          },
        },
        populate: '*',
      },
    });
    return {
      data: response.data.data || [],
      meta: response.data.meta,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching MBBS universities by country:', error);
    return {
      data: [],
      meta: null,
      error: error.response?.data?.error?.message || 'Failed to fetch universities',
    };
  }
}

/**
 * Fetch MBBS countries
 */
export async function getMBBSCountries() {
  try {
    const response = await strapiClient.get('/countries', {
      params: {
        filters: {
          has_mbbs: {
            $eq: true,
          },
        },
        populate: '*',
      },
    });
    return {
      data: response.data.data || [],
      meta: response.data.meta,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching MBBS countries:', error);
    return {
      data: [],
      meta: null,
      error: error.response?.data?.error?.message || 'Failed to fetch countries',
    };
  }
}

/**
 * Fetch MBBS programs for a university
 */
export async function getMBBSPrograms(universityId) {
  try {
    const response = await strapiClient.get('/mbbs-programs', {
      params: {
        filters: {
          university: {
            id: {
              $eq: universityId,
            },
          },
        },
        populate: '*',
      },
    });
    return {
      data: response.data.data || [],
      meta: response.data.meta,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching MBBS programs:', error);
    return {
      data: [],
      meta: null,
      error: error.response?.data?.error?.message || 'Failed to fetch programs',
    };
  }
}

/**
 * Fetch single MBBS program
 */
export async function getMBBSProgramById(programId) {
  try {
    const response = await strapiClient.get(`/mbbs-programs/${programId}`, {
      params: {
        populate: '*',
      },
    });
    return {
      data: response.data.data,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching MBBS program:', error);
    return {
      data: null,
      error: error.response?.data?.error?.message || 'Failed to fetch program',
    };
  }
}

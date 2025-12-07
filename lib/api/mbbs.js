import strapiClient from '../strapi';

/**
 * MBBS API Functions
 * 
 * These functions assume the following Strapi content types exist:
 * 
 * 1. mbbs-universities (Collection Type)
 *    - name: String
 *    - location: String
 *    - ranking: Number
 *    - fees: String
 *    - description: Text
 *    - website: String
 *    - email: String
 *    - country: Relation (Many-to-One)
 * 
 * 2. mbbs-programs (Collection Type)
 *    - name: String
 *    - duration: String
 *    - description: Text
 *    - university: Relation (Many-to-One)
 * 
 * 3. countries (Collection Type)
 *    - name: String
 *    - flag: String
 *    - has_mbbs: Boolean
 *    - university_count: Number
 *    - description: Text
 * 
 * For setup instructions, see README.md
 */

/**
 * Fetch all MBBS universities
 * @param {Object} params - Query parameters for filtering and pagination
 * @returns {Promise<{data: Array, meta: Object, error: string|null}>}
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
 * @param {string|number} universityId - The ID of the university
 * @returns {Promise<{data: Object|null, error: string|null}>}
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
 * @param {string|number} countryId - The ID of the country
 * @returns {Promise<{data: Array, meta: Object, error: string|null}>}
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
 * @returns {Promise<{data: Array, meta: Object, error: string|null}>}
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
 * @param {string|number} universityId - The ID of the university
 * @returns {Promise<{data: Array, meta: Object, error: string|null}>}
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
 * @param {string|number} programId - The ID of the program
 * @returns {Promise<{data: Object|null, error: string|null}>}
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

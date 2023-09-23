/**
 * this function fetches to api.noroff.dev/api/v1/auction/[path argument]
 * @param {string} path - the last part of the url to be fetched
 * @param {object} [body] - the optional body object
 * @return {Promise<{error}|any>}
 */
export default async (path, options) => {
  try {
    if (typeof path !== 'string') {
      throw new TypeError('ERROR: Argument must be a string');
    }

    let noOptions = false
    if (options === undefined || Object.keys(options).length === 0) {
      noOptions = true
    }

    let response
    if (noOptions) {
      response = await fetch(`https://api.noroff.dev/api/v1/auction/${path}`);
    } else {
      response = await fetch(`https://api.noroff.dev/api/v1/auction/${path}`, options);
    }

    if (!response.ok) {
      console.log(await response.json())
      throw response.error;
    }
    const json = await response.json();

    return json;
  } catch (err) {
    return { error: err };
  }
};

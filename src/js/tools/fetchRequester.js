/**
 * this function fetches to api.noroff.dev/api/v1/auction/[path argument]
 * @param {string} path - the last part of the url to be fetched
 * @param {object} [body] - the optional body object
 * @return {Promise<{error}|any>}
 */
export default async (path, body) => {
  try {
    if (typeof path !== 'string') {
      throw new TypeError('ERROR: Argument must be a string');
    }

    let noBody = false
    if (body === undefined || Object.keys(body).length === 0) {
      noBody = true
    } else {
      console.log(body)
    }

    let response
    if (noBody) {
      response = await fetch(`https://api.noroff.dev/api/v1/auction/${path}`);
    } else {
      response = await fetch(`https://api.noroff.dev/api/v1/auction/${path}`, { method: 'POST', headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify(body) });
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

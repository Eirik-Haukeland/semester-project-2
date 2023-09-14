/**
 * this function fetches to api.noroff.dev/api/v1/auction/[path argument]
 * @param path {string} - the last part of the url to be fetched
 * @return {Promise<{error}|any>}
 */
export default async (path) => {
  try {
    if (typeof path !== "string") {
      throw new TypeError("ERROR: Argument must be a string");
    }

    const response = await fetch(
      `https://api.noroff.dev/api/v1/auction/${path}`,
    );

    if (!response.ok) {
      throw response.error;
    }
    const json = await response.json();

    return json;
  } catch (err) {
    return { error: err };
  }
};

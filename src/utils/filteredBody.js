/*
 * @Author: Matheus Rezende
 * @Date: 2018-06-20 22:59:58
 * @Last Modified by: matheus.rezende
 * @Last Modified time: 2018-12-16 08:42:15
 */

/**
 * Filtered the request body to be sure
 * nothing wrong can be pass.
 *
 * @export
 * @param {Object} body - Request body
 * @param {Array[String]} whitelist - Element who want to whitelist
 * @returns {Object} body - Request body filtered
 */
export function filteredBody(body, whitelist) {
  const items = {};

  Object.keys(body).forEach((key) => {
    if (whitelist.indexOf(key) >= 0) {
      items[key] = body[key];
    }
  });

  return items;
}

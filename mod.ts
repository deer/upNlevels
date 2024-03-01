import { join } from "jsr:@std/path@0.217/join";

/**
 * Navigates up a specified number of levels from the given URL.
 * This function can handle both string and URL object inputs, and it adjusts
 * the path of the URL to navigate upwards by the specified number of levels.
 * It is useful for manipulating URLs to access higher directory levels
 * programmatically.
 *
 * @example
 * ```ts
 * // Navigates up two levels from the given URL
 * const result = upNlevels("http://example.com/one/two/three/four", 2);
 * console.log(result); // Outputs: "http://example.com/one/two"
 * ```
 *
 * @example
 * ```ts
 * // When provided with a URL object and navigating up beyond the root
 * try {
 *   const url = new URL("http://example.com/one/two");
 *   const result = upNlevels(url, 3);
 * } catch (error) {
 *   console.error(error); // Expected error for navigating beyond root
 * }
 * ```
 *
 * @param {string|URL} url - The URL from which to navigate up. Can be a string or a URL object.
 * @param {number} levels - The number of levels to navigate up from the current URL path.
 * @returns {string} The resulting URL string after navigating up the specified number of levels.
 *                   If navigating up the specified number of levels would go beyond the root,
 *                   an error is thrown.
 * @throws {Error} Throws an error if attempting to navigate up more levels than the current depth.
 */

export function upNlevels(url: string | URL, levels: number): string {
  const inputUrl = (typeof url === "string") ? new URL(url) : url;

  // Split the pathname into segments, ignoring any empty segments that result from leading or trailing slashes
  const segments = inputUrl.pathname.split("/").filter((segment) =>
    segment !== ""
  );

  // Determine if the last segment likely represents a file
  const likelyFile = segments.length > 0 &&
    segments[segments.length - 1].includes(".");

  // Adjust levels if the path ends with a file
  if (likelyFile) {
    // Consider the file's directory as the first level to go up
    levels += 1;
  }

  // Determine if the original URL had a trailing slash
  const hasTrailingSlash = inputUrl.pathname.endsWith("/");

  // If trying to go up more levels than there are segments (considering root as a valid target)
  if (levels > segments.length) {
    throw new Error("Cannot go up more levels than the current depth");
  }

  // Adjust how the new path is calculated, considering the edge case of going up exactly the depth of the path
  const upperPathSegments = segments.slice(
    0,
    Math.max(0, segments.length - levels),
  );
  let newPath = upperPathSegments.length > 0
    ? join("/", ...upperPathSegments)
    : "";

  // Preserve trailing slash if the operation results in a non-empty path or the original had it at root
  if (
    hasTrailingSlash && newPath !== "" ||
    (levels === segments.length && segments.length > 0)
  ) {
    newPath += "/";
  }

  inputUrl.pathname = newPath;

  return inputUrl.href;
}

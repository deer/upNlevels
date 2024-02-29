import { join } from "jsr:@std/path@0.217/join";

export function upNlevels(url: string | URL, levels: number): string {
  const inputUrl = (typeof url === "string") ? new URL(url) : url;

  // Split the pathname into segments, ignoring any empty segments that result from leading or trailing slashes
  const segments = inputUrl.pathname.split("/").filter((segment) =>
    segment !== ""
  );

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

  // Handle the case where the new path is empty, indicating the root should be targeted
  if (newPath === "" && !hasTrailingSlash) {
    newPath = "/";
  }

  inputUrl.pathname = newPath;

  return inputUrl.href;
}

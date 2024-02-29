import { upNlevels } from "./mod.ts";
import { assertEquals, assertThrows } from "jsr:@std/assert@0.217.0";

Deno.test("Basic functionality", () => {
  const result = upNlevels("http://example.com/one/two/three/four", 2);
  assertEquals(result, "http://example.com/one/two");
});

Deno.test("Edge case - Going up exact levels", () => {
  const result = upNlevels("http://example.com/one/two/three/four", 4);
  assertEquals(result, "http://example.com/");
});

Deno.test("Error handling - Going up more levels than depth", () => {
  assertThrows(
    () => {
      upNlevels("http://example.com/one/two", 3);
    },
    Error,
    "Cannot go up more levels than the current depth",
  );
});

Deno.test("Root level URL", () => {
  assertThrows(
    () => {
      upNlevels("http://example.com/", 1);
    },
    Error,
    "Cannot go up more levels than the current depth",
  );
});

Deno.test("URL with trailing slash", () => {
  const result = upNlevels("http://example.com/one/two/", 1);
  assertEquals(result, "http://example.com/one/");
});

Deno.test("URL with query strings and hashes", () => {
  const result = upNlevels(
    "http://example.com/one/two/three?query=123#section",
    2,
  );
  assertEquals(result, "http://example.com/one?query=123#section");
});

Deno.test("Handling URL object input", () => {
  const urlString = "http://example.com/one/two/three/four";
  const urlObject = new URL(urlString);
  const levels = 2;
  const result = upNlevels(urlObject, levels);
  assertEquals(result, "http://example.com/one/two");
});

Deno.test("URL object with trailing slash", () => {
  const urlObject = new URL("http://example.com/one/two/");
  const levels = 1;
  const result = upNlevels(urlObject, levels);
  assertEquals(result, "http://example.com/one/");
});

Deno.test("URL object going up exact levels", () => {
  const urlObject = new URL("http://example.com/one/two/three/four");
  const levels = 4;
  const result = upNlevels(urlObject, levels);
  assertEquals(result, "http://example.com/");
});

Deno.test("URL object at root level", () => {
  const urlObject = new URL("http://example.com/");
  const levels = 1;
  assertThrows(
    () => {
      upNlevels(urlObject, levels);
    },
    Error,
    "Cannot go up more levels than the current depth",
  );
});

Deno.test("URL object with query strings and hashes", () => {
  const urlObject = new URL(
    "http://example.com/one/two/three?query=123#section",
  );
  const levels = 2;
  const result = upNlevels(urlObject, levels);
  assertEquals(result, "http://example.com/one?query=123#section");
});

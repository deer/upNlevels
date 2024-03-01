import { upNlevels } from "./mod.ts";
import { assertEquals, assertThrows } from "jsr:@std/assert@0.217.0";

Deno.test("Error handling - Going up more levels than depth", () => {
  assertThrows(
    () => {
      upNlevels("http://example.com/one/two", 3);
    },
    Error,
    "Cannot go up more levels than the current depth",
  );
});

Deno.test("http URL string with query strings and hashes", () => {
  assertEquals(
    upNlevels(
      "http://example.com/one/two/three?query=123#section",
      2,
    ),
    "http://example.com/one?query=123#section",
  );
});

Deno.test("http URL string without trailing slash", () => {
  assertEquals(
    upNlevels("http://example.com/one/two/three", 2),
    "http://example.com/one",
  );
});

Deno.test("http URL string with trailing slash", () => {
  assertEquals(
    upNlevels("http://example.com/one/two/three/", 2),
    "http://example.com/one/",
  );
});

Deno.test("http URL string ending in file", () => {
  assertEquals(
    upNlevels("http://example.com/one/two/three/file.txt", 2),
    "http://example.com/one",
  );
});

Deno.test("file URL string ending in file", () => {
  assertEquals(
    upNlevels("file:///Users/asdf/one/two/three/file.txt", 2),
    "file:///Users/asdf/one",
  );
});

Deno.test("file URL string ending in directory", () => {
  assertEquals(
    upNlevels("file:///Users/asdf/one/two/three", 2),
    "file:///Users/asdf/one",
  );
});

Deno.test("file URL string ending in trailing slash directory", () => {
  assertEquals(
    upNlevels("file:///Users/asdf/one/two/three/", 2),
    "file:///Users/asdf/one/",
  );
});

Deno.test("URL object", () => {
  assertEquals(
    upNlevels(new URL("http://example.com/one/two/three"), 2),
    "http://example.com/one",
  );
});

Deno.test("Navigating up levels results in root path for non-trailing slash URL", () => {
  assertEquals(upNlevels("http://example.com/one", 1), "http://example.com/");
});

Deno.test("up 0 levels results in the same URL", () => {
  assertEquals(
    upNlevels("http://example.com/one", 0),
    "http://example.com/one",
  );
});

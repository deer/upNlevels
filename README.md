# upNlevels

`upNlevels` is a utility to simplify navigating up directory levels in a URL or
file path.

Instead of manually constructing path strings like this:

```ts
// Using string concatenation
normalize(import.meta.url + "../../../").href;

// Or using the `new URL()` constructor for relative paths
new URL("../../", import.meta.url).href;
```

You can use `upNlevels` to navigate up directory levels more intuitively:

```ts
// Move up 2 levels with upNlevels
upNlevels(import.meta.url, 2).href;
```

This makes your code cleaner and easier to understand, especially when dealing
with complex path manipulations.

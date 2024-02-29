# upNlevels

upNlevels is a utility to make it easier to do things like this:

```ts
normalize(import.meta.url + "../../../../../../").href;
```

Instead of having to manually type out an awkward expression of file paths,
simply specify how high you want to go:

```ts
upNlevels(import.meta.url, 5).href;
```

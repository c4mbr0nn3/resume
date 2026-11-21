# Vendored fonts

`Work Sans` and `Spectral`, latin subset, woff2, taken unmodified from the
Fontsource packages so the build never fetches fonts from the network.

| Package | Version | Files |
| --- | --- | --- |
| `@fontsource/work-sans` | 5.3.0 | `work-sans-latin-{300,400,500,600}-normal.woff2` |
| `@fontsource/spectral` | 5.3.0 | `spectral-latin-{400,700}-{normal,italic}.woff2` |

Both families are licensed under the SIL Open Font License 1.1, which permits
bundling and redistribution as long as the licence travels with the files.
See `LICENSE-work-sans.txt` and `LICENSE-spectral.txt`. The files are
unmodified, so the reserved font names are unaffected.

Configured in `astro.config.mjs` through `fontProviders.local()`, which keeps
Astro's metric-adjusted fallback faces. Do not move these into `public/`:
Astro copies them to `dist/_astro/fonts/` at build time, and a copy in `public/`
would be shipped twice.

To update, download the new package tarball, copy the same eight files over,
and bump the versions above.

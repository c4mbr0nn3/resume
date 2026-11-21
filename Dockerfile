# The image is only the built static site on top of the stock Caddy image.
# The server config is NOT baked in: this stack mounts Caddyfile.<site-a> /
# Caddyfile.<site-b> at runtime, so header and redirect changes do not need a
# rebuild. Keep /srv as the document root.
#
# Base images are fully qualified on purpose: buildah resolves short names
# through registries.conf and a stricter policy turns `node:24-alpine` into an
# error ("short-name resolution enforced").
#
# j1mm0/resume builds with pnpm and allowlists esbuild/sharp in
# pnpm-workspace.yaml, so use pnpm 11+. Adjust the install/build lines if the
# other site uses npm. HUSKY=0 keeps the `prepare` script from failing when
# .git is not in the build context.

# syntax=docker/dockerfile:1
FROM docker.io/library/node:24-alpine AS build
WORKDIR /app
ENV HUSKY=0
RUN npm install -g pnpm@11.11.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# Fail loudly on a stale PDF: in CI the artifact is downloaded after the clone,
# so it is newer than src/; a local build that skipped `pnpm pdf` is not.
RUN test -s resume.pdf \
  && test -z "$(find src -newer resume.pdf | head -n1)" \
  || { echo "resume.pdf is missing or older than src/; run 'pnpm pdf' first" >&2; exit 1; }
# The /pdf/ route exists only to feed the CI render job and must not ship.
RUN pnpm build && rm -rf dist/pdf

FROM docker.io/library/caddy:2-alpine
COPY --from=build /app/dist /srv
# resume.pdf is supplied by the CI artifact from the `pdf` job; a local build
# requires `pnpm pdf` first so the file exists in the build context.
COPY resume.pdf /srv/resume.pdf

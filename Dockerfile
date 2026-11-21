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
# resume.pdf comes from the `pdf` job's artifact; a local build needs `pnpm pdf`
# first. Do not compare mtimes: artifact extraction keeps the file's original
# timestamp, which is always older than the git checkout in CI.
RUN test -s resume.pdf || { echo "resume.pdf is missing; run 'pnpm pdf' before docker build" >&2; exit 1; }
# The /pdf/ route exists only to feed the CI render job and must not ship.
RUN pnpm build && rm -rf dist/pdf

FROM docker.io/library/caddy:2-alpine
COPY --from=build /app/dist /srv
# resume.pdf is supplied by the CI artifact from the `pdf` job; a local build
# requires `pnpm pdf` first so the file exists in the build context.
COPY resume.pdf /srv/resume.pdf

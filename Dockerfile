# Copy into the site repo as `Dockerfile`.
#
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
# pnpm-workspace.yaml, so use pnpm 10+. Adjust the install/build lines if the
# other site uses npm. HUSKY=0 keeps the `prepare` script from failing when
# .git is not in the build context.

# syntax=docker/dockerfile:1
FROM docker.io/library/node:24-alpine AS build
WORKDIR /app
ENV HUSKY=0
RUN npm install -g pnpm@10
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM docker.io/library/caddy:2-alpine
COPY --from=build /app/dist /srv

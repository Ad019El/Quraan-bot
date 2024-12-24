# ----------------------------
# Stage 1: Build
# ----------------------------
FROM node:20-slim as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# ----------------------------
# Stage 2: Production
# ----------------------------
FROM node:20-slim

WORKDIR /usr/src/app

# Now set NODE_ENV=production for the final container
ENV NODE_ENV=production

# Only install production dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy compiled output from builder
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
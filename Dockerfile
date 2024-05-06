FROM node:20.11.1-alpine as base

# Add package file
COPY server/package.json ./
COPY server/package-lock.json ./

# Install deps
RUN npm install

# Copy source
COPY server/src ./src
COPY server/tsconfig.json ./tsconfig.json

# Build dist
RUN yarn build

# >>> PRODUCTION STEP

# Start production image build
FROM node:20.11.1-alpine

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /dist /dist

# Copy static files
COPY src/public dist/src/public

EXPOSE 80

CMD ["dist/src/server.js"]
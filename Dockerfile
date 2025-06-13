# Use Bun as base image
FROM oven/bun:1.2.4-slim

WORKDIR /app

# Copy dependencies and install
COPY bun.lock package.json ./
RUN bun install

# Copy app code
COPY . .

# Expose the port your server listens on
EXPOSE 3000

# Run the dev server (this is your actual HTTP server)
CMD ["bun", "run", "dev_server.ts"]
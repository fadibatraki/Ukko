FROM node:22-alpine

RUN apk add --no-cache \
  build-base \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Generate Prisma client
COPY prisma ./prisma

RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Use the command from docker-compose.yml
CMD ["npm", "start"]

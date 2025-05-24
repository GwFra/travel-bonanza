ARG NODE_VERSION=23-alpine

# Step 1: Build the application
FROM node:${NODE_VERSION} AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy project files
COPY . .

# Build the Next.js application
RUN npm run build

# Step 2: Run the application using a lightweight image
FROM node:${NODE_VERSION} AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment variables (optional)
ENV NODE_ENV=production

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]

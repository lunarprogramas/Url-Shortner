FROM node:20-alpine

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose NestJS default port
EXPOSE 3000

# Run NestJS in dev mode (hot reload with ts-node)
CMD ["npx", "prisma", "generate"]
CMD ["npm", "run", "start:dev"]

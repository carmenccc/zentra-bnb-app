# Builder
FROM node:18-alpine AS builder
ARG CONTEXT
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npx prisma generate

# Run
FROM node:18-alpine

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

EXPOSE 8800
CMD ["node", "dist/index.js"]

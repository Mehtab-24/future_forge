FROM node:20-alpine

WORKDIR /app
RUN apk add --no-cache curl

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

# Uses /api/v1/health you added
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost:5000/api/v1/health || exit 1

CMD ["node", "src/server.js"]
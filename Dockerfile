# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /src

COPY package.json tsconfig.json ./
RUN npm install

COPY src ./src
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /app

# Copy compiled output only (no devDependencies needed — pure Node.js stdlib)
COPY --from=build /src/dist ./dist

ENV PORT=8080
EXPOSE 8080

USER node
ENTRYPOINT ["node", "dist/index.js"]

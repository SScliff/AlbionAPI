# Container do frontend — Vite + React
# Em dev: roda o Vite dev server na porta 5173
# Em prod: build estático + nginx
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

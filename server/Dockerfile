# Container do backend — Node.js + Express
# Expõe a API na porta 3001
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]

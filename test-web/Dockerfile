# Stage 1: Build
FROM node:16-alpine AS build
# Directorio donde se mantendran los archivos de la app
WORKDIR /usr/src/app
# Copiar el package.json y el package-lock en nuestro WORKDIR
COPY package*.json ./
# Instalar dependencias
RUN npm install --legacy-peer-deps
# Copiar todos los archivos
COPY . .

EXPOSE 80
CMD ["npm", "start"]

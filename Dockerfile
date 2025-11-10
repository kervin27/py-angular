# Stage di build
FROM node:22-alpine AS builder
WORKDIR /app

# copia file di lock per cache
COPY package*.json ./
RUN npm ci

COPY . .
# build production (modifica se usi un altro script)
RUN npm run build -- --configuration production

# Stage runtime: immagine piccola con serve
FROM node:22-alpine AS runtime
WORKDIR /app

# installa serve globalmente (piccolo)
RUN npm i -g serve

# copia i file buildati
COPY --from=builder /app/dist/ng-habado /app/dist

# espone porta (documentativa)
EXPOSE 3000

# usa PORT se fornita da Railway, altrimenti 3000
ENV PORT 3000

# start usando la variabile d'ambiente PORT (shell expansion)
CMD ["sh", "-c", "serve -s /app/dist -l 0.0.0.0:${PORT}"]

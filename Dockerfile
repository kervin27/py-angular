# Usa Node 22.16 LTS
FROM node:22.16

# Imposta la working directory
WORKDIR /app

# Copia package.json e package-lock.json per sfruttare la cache
COPY package*.json ./

# Installa le dipendenze
RUN npm ci

# Copia tutto il progetto
COPY . .

# Build Angular in modalità produzione
RUN npm run build -- --configuration production

# Installa serve per servire i file statici
RUN npm install -g serve

# Esponi la porta Railway
EXPOSE 3000

# Avvia il server statico sulla build Angular
CMD ["serve", "-s", "dist/ng-habado", "-l", "3000"]

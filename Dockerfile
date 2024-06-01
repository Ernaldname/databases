FROM node:14

# Instala PostgreSQL
RUN apt-get update && apt-get install -y postgresql

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Agrega el script de inicio y establece los permisos de ejecución
COPY wait-for-db.sh ./
RUN chmod +x wait-for-db.sh

EXPOSE 3000

# Modifica el CMD para ejecutar el script de inicio
CMD ["./wait-for-db.sh", "db", "npm", "start"]

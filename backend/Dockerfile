FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

# Builda a aplicação NestJS
RUN npm run build

EXPOSE 3001

# Comando para rodar migrações e iniciar a app
CMD ["/bin/sh", "-c", "npx prisma db push && npm run start:prod"]
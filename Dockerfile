FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY . .

# Instalar dependências
RUN npm ci

# Expor a porta (ajuste conforme sua aplicação)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
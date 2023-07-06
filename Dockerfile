FROM node:latest
WORKDIR /app
COPY package*.json ./
# COPY tsconfig.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "run", "dev"]

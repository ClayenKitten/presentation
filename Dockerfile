FROM node:18-alpine as dev

WORKDIR /app
EXPOSE 3000

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
CMD ["npm", "run", "dev", "--", "--host", "--port=3000"]

FROM node:18-alpine as build

WORKDIR /
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as prod

WORKDIR /
EXPOSE 3000
ENV NODE_ENV=production

COPY --from=build ./build ./build
COPY package.json .
COPY package-lock.json .
RUN npm ci --omit dev

CMD ["node", "./build"]

FROM node:18-alpine as build

WORKDIR /
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as production

WORKDIR /
EXPOSE 3000
COPY --from=build ./build ./build
COPY package.json .

CMD ["node", "./build"]

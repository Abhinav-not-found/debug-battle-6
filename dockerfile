FROM node:22-alpine AS client_build 

WORKDIR /app

COPY ./client/package*.json ./

RUN npm install

COPY ./client/ .

RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./server/ .

COPY --from=client_build /app/dist ./public

EXPOSE 3000

CMD [ "npm","start" ]





FROM node:16-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package.json .
COPY tsconfig.json .
COPY src /app/src
COPY screener-7ce36-firebase-adminsdk-l8jpz-d7a1127383.json /app/screener-7ce36-firebase-adminsdk-l8jpz-d7a1127383.json

RUN npm install 
RUN npm run build

EXPOSE 6060

CMD [ "node", "--loader", "ts-node/esm", "./src/server.ts" ]
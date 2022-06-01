FROM node

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
COPY ./nest-cli.json ./

RUN npm install

COPY ./src ./src

CMD ["npm", "run", "start"]
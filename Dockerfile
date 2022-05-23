FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --frozen-lockfile --production=false

EXPOSE 3000

ENV PORT 3000

CMD [ "yarn", "dev" ]
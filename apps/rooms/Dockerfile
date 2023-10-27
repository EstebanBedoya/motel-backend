FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/rooms apps/rooms
COPY libs libs

RUN cd apps/rooms && yarn

RUN yarn build rooms

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/rooms/main"]

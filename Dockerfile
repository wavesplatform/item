# Alias node base image
FROM node:11-alpine

ARG SERVICE_NAME

WORKDIR /app

COPY package.json yarn.lock lerna.json ./

# Build deps for alpine
RUN apk update && apk upgrade && \
    apk add --no-cache --virtual .build-deps alpine-sdk python

# Install node packages
RUN yarn cache clean --force && yarn --frozen-lockfile

# Remove deps
RUN apk del .build-deps

# Copy all service files to the container
COPY . .

# Bootstrap packages
RUN yarn bootstrap

# Build packages && service
RUN yarn build:packages && \
    yarn build --scope @item-protocol/$SERVICE_NAME

CMD ["yarn", "start", "--scope", "@item-protocol/$SERVICE_NAME"]

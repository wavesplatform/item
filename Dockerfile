# Alias node base image
FROM node:11-alpine

WORKDIR /app

COPY package.json lerna.json yarn.lock ./

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

CMD ["yarn", "dev"]

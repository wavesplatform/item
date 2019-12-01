# Alias node base image
FROM node:11-alpine

WORKDIR /item/services/app

COPY package.json yarn.lock ./
COPY ../../tsconfig.json /item

# Build deps for alpine
RUN apk update && apk upgrade && \
    apk add --no-cache --virtual .build-deps alpine-sdk python

# Install node packages
RUN yarn cache clean --force && yarn --frozen-lockfile

# Remove deps
RUN apk del .build-deps

# Copy all service files to the container
COPY . .

# Build typescript
RUN yarn build

CMD ["yarn", "start"]

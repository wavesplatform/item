# Alias node base image
FROM node:11-alpine

ARG SERVICE_NAME

WORKDIR /item/services/app

COPY services/$SERVICE_NAME/package.json services/$SERVICE_NAME/yarn.lock ./
COPY tsconfig.json /item/

# Build deps for alpine
RUN apk update && apk upgrade && \
    apk add --no-cache --virtual .build-deps alpine-sdk python

# Install node packages
RUN yarn cache clean --force && yarn --frozen-lockfile

# Remove deps
RUN apk del .build-deps

# Copy all service files to the container
COPY services/$SERVICE_NAME .

# Build service
RUN yarn build

CMD ["yarn", "start"]

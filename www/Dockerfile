FROM node:11.13.0-alpine as system

LABEL authors="Albert Iblyaminov <aiblyaminov@web3tech.ru>, Grigory Ablyazov <gablyazov@web3tech.ru>" \
      org.label-schema.vendor="Item Protocol Site Frontend" \
      org.label-schema.name="Item Protocol Site Frontend Docker Image" \
      org.label-schema.description="Item Protocol Site" \
      org.label-schema.url="https://item.sh" \
      org.label-schema.schema-version="1.0"

RUN apk --no-cache add --virtual native-deps \
    python \
    bash \
    linux-headers \
    lcms2-dev \
    libpng-dev \
    gcc \
    g++ \
    libgcc \
    libstdc++ \
    git \
    make \
    autoconf \
    automake \
    libtool \
    yarn \
  && rm -rf /var/cache/apk/*

RUN npm install --no-optional --quiet -g @angular/cli

#Стадия install libs
FROM system AS production

# Default env variables
ENV IDENTIFICATOR="FRONTEND::$DOCKER_TAG "
ENV NODE_ENV "production"
ENV API_URL "http://localhost:1337"
ENV API_URL_BROWSER "http://localhost:3000"
ENV PUBLIC_URL ""
ENV DOCKER_TAG "local"

WORKDIR /home/landing
COPY . /home/landing
RUN npm config set scripts-prepend-node-path true && \
    yarn install --production=false && \
    yarn build:ssr

EXPOSE 3000

ENTRYPOINT yarn serve:ssr

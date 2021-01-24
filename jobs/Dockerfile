FROM node:lts-buster-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get -y install cron

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm ci

COPY tsconfig.json /usr/src/app
COPY src /usr/src/app

RUN npm run build

COPY stats-cron /etc/cron.d/hello-cron
RUN chmod 0644 /etc/cron.d/hello-cron
RUN crontab /etc/cron.d/hello-cron
CMD cron

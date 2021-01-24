FROM node:lts-buster-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get -y install cron

COPY . .

RUN npm ci
RUN npm run build

COPY stats-cron /etc/cron.d/hello-cron
RUN chmod 0644 /etc/cron.d/hello-cron
RUN crontab /etc/cron.d/hello-cron
CMD cron

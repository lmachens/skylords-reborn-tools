FROM node:lts-buster-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get -y install cron

COPY . .

RUN npm ci
RUN npm run build

COPY stats-cron /etc/cron.d/stats-cron
RUN chmod 0644 /etc/cron.d/stats-cron
RUN crontab /etc/cron.d/stats-cron

RUN touch /var/log/cron.log

RUN chmod -v +x /usr/src/app/run-cron.sh

CMD /usr/src/app/run-cron.sh

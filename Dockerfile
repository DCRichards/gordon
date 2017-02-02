FROM resin/raspberrypi-alpine-node:latest

ADD . /usr/src/app

WORKDIR /usr/src/app

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]

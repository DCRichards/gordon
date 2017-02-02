# This Dockerfile is intended for production builds. The image 
# should be selected for the device architecture. Some images can be 
# found at https://hub.docker.com/u/resin.

FROM resin/raspberrypi-alpine-node:latest

ADD . /usr/src/app

WORKDIR /usr/src/app

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]

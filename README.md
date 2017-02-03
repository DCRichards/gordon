# @DCRichards/gordon

Platform 5 to nowhere fast. Gordon monitors National Rail delays and reports them on Twitter.

![gordon](http://i.giphy.com/7hvkctkRc3Q6Q.gif "gordon.gif")

## Prerequisites

* Twitter API keys, these can be obtained from [Application Management](https://apps.twitter.com/).
* Transport API keys, these can be obtained from the [Developer Console](https://developer.transportapi.com/).

## Configuration

Add a file in `config/config.json` with the following format:

```json
{
  "poller": {
    "duration": 60000
  },
  "stations": [
    "BTN",
    "CLJ"
  ],
  "operators": {
    "TL": "@TLRailUK",
    "SN": "@SouthernRailUK",
    "SW": "@SW_Trains",
    "GX": "@GatwickExpress",
    "SE": "@Se_Railway",
    "LO": "@LDNOverground",
    "DEFAULT": "@nationalrailenq"
  },
  "tags": [
    "#AllChange",
    "#DelayRepay",
    "#RailRefunds"
  ],
  "transport": {
    "url": "https://transportapi.com/v3/",
    "app_id": "xxxx",
    "app_key": "xxxx"
  },
  "twitter": {
    "consumer_key": "xxxx",
    "consumer_secret": "xxxx",
    "access_token_key": "xxxx",
    "access_token_secret": "xxxxx"
  },
  "redis": {
    "host": "redis",
    "port": 6379
  }
}
```

## Setup

For ease and portability, Gordon uses [Docker](https://docker.com/). To get set up, simply run:

```shell
docker-compose build
docker-compose up
```

Note that this will use `Dockerfile-dev` rather than `Dockerfile`, which is intended only for production.

## Deployment

Gordon is set up to be deployed on a device such as a [Raspberry Pi](http://raspberrypi.org/) using [Resin OS](https://resinos.io). Before deploying, ensure the image in the `Dockerfile` is correctly selected for
your chosen architecture. Some images can be found on [Docker Hub](https://hub.docker.com/u/resin/).

To deploy, first you'll need the [Resin Device Toolbox](https://github.com/resin-os/resin-device-toolbox) installed. You can then run the following to deploy:

```shell
rdt push <hostname> -s .
```
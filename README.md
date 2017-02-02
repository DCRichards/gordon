# @DCRichards/gordon

Platform 5 to nowhere fast. Gordon monitors National Rail delays and reports them on Twitter.

![gordon](http://i.giphy.com/7hvkctkRc3Q6Q.gif "gordon.gif")

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
  }
}
```

## Setup

Gordon uses [Docker](https://docker.com/). To get set up:

```shell
docker-compose build
docker-compose up
```

## Deployment

Gordon is set up to be deployed on a device such as a [Raspberry Pi](http://raspberrypi.org/) using [Resin OS](https://resinos.io). 

The configuration for Resin deployment can be found in `.resin-sync.yml`, see the Resin documentation for more information. To deploy, first you'll need the [Resin Device Toolbox](https://github.com/resin-os/resin-device-toolbox) installed. You can then run the following to deploy:

```shell
rdt push <hostname> -s .
```

*Note, you'll need to ensure the image in the `Dockerfile` is compatible with your device architecture (ARMv5, ARMv6 etc).*

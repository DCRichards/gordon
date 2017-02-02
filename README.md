# @DCRichards/gordon

Platform 5 to nowhere fast. Gordon monitors National Rail delays and reports them on Twitter.

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

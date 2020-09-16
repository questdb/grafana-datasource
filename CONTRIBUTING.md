# QuestDB Data Source

## Getting started

### Prerequisites

- Grafana 7+
- Node.js 12 / NPM 6
- Go 1.14

### Frontend

1. Install dependencies

```shell
npm i
# or
yarn
```

2. To build the plugin in development mode, use:

```shell
npm run watch
# or
yarn watch
```

3. Otherwise, to build the production version, use:

```shell
npm run build
# or
yarn build
```

### Backend

1. Update
   [Grafana plugin SDK for Go](https://grafana.com/docs/grafana/latest/developers/plugins/backend/grafana-plugin-sdk-for-go/)
   dependency to the latest minor version:

```shell
go get -u github.com/grafana/grafana-plugin-sdk-go
```

2. Build backend plugin binaries

For your platform only:

```shell
mage
```

For Linux, Windows and Darwin:

```shell
mage -v
```

3. List all available Mage targets for additional commands:

```shell
mage -l
```

### Grafana

1. Install Grafana 7+, you can use Docker or the binaries. Please follow
   [the official guide](https://grafana.com/docs/grafana/latest/~).

2. Point Grafana's plugin folder to this repository, in `grafana.ini`:

```
[paths]
plugins = /path/to/this/repo/
```

3. Unfortunately, Grafana doesn't provide a signing method for community plugin, you will have to turn the check off for
   this plugin:

In `grafana.ini`:

```
[plugins]
allow_loading_unsigned_plugins=questdb
```

OR

Use the environment variable:

```
GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=questdb
```

## Support / Contact

[Slack Channel](https://slack.questdb.io)

## Roadmap

[Our roadmap is here](https://github.com/questdb/questdb/projects/3)

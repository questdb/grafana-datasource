## QuestDB datasource for Grafana

The plugin will be published to [grafana.net](https://grafana.net/plugins/) soon, stay tuned!

## Getting started

### Prerequisites

- Grafana 7+
- Node.js 12 / NPM 6
- Go 1.14

After `git clone`, configure Grafana to point its plugin directory to this repository.

### Frontend

1. Install dependencies

```BASH
npm i
```

2. Build plugin in development mode or run in watch mode

```BASH
npm run dev
```

or

```BASH
npm run watch
```

3. Build plugin in production mode

```BASH
npm run build
```

### Backend

1. Update [Grafana plugin SDK for Go](https://grafana.com/docs/grafana/latest/developers/plugins/backend/grafana-plugin-sdk-for-go/) dependency to the latest minor version:

```bash
go get -u github.com/grafana/grafana-plugin-sdk-go
```

2. Build backend plugin binaries for Linux, Windows and Darwin:

```bash
mage -v
```

3. List all available Mage targets for additional commands:

```bash
mage -l
```

## Resources

Complete references are available in the
[Documentation](https://questdb.io/docs/introduction). There are also several
guides to get started.

Quick-start guides:

- [Docker](https://questdb.io/docs/guide/docker)
- [Homebrew](https://questdb.io/docs/guide/homebrew)
- [Using the binaries](https://questdb.io/docs/guide/binaries)

Usage guides:

- [Web Console](https://questdb.io/docs/guide/web-console)
- [Postgres wire with PSQL](https://questdb.io/docs/guide/postgres-wire) (alpha)
- [REST API](https://questdb.io/docs/guide/rest)
- [CRUD operations](https://questdb.io/docs/guide/crud)

Concepts:

- [SQL extensions](https://questdb.io/docs/concept/sql-extensions)
- [Storage model](https://questdb.io/docs/concept/storage-model)
- [Partitions](https://questdb.io/docs/concept/partitions)
- [Designated timestamp](https://questdb.io/docs/concept/designated-timestamp)

## Support / Contact

[Slack Channel](https://join.slack.com/t/questdb/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY)

## Roadmap

[Our roadmap is here](https://github.com/questdb/questdb/projects/3)

## Contribution

Feel free to contribute to the project by forking the repository and submitting
pull requests. Please make sure you have read our
[contributing guide](https://github.com/questdb/questdb/blob/master/CONTRIBUTING.md).

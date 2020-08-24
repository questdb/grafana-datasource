# QuestDB Data Source

> The plugin will be published to [grafana.net](https://grafana.net/plugins/) soon, stay tuned!

The QuestDB datasource for Grafana allows you to query data from QuestDB and create visualizations in Grafana
dashboards. This plugin comes with a rich query editor that has full support of
[QuestDB's SQL](https://questdb.io/docs/concept/sql-execution-order/) + Grafana's built-in macros.

# Usage

## Setup

### Prerequisites

Make sure that QuestDB is running, you will need access to the REST API exposed on port 9000 (by default).

For Docker, this translates to:

```
docker run -p 9000:9000 questdb/questdb
```

### Configuration

Specify the endpoint on which QuestDB is running:

![QuestDB Datasource Configuration](https://raw.githubusercontent.com/questdb/grafana-datasource/master/src/img/datasource-config.png)

## Query Editor

You can build queries that will support either the Time-series type (for charts) or the Table type. Depending on your
dataset, this plugin will automatically detect the type and prompt you to use a Table when there is no DATE/TIMESTAMP
column. Additionally, you can use the following macros:

- `$__timeFilter(column)`; column > '2020-08-21T15:11:32Z' AND column < '2020-08-21T16:11:32Z'
- `$__interval_ms`; a duration in milliseconds suffixed with an "M": 1000M

![QuestDB Datasource Configuration](https://raw.githubusercontent.com/questdb/grafana-datasource/master/src/img/query-editor.png)

At the bottom of the query editor, you will find extra help about this plugin's support of Grafana's built-in macros.

# Documentation links

[Official Grafana's Documentation](https://grafana.com/docs/grafana/latest/)

[Official QuestDB's Documentation](https://questdb.io/docs/introduction/)

# How to build the plugin

If you want to build the plugin locally or contribute to the code, please follow our [CONTRIBUTING.md](https://github.com/questdb/grafana-datasource/blob/master/CONTRIBUTING.md) guidelines.

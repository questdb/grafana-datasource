export const help = `Representation type:
  # Time series
    - Return a column with the TIMESTAMP or DATE type
    Notes:
      - If multiple TIMESTAMP/DATE columns are returned, Grafana will use the first column one for the time axis

  # Table
    - Return any set of columns

Macros:
- $__timeFilter(column); column > '2020-08-21T15:11:32Z' AND column < '2020-08-21T16:11:32Z'
- $__interval_ms; a duration in milliseconds suffixed with an "M"; 1000M

Example of aggregation using SAMPLE BY ($__interval_ms) and $__timeFilter:
SELECT ts, avg(x)
  FROM long_sequence(5)
  WHERE $__timeFilter(ts)
  SAMPLE BY $__interval_ms;
`;

export const defaultQuery = `SELECT ts, avg(x)
  FROM long_sequence(5)
  WHERE $__timeFilter(ts)
  SAMPLE BY $__interval_ms;`;

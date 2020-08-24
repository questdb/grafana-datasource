package helpers

import (
	"regexp"
	"strconv"
	"strings"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

func setInterval(queryText string, q backend.DataQuery) string {
	query := queryText

	query = strings.Replace(query, "$__interval_ms", strconv.FormatInt(q.Interval.Milliseconds(), 10)+"T", -1)

	return query
}

func setTimeFilterClause(queryText string, q backend.DataQuery) string {
	query := queryText
	r := regexp.MustCompile(`\$__timeFilter\((?P<Col>[[:alnum:]_]+)\)`)
	res := r.FindStringSubmatch(query)

	if len(res) > 1 {
		var clause string
		col := res[1]

		clause += col
		clause += " > '"
		clause += q.TimeRange.From.UTC().Format("2006-01-02T15:04:05.000Z")
		clause += "' and "
		clause += col
		clause += " < '"
		clause += q.TimeRange.To.UTC().Format("2006-01-02T15:04:05.000Z")
		clause += "'"

		query = r.ReplaceAllString(query, clause)
	}

	return query
}

func BuildQuery(queryText string, q backend.DataQuery) string {
	query := queryText

	query = setInterval(query, q)
	query = setTimeFilterClause(query, q)

	return query
}

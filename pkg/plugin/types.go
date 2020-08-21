package plugin

import (
	"net/http"

	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/grafana/grafana-plugin-sdk-go/data"
)

type Datasource struct {
	im instancemgmt.InstanceManager
}

type DatasourceSettings struct {
	URL string `json:"url"`
}

type QueryModel struct {
	QueryText string `json:"queryText"`
}

type QuestdbColumn struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

type QuestdbError struct {
	Error    string `json:"error"`
	Position int64  `json:"position"`
	Query    string `json:"query"`
}

type QuestdbResponse struct {
	Columns []QuestdbColumn `json:"columns"`
	Count   int             `json:"count"`
	Query   string          `json:"query"`
	Dataset [][]interface{} `json:"dataset"`
}

type QuestdbClient struct {
	httpClient *http.Client
	url        string
}

type column struct {
	name           string
	fieldConverter *data.FieldConverter
}

type FrameFactory struct {
	current *data.Frame
	columns []column
	count   int
}

type instanceSettings struct {
	client QuestdbClient
}

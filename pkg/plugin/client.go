package plugin

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
)

func (qc *QuestdbClient) queryRaw(queryText string) (*http.Response, error) {
	if queryText == "" {
		return nil, fmt.Errorf("Query is empty")
	}

	// URL encode the params
	params := url.Values{}
	params.Add("query", queryText)

	getdataurl := fmt.Sprintf("%s/exec?%s", qc.url, params.Encode())

	httpreq, _ := http.NewRequest(http.MethodGet, getdataurl, nil)

	res, err := qc.httpClient.Do(httpreq)

	return res, err
}

func (qc *QuestdbClient) query(queryText string, refID string) backend.DataResponse {
	var qr QuestdbResponse
	res, err := qc.queryRaw(queryText)
	emptyResponse := backend.DataResponse{}

	if err != nil {
		emptyResponse.Error = err
		return emptyResponse
	}

	body, err := ioutil.ReadAll(res.Body)

	if err != nil {
		emptyResponse.Error = err
		return emptyResponse
	}

	err = json.Unmarshal(body, &qr)

	if err != nil {
		emptyResponse.Error = err
		return emptyResponse
	}

	factory := &FrameFactory{
		count: qr.Count,
	}

	factory.Init(qr.Columns, queryText, refID)
	response, err := factory.Build(qr.Dataset)

	if err != nil {
		log.DefaultLogger.Error(err.Error())
		emptyResponse.Error = err
		return emptyResponse
	}

	return response
}

func (qc *QuestdbClient) checkHealth() (*http.Response, error) {
	return qc.queryRaw("select 1")
}

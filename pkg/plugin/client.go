package plugin

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/data"
)

func (qc *QuestdbClient) runRaw(queryText string) (*http.Response, error) {
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

func (qc *QuestdbClient) run(queryText string, refID string) backend.DataResponse {
	var qr QuestdbResponse
	var qe QuestdbError
	res, err := qc.runRaw(queryText)

	if err != nil {
		errorResponse := backend.DataResponse{}
		errorResponse.Error = err
		return errorResponse
	}

	body, err := ioutil.ReadAll(res.Body)

	if err != nil {
		errorResponse := backend.DataResponse{}
		errorResponse.Error = err
		return errorResponse
	}

	if res.StatusCode != 200 {
		errorResponse := backend.DataResponse{}
		err = json.Unmarshal(body, &qe)

		if err != nil {
			errorResponse.Error = err
			return errorResponse
		}

		frame := data.NewFrame(queryText)
		frame.RefID = refID
		query := data.NewFieldFromFieldType(data.FieldTypeString, 1)
		query.Set(0, qe.Query)
		position := data.NewFieldFromFieldType(data.FieldTypeInt64, 1)
		position.Set(0, qe.Position)

		frame.Fields = append(frame.Fields, query)
		frame.Fields = append(frame.Fields, position)

		errorResponse.Frames = append(errorResponse.Frames, frame)
		errorResponse.Error = fmt.Errorf(qe.Error)

		return errorResponse
	}

	err = json.Unmarshal(body, &qr)

	if err != nil {
		errorResponse := backend.DataResponse{}
		errorResponse.Error = err
		return errorResponse
	}

	factory := &FrameFactory{
		count: qr.Count,
	}

	factory.Init(qr.Columns, queryText, refID)
	response, err := factory.Build(qr.Dataset)

	if err != nil {
		errorResponse := backend.DataResponse{}
		errorResponse.Error = err
		return errorResponse
	}

	return response
}

func (qc *QuestdbClient) checkHealth() (*http.Response, error) {
	return qc.runRaw("select 1")
}

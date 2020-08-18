package plugin

import (
	"context"
	"encoding/json"
	"net"
	"net/http"
	"net/url"
	"syscall"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/datasource"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
)

func NewDatasource() datasource.ServeOpts {
	im := datasource.NewInstanceManager(newDataSourceInstance)
	ds := &Datasource{
		im: im,
	}

	return datasource.ServeOpts{
		QueryDataHandler:   ds,
		CheckHealthHandler: ds,
	}
}

func newDataSourceInstance(setting backend.DataSourceInstanceSettings) (instancemgmt.Instance, error) {
	var settings DatasourceSettings

	err := json.Unmarshal(setting.JSONData, &settings)

	if err != nil {
		return nil, err
	}

	return &instanceSettings{
		client: QuestdbClient{
			httpClient: &http.Client{Timeout: time.Second * 60},
			url:        settings.URL,
		},
	}, nil
}

func (ds *Datasource) getInstance(ctx backend.PluginContext) (*instanceSettings, error) {
	s, err := ds.im.Get(ctx)
	if err != nil {
		return nil, err
	}
	return s.(*instanceSettings), nil
}

// QueryData handles multiple queries and returns multiple responses.
// req contains the queries []DataQuery (where each query contains RefID as a unique identifer).
// The QueryDataResponse contains a map of RefID to the response for each query, and each response
// contains Frames ([]*Frame).
func (ds *Datasource) QueryData(ctx context.Context, req *backend.QueryDataRequest) (*backend.QueryDataResponse, error) {
	res := backend.NewQueryDataResponse()
	s, err := ds.getInstance(req.PluginContext)

	if err != nil {
		return nil, err
	}

	// loop over queries and execute them individually.
	for _, q := range req.Queries {
		var qm QueryModel
		err := json.Unmarshal(q.JSON, &qm)

		if err != nil {
			res.Responses[q.RefID] = backend.DataResponse{
				Error: err,
			}

			return res, nil
		}

		res.Responses[q.RefID] = s.client.query(qm.QueryText, q.RefID)
	}

	return res, nil
}

func (ds *Datasource) CheckHealth(ctx context.Context, req *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {
	s, err := ds.getInstance(req.PluginContext)
	httpreq, err := s.client.checkHealth()

	// Gracefully handle error messages, this makes it clear to the user what the problem is
	if err != nil {
		var msg string

		switch t := err.(type) {
		case *net.OpError:
			if t.Op == "dial" {
				msg = "Unknown host"
			} else if t.Op == "read" {
				msg = "Connection refused"
			}
		case *url.Error:
			if _, ok := t.Err.(net.Error); ok {
				msg = "Connection refused"
			}
		case syscall.Errno:
			if t == syscall.ECONNREFUSED {
				msg = "Connection refused"
			}
		default:
			msg = err.Error()
		}

		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: msg,
		}, nil
	}

	if httpreq.StatusCode != 200 {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: httpreq.Status,
		}, nil
	}

	return &backend.CheckHealthResult{
		Status:  backend.HealthStatusOk,
		Message: "Data source is working",
	}, nil
}

func (s *instanceSettings) Dispose() {
}

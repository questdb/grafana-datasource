package plugin

import (
	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/data"

	"github.com/questdb/questdb-grafana/pkg/helpers"
)

func (ff *FrameFactory) Build(dt [][]interface{}) (backend.DataResponse, error) {
	response := backend.DataResponse{}

	for idx, col := range ff.columns {
		for i := 0; i < ff.count; i++ {
			val, err := col.fieldConverter.Converter(dt[i][idx])
			if err != nil {
				return response, err
			}
			ff.current.Fields[idx].Set(i, val)
		}
	}

	response.Frames = append(response.Frames, ff.current)

	return response, nil
}

func (ff *FrameFactory) Init(cols []QuestdbColumn, queryText string, refID string) error {
	ff.current = data.NewFrame(queryText)
	ff.current.RefID = refID

	for _, col := range cols {
		fieldConverter, err := helpers.GetFieldConverter(col.Type)

		if err != nil {
			return err
		}

		field := data.NewFieldFromFieldType(fieldConverter.OutputFieldType, ff.count)
		field.Name = col.Name
		ff.current.Fields = append(ff.current.Fields, field)

		column := column{
			fieldConverter: fieldConverter,
			name:           col.Name,
		}
		ff.columns = append(ff.columns, column)
	}

	return nil
}

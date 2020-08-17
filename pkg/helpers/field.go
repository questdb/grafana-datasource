package helpers

import (
	"fmt"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/data"
)

// cf. https://questdb.io/docs/reference/sql/datatypes/
const (
	boolDatatype      = "BOOLEAN"
	byteDatatype      = "BYTE"
	shortDatatype     = "SHORT"
	charDatatype      = "CHAR"
	intDatatype       = "INT"
	floatDatatype     = "FLOAT"
	symbolDatatype    = "SYMBOL"
	stringDatatype    = "STRING"
	longDatatype      = "LONG"
	dateDatatype      = "DATE"
	timestampDatatype = "TIMESTAMP"
	doubleDatatype    = "DOUBLE"
	binaryDataType    = "BINARY"
	long256DataType   = "LONG256"
)

func GetFieldConverter(t string) (*data.FieldConverter, error) {
	switch t {
	case boolDatatype:
		return &BoolToBool, nil
	case byteDatatype:
		return &NumericToFloat64, nil
	case shortDatatype:
		return &NumericToFloat64, nil
	case charDatatype:
		return &ToString, nil
	case intDatatype:
		return &NumericToFloat64, nil
	case floatDatatype:
		return &NumericToFloat64, nil
	case symbolDatatype:
		return &ToString, nil
	case stringDatatype:
		return &ToString, nil
	case longDatatype:
		return &NumericToFloat64, nil
	case dateDatatype:
		return &StringToTime, nil
	case timestampDatatype:
		return &StringToTime, nil
	case doubleDatatype:
		return &NumericToFloat64, nil
	case binaryDataType:
		return &ToString, nil
	case long256DataType:
		return &ToString, nil
	}

	return nil, fmt.Errorf("No converter found for type [%v]", t)
}

var BoolToBool = data.FieldConverter{
	OutputFieldType: data.FieldTypeNullableBool,
	Converter: func(v interface{}) (interface{}, error) {
		if v == nil {
			return nil, nil
		}
		val, ok := v.(bool)
		if !ok {
			return nil, fmt.Errorf("[bool] wanted, source type is %T", v)
		}
		return &val, nil
	},
}

var NumericToFloat64 = data.FieldConverter{
	OutputFieldType: data.FieldTypeNullableFloat64,
	Converter: func(v interface{}) (interface{}, error) {
		if v == nil {
			return nil, nil
		}
		val, ok := v.(float64)
		if !ok {
			return nil, fmt.Errorf("[float64] wanted, source type is %T", v)
		}
		return &val, nil
	},
}

var StringToTime = data.FieldConverter{
	OutputFieldType: data.FieldTypeTime,
	Converter: func(v interface{}) (interface{}, error) {
		raw, ok := v.(string)
		if !ok {
			return nil, fmt.Errorf("[string] wanted, source type is %T", v)
		}
		val, err := time.Parse(
			time.RFC3339,
			raw,
		)
		if err != nil {
			return nil, err
		}
		return val, nil
	},
}

var ToString = data.FieldConverter{
	OutputFieldType: data.FieldTypeNullableString,
	Converter: func(v interface{}) (interface{}, error) {
		if v == nil {
			return nil, nil
		}
		str := fmt.Sprintf("%+v", v)
		return &str, nil
	},
}

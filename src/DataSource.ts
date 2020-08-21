import { DataFrame, DataQueryResponse, DataSourceInstanceSettings, Field } from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';

import { QuestdbOptions, QuestdbQuery } from './types';

export class DataSource extends DataSourceWithBackend<QuestdbQuery, QuestdbOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<QuestdbOptions>) {
    super(instanceSettings);
  }

  filterQuery = (query: QuestdbQuery) => Boolean(query.queryText) && query.queryText !== '';

  async processResponse(res: DataQueryResponse): Promise<DataQueryResponse> {
    if (res.state === 'Error' && res.data.length > 0) {
      const data = res.data as DataFrame[];
      const fields = data[0].fields as [Field<string>, Field<number>];

      return Promise.resolve({
        ...res,
        data: [],
        error: {
          ...res.error,
          // @ts-ignore
          query: fields[0].values.toArray()[0],
          position: fields[1].values.toArray()[0],
        },
      });
    }
    return res;
  }
}

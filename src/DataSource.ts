import { DataSourceInstanceSettings } from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';

import { QuestdbOptions, QuestdbQuery } from './types';

export class DataSource extends DataSourceWithBackend<QuestdbQuery, QuestdbOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<QuestdbOptions>) {
    super(instanceSettings);
  }
}

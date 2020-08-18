import { DataSourcePlugin } from '@grafana/data';

import { DataSource } from './DataSource';
import { ConfigEditor } from './ConfigEditor';
import { QueryEditor } from './QueryEditor';
import { QuestdbQuery, QuestdbOptions } from './types';

export const plugin = new DataSourcePlugin<DataSource, QuestdbQuery, QuestdbOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);

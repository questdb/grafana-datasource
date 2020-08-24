import { DataSourcePlugin } from '@grafana/data';

import { ConfigEditor } from './components/ConfigEditor';
import { QueryEditor } from './components/QueryEditor';
import { DataSource } from './DataSource';
import { QuestdbQuery, QuestdbOptions } from './types';

export const plugin = new DataSourcePlugin<DataSource, QuestdbQuery, QuestdbOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);

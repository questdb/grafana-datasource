import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface QuestdbQuery extends DataQuery {
  queryText?: string;
}

export const defaultQuery: Partial<QuestdbQuery> = {};

export interface QuestdbOptions extends DataSourceJsonData {
  url?: string;
}

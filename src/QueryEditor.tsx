import { QueryEditorProps } from '@grafana/data';
import { LegacyForms } from '@grafana/ui';
import React, { ChangeEvent, useCallback } from 'react';

import { DataSource } from './DataSource';
import { QuestdbOptions, QuestdbQuery } from './types';

const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, QuestdbQuery, QuestdbOptions>;

export const QueryEditor = ({ onChange, query }: Props) => {
  const onQueryTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...query, queryText: event.target.value });
    },
    [onChange, query]
  );

  return (
    <div className="gf-form">
      <FormField labelWidth={8} value={query.queryText || ''} onChange={onQueryTextChange} label="Query Text" />
    </div>
  );
};

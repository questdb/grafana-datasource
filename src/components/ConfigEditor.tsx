import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { LegacyForms } from '@grafana/ui';
import React, { ChangeEvent, useCallback } from 'react';

import { QuestdbOptions } from '../types';

const { FormField } = LegacyForms;

type Props = DataSourcePluginOptionsEditorProps<QuestdbOptions>;

export const ConfigEditor = ({ onOptionsChange, options }: Props) => {
  const onUrlChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onOptionsChange({
        ...options,
        jsonData: {
          ...options.jsonData,
          url: event.target.value,
        },
      });
    },
    [onOptionsChange, options]
  );

  return (
    <div className="gf-form-group">
      <div className="gf-form">
        <FormField
          label="URL"
          labelWidth={6}
          inputWidth={20}
          onChange={onUrlChange}
          value={options.jsonData.url || ''}
          placeholder="http://localhost:9000"
        />
      </div>
    </div>
  );
};

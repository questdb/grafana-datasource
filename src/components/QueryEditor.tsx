import { cx, css } from 'emotion';
import { GrafanaTheme, QueryEditorProps } from '@grafana/data';
import { CodeEditor, Icon, stylesFactory, useTheme } from '@grafana/ui';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSize from '@react-hook/size';
import _monaco from 'monaco-editor';

import * as COPY from '../copy/ConfigEditor';
import { DataSource } from '../DataSource';
import { QuestdbOptions, QuestdbQuery } from '../types';
import * as lang from '../utils/lang';

declare const monaco: typeof _monaco;

type Props = QueryEditorProps<DataSource, QuestdbQuery, QuestdbOptions>;

type Error = {
  position: number;
  query: string;
};

const EDITOR_HEIGHT = 250;
const COMFORTABLE_VIEWPORT = 3;
const CHAR_SIZE = 7.2;
const ALERT_PADDING = 20;
const RIGHT_OFFSET = 150;

export const QueryEditor = ({ data, onChange, onRunQuery, query, ...rest }: Props) => {
  const editorNode = useRef(null);
  const queryErrorNode = useRef<HTMLSpanElement>(null);
  const theme = useTheme();
  const [focused, setFocused] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const [queryErrorWidth, setQueryErrorWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [help, setHelp] = useState(false);
  const styles = getStyles(theme, query.hide === true, focused);
  const [editorWidth] = useSize(editorNode);

  const handleHelpClick = useCallback(() => setHelp(!help), [help]);
  const handleChange = useCallback(
    val => {
      onChange({ ...query, queryText: val });
    },
    [query]
  );

  const handleEditorDidMount = useCallback(_editor => {
    const editor = _editor as _monaco.editor.IStandaloneCodeEditor;
    const disposables: _monaco.IDisposable[] = [];
    disposables.push(
      editor.onDidChangeModelContent(model => {
        handleChange(editor.getValue());
      })
    );

    disposables.push(
      editor.onDidFocusEditorText(() => {
        setFocused(true);
      })
    );

    disposables.push(
      editor.onDidBlurEditorText(() => {
        setFocused(false);
      })
    );

    disposables.push(
      editor.addAction({
        id: 'run-questdb-query',
        label: 'Run',
        keybindings: [monaco.KeyMod.Shift | monaco.KeyCode.Enter],
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        run: () => {
          onRunQuery();
        },
      })
    );

    if (monaco) {
      monaco.languages.register({ id: lang.ID });
      monaco.languages.setMonarchTokensProvider(lang.ID, lang.language);
      monaco.languages.setLanguageConfiguration(lang.ID, lang.conf);
    }

    editor.focus();
    handleChange(COPY.defaultQuery);

    return () => {
      disposables.forEach(disposable => {
        disposable.dispose();
      });
    };
  }, []);

  useEffect(() => {
    const error = data?.error?.refId === query.refId;

    if (!data || !data.error || !error) {
      setError(undefined);
      return;
    }

    setError(data.error as Error & { message: string });
  }, [data, query.refId]);

  useEffect(() => {
    const node = queryErrorNode.current;
    if (node) {
      const { width } = node.getBoundingClientRect();
      setQueryErrorWidth(width);
    }
  }, [error, queryErrorNode.current]);

  useEffect(() => {
    if (error && error.position * CHAR_SIZE + 2 * ALERT_PADDING + RIGHT_OFFSET >= editorWidth) {
      setOffset(Math.max(0, CHAR_SIZE * error.position - queryErrorWidth / COMFORTABLE_VIEWPORT));
    } else {
      setOffset(0);
    }
  }, [editorWidth, error, queryErrorWidth]);

  return (
    <div className={cx('gf-form', styles.wrapper)}>
      <div className={cx('gf-form-inline', styles.editorWrapper)} ref={editorNode}>
        <div className={cx('gf-form', styles.editorInner)}>
          <CodeEditor
            height={EDITOR_HEIGHT}
            language={lang.ID}
            onBlur={handleChange}
            onEditorDidMount={handleEditorDidMount}
            onSave={handleChange}
            readOnly={query.hide === true}
            showMiniMap={false}
            showLineNumbers
            width={editorWidth - 2 || 600}
            value={query.queryText || COPY.defaultQuery}
          />
          <div className={styles.overlay}>Disabled</div>
        </div>
      </div>

      <div class="gf-form-inline">
        <div class="gf-form">
          <label class="gf-form-label query-keyword width-16">
            <span>
              <Icon name="info-circle" />
              &nbsp;Run your query with: <code>Shift+Enter</code>
            </span>
          </label>
        </div>
        <div class="gf-form gf-form--grow">
          <div class="gf-form-label gf-form-label--grow"></div>
        </div>
        <div class="gf-form">
          <label class="gf-form-label query-keyword width-6 pointer" onClick={handleHelpClick}>
            Show Help
            <Icon name={help ? 'angle-down' : 'angle-right'} />
          </label>
        </div>
      </div>

      {help && (
        <div class="gf-form">
          <pre class="gf-form-pre alert alert-info">{COPY.help}</pre>
        </div>
      )}

      {error && (
        <div className="gf-form-inline">
          <pre className={cx('gf-form-pre', 'alert', 'alert-error', styles.pre)}>
            {error.query && (
              <span ref={queryErrorNode} style={{ marginLeft: -offset }}>
                {error.query}
              </span>
            )}
            <div className={styles.error} style={{ textIndent: error.position * CHAR_SIZE - offset }}>
              {error.position > -1 && '^ '}
              {data?.error?.message}
            </div>
          </pre>
        </div>
      )}
    </div>
  );
};

const getStyles = stylesFactory((theme: GrafanaTheme, isDisabled: boolean, isFocused: boolean) => ({
  editorWrapper: css`
    position: relative;
    min-height: calc(${EDITOR_HEIGHT}px + 2px);
    margin-top: ${theme.spacing.sm};
    margin-right: ${theme.spacing.inlineFormMargin};
    align-content: stretch;
  `,
  editorInner: cx(
    css`
      display: flex;
      flex: 1 1 100%;
      align-items: center;
      justify-content: center;
      border-radius: ${theme.border.radius.md};
      border: 1px solid ${theme.colors.formInputBorder};
    `,
    isDisabled &&
      css`
        .react-monaco-editor-container {
          opacity: 0.5;
        }
      `
  ),
  overlay: cx(
    css`
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      font-size: ${theme.typography.size.sm};
      font-style: italic;
      color: ${theme.colors.textWeak};
    `,
    isDisabled &&
      css`
        display: flex;
      `
  ),
  wrapper: css`
    flex-direction: column;
    align-items: stretch;
  `,
  pre: css`
    position: relative;
    padding: 15px ${ALERT_PADDING}px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    ::before {
      content: ' ';
      display: block;
      position: absolute;
      height: 100%;
      width: ${ALERT_PADDING}px;
      top: 0;
      left: 0;
      border-radius: ${theme.border.radius.md};
      background: ${theme.colors.formValidationMessageBg};
    }
  `,
  error: css`
    white-space: initial;
    overflow: initial;
  `,
}));

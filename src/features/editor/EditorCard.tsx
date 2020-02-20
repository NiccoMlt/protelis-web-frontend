import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  CloudUpload,
  Description,
  Save,
  Send,
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress, Typography,
} from '@material-ui/core';
import { ControlledEditor } from '@monaco-editor/react';
import { Dispatch } from 'redux';
import { ProtelisSourceFile } from '../../model/File';
import { RootState } from '../../app/rootReducer';
import { getSourceFileAtPath } from '../../utils/fileUtils';
import { editFile } from './editorSlice';
import { ebUpload } from '../../utils/EventBusMiddleware';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

/** Container component that wraps TreeView and Editor. */
const EditorCard: React.FC = () => {
  const classes = useStyles();

  const path: string | null = useSelector<RootState, string | null>((state) => state.editor.open);
  const open: ProtelisSourceFile | null = useSelector<RootState, ProtelisSourceFile | null>(
    (state) => (state.editor.open
      ? getSourceFileAtPath(state.editor.files, state.editor.open)
      : null
    ),
  );
  const connected: boolean = useSelector<RootState, boolean>((state) => state.exec.connection === 'open');
  const canSend: boolean = connected && (open?.content?.trim()?.length ?? 0) > 0;

  const dispatch: Dispatch = useDispatch();

  const [value, setValue] = useState<string | undefined>(open?.content);
  // If component updates because of Redux, refresh content if file is open
  useEffect(() => setValue(open?.content), [open]);

  return (
    <Card>
      <CardHeader
        title={(
          <Box display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="center" alignItems="center">
            <Description />
            <Typography variant="h6">
              {path}
            </Typography>
          </Box>
        )}
      />
      <CardContent>
        <ControlledEditor
          height="70vh"
          language="protelis"
          loading={<CircularProgress color="primary" />}
          onChange={(_, newValue) => setValue(newValue)}
          options={{
            automaticLayout: true,
            lineNumbers: 'on',
            minimap: { enabled: false },
            readOnly: (!open),
          }}
          theme="dark"
          value={open ? value : null}
        />
      </CardContent>
      <CardActions>
        <label htmlFor="contained-button-file">
          <input
            accept="text/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            disabled // TODO
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<CloudUpload />}
            disabled // TODO
          >
            Upload
          </Button>
        </label>
        <Button
          variant="contained"
          component="span"
          color="primary"
          className={classes.button}
          startIcon={<Save />}
          onClick={() => {
            if (path && value) dispatch(editFile({ path, content: value }));
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          component="span"
          color="primary"
          className={classes.button}
          startIcon={<Send />}
          disabled={!canSend}
          onClick={() => dispatch(ebUpload())}
        >
          Run
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditorCard;

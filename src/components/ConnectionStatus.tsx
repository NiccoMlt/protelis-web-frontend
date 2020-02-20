import {
  Typography,
  Toolbar,
  ToolbarProps,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { CheckCircle, Cancel } from '@material-ui/icons';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from '@material-ui/lab';
import { RootState } from '../app/rootReducer';
import { ebConnect } from '../utils/EventBusMiddleware';
import { EventBusStatus } from '../features/render/execSlice';

const referenceBackend = 'https://efesto.apice.unibo.it/eventbus/';

const testBackends: string[] = [
  'http://localhost:8080/eventbus/',
  'https://localhost:8443/eventbus/',
  'http://efesto.apice.unibo.it/eventbus/',
];

const productionBackends: string[] = [
  referenceBackend,
  'https://protelis-web.herokuapp.com/eventbus/',
  'https://protelis-web-develop.herokuapp.com/eventbus/',
];

function isDev() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

const ConnectionStatus: React.FC = (props: Exclude<ToolbarProps, ['children', 'container', 'item']>) => {
  const connection: EventBusStatus = useSelector((state: RootState) => state.exec.connection);

  function connectionIcon(): ReactElement {
    switch (connection) {
      case 'open':
        return <CheckCircle style={{ color: 'green' }} />;
      case 'closed':
        return <Cancel style={{ color: 'red' }} />;
      case 'pending':
      default:
        return <CircularProgress color="primary" size={24} />;
    }
  }

  const dispatch = useDispatch();

  const [backends, setBackends] = useState(isDev() ? [
    ...productionBackends,
    ...testBackends,
  ] : [
    ...productionBackends,
  ]);

  const [selected, setSelected] = useState(isDev ? backends[0] : referenceBackend);

  return (
    <Toolbar {...props}>
      <Typography variant="h6">
        Connection:&nbsp;
      </Typography>
      <Typography variant="h6">
        <Autocomplete
          id="backend-selector"
          color="inherit"
          freeSolo
          options={backends}
          value={selected}
          getOptionLabel={(option: string) => option}
          onChange={(event: React.ChangeEvent<{}>, value: string | null) => {
            setSelected(value?.trim() || '');
          }}
          style={{ width: 450 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSelected(event.target.value?.trim() || '');
              }}
            />
          )}
        />
      </Typography>
      <Button
        variant="contained"
        aria-label="connect"
        startIcon={connectionIcon()}
        onClick={() => {
          let choice = selected.trim();
          if (choice[choice.length - 1] !== '/') {
            choice += '/';
          }
          if (backends.filter((value) => value.trim() === choice).length <= 0) {
            setBackends([choice, ...backends]);
          }
          return dispatch(ebConnect({ host: selected }));
        }}
      >
        Connect
      </Button>
    </Toolbar>
  );
};

export default ConnectionStatus;

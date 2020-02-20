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

const ConnectionStatus: React.FC = (props: Exclude<ToolbarProps, ['children', 'container', 'item']>) => {
  const connection: EventBusStatus = useSelector((state: RootState) => state.exec.connection);

  function connectionIcon(): ReactElement {
    switch (connection) {
      case 'open':
        return <CheckCircle color="inherit" />;
      case 'closed':
        return <Cancel color="inherit" />;
      case 'pending':
      default:
        return <CircularProgress color="inherit" size={24} />;
    }
  }

  const dispatch = useDispatch();

  const [backends, setBackends] = useState(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? [
    'http://localhost:8080/eventbus/',
    'https://protelis-web.herokuapp.com/eventbus/',
    'https://protelis-web-develop.herokuapp.com/eventbus/',
  ] : [
    'https://protelis-web.herokuapp.com/eventbus/',
    'https://protelis-web-develop.herokuapp.com/eventbus/',
  ]);

  const [selected, setSelected] = useState(backends[0]);

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

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  Grid, Paper, CssBaseline, createMuiTheme, useMediaQuery,
} from '@material-ui/core';
import {
  ThemeProvider, Theme, makeStyles, createStyles,
} from '@material-ui/core/styles';

import ProtelisAppBar from '../components/ProtelisAppBar';
import ProtelisEditor from '../features/editor/ProtelisEditor';
import { protelisTheme } from '../styles/theme';
import RenderCanvas from '../features/render/RenderCanvas';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(1, 1),
    flexGrow: 1,
    height: '100%',
  },
}));

const App: React.FC = () => {
  const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)');

  const theme: Theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
        primary: protelisTheme.palette.primary,
      },
    }),
    [prefersDarkMode],
  );

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <ProtelisAppBar />
        <Router>
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <ProtelisEditor />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Paper>
                <RenderCanvas />
              </Paper>
            </Grid>
          </Grid>
        </Router>
      </div>
    </ThemeProvider>
  );
};
export default App;

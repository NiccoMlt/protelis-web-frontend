import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  Grid,
  CssBaseline,
  createMuiTheme,
  useMediaQuery,
} from '@material-ui/core';
import {
  ThemeProvider,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import ProtelisAppBar from '../components/ProtelisAppBar';
import EditorCard from '../features/editor/EditorCard';
import { protelisTheme } from '../styles/theme';
import RenderCard from '../features/render/RenderCard';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(1, 1),
    margin: theme.spacing(0),
    flexGrow: 0,
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

/** Main app component. */
const App: React.FC = () => {
  const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)');

  const theme: Theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
        ...protelisTheme.palette,
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
            <Grid item xs>
              <EditorCard />
            </Grid>
            <Grid item xs>
              <RenderCard />
            </Grid>
          </Grid>
        </Router>
      </div>
    </ThemeProvider>
  );
};
export default App;

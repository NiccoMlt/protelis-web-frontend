import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Logo from '../styles/logo.png';
import ConnectionStatus from './ConnectionStatus';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 32,
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

/** This React function component models a TopAppBar that acts as a website nav bar. */
const ProtelisAppBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <img src={Logo} alt="logo" className={classes.logo} />
          <Typography variant="h6" className={classes.title} noWrap>
            Protelis on the Web
          </Typography>
          <ConnectionStatus />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ProtelisAppBar;

import { AppBar, Grid, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';

function FooterLayout1(props) {
  const footerTheme = useSelector(selectFooterTheme);
  const matches = useMediaQuery('(min-width:600px)');
  const navBar = useMediaQuery('(min-width:1200px)');

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar
        id="fuse-footer"
        className={clsx('shadow-md', props.className)}
        color="default"
        style={{ backgroundColor: 'white', bottom: 0, minHeight: 60, top: matches ? '95%' : '92%' }}
      >
        <Grid container >
          <Grid item xs={12} lg={12}>

            <Toolbar
            style={{marginLeft:'4%', marginRight:'3.8%'}}
            className="min-h-48 p-8 sm:p-12 flex items-center overflow-x-auto flex-col md:flex-row justify-center md:justify-between">
              <div className='flex'>
                <p className='text-primaryBlack font-400 mr-4'>
                  Realizado por William Caleb Sáenz
                </p>
                <p className='text-primary font-600 '>

                </p>
              </div>
              <p className='text-primaryBlack font-400'>
                Todos los derechos reservados · 2024
              </p>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(FooterLayout1);

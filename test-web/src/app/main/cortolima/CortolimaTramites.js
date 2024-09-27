import withReducer from 'app/store/withReducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


import {
  Grid
} from '@mui/material';
import { makeStyles } from '@mui/styles';


import CustomNavbar from '@components/CustomNavbar';
import reducer from './store';

const useStyles = makeStyles(() => ({
  headContain: {
    backgroundImage: 'url(/assets/images/backgrounds/profile.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: 160,
  },
  cardInfo: {
    width: 350,
    border: '1px solid #E6F0FA',
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover': {
      boxShadow: ' 0px 2px 16px 4px rgba(2, 62, 115, 0.1)',
    },
  },
  cusToggleButton: {
    '& .MuiButtonBase-root.Mui-selected': {
      backgroundColor: '#023E73',
      color: '#4FDFC8',
      borderRadius: 25,
      textTransform: 'none',
    },
    '& .MuiButtonBase-root': {
      backgroundColor: 'transparent',
      color: '#023E73',
      width: 'fit-content',
      minWidth: 67,
      height: 38,
      textTransform: 'none',
      border: '1px solid #023E73',
      borderLeft: '1px solid #023E73 !important',
      borderRadius: '25px !important',
      margin: 10,
    },
  },
}));

function CortolimaTramites() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [search, setSearch] = useState(0);
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(false);




  return (
    <div className="bg-white">
      <CustomNavbar loginButton singInButton />
      <Grid container justifyContent="center" className={classes.headContain}>
        <Grid item xs={11} lg={10} className="flex flex-col pt-20">
          {/* <IconButton
            style={{ backgroundColor: '#EEF7FF', height: 24, width: 24 }}
            onClick={() => {
              history.push('/');
            }}
          >
            <ArrowBackIosRoundedIcon style={{ color: '#023E73', fontSize: 15 }} />
          </IconButton> */}
          <div className="flex mt-20">
            <img
              src="/assets/images/logos/4.jpg"
              alt="cortolima"
              style={{ minWidth: 72, minHeight: 72 }}
            />
            <div className="ml-12">
              <p className="text-18 font-bold text-white"> William Caleb Sáenz </p>
              <p className="text-16 font-500 text-white"> Prueba técnica </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withReducer('item', reducer)(CortolimaTramites);

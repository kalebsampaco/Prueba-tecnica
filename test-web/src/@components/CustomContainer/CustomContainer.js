import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'

const useStyles = makeStyles(() => ({
    infoContainer: {
      borderRadius: 8,
      border: '1px solid #D1E3F5',
      padding: 16,
      width:'100%'
    },
  


  }));

const CustomContainer = (props) => {
    const {content, title} = props;
    const classes = useStyles();
  return (
    <div className='h-full'>
      <Typography style={{color:'#4C647A'}} className='font-bold text-16 mb-8'>{title}</Typography>
    <div className={classes.infoContainer} {...props}>
{content}
    </div>
    </div>
  )
}

export default CustomContainer
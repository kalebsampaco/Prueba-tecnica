import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    color: theme.palette.secondary.dark,
    '& .muiltr-18um4k8-MuiButtonBase-root-MuiIconButton-root': {
      color: '#BDD7EF',
    },
    '&:hover .muiltr-18um4k8-MuiButtonBase-root-MuiIconButton-root': {
      color: '#00274A',
    },
    '&:focus .muiltr-18um4k8-MuiButtonBase-root-MuiIconButton-root': {
      color: '#145C9C',
    },
    '&.Mui-error .muiltr-18um4k8-MuiButtonBase-root-MuiIconButton-root': {
      color: '#FF4D4D',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 6,
      height: 42,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#BDD7EF',
        borderWidth: 1,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#00274A',
        borderWidth: 1,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#145C9C',
        borderWidth: 1,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FF4D4D',
        borderWidth: 1,
      },
      '&.Mui-disabled': {
        background: '#F9FCFF',
        color: '#9DB8D1',
        borderColor: '#BDD7EF',
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#BDD7EF',
          borderWidth: 1,
        },
      },
      '&.MuiInputBase-root': {
        '& input::placeholder': {
          color: 'red',
          opacity: 1,
        },
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: ' 0px 16px',
      color: '#223240',
      fontWeight: 400,
      fontSize: 14,
      '&.Mui-disabled': {
        color: '#9DB8D1',
      },
    },
    '& .MuiFormHelperText-root': {
      color: 'orange',
      marginTop: 4,
      fontWeight: 500,
      textAlign: 'right',
      '&.Mui-error': {
        color: '#FF4D4D',
      },
    },
    '& .MuiFormLabel-root': {
      color: '#BDD7EF',
      fontWeight: 400,
      fontSize: 12,
    },
    '& .MuiInputLabel-shrink': {
      color: '#BDD7EF',
      fontWeight: 400,
      fontSize: 14,
      '&.Mui-focused': {
        color: '#145C9C',
        fontWeight: 500,
      },
      '&.Mui-error': {
        color: '#FF4D4D',
        fontWeight: 500,
      },
      '&.Mui-disabled': {
        color: '#9DB8D1',
      },
    },
    '&:hover .MuiFormLabel-root': {
      color: '#223240',
      '&.Mui-disabled': {
        color: '#9DB8D1',
      },
    },
  },
  customDialog: {
    '& .MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)': {
      background: '#023E73',
      border: '1px solid #023E73',
      color: '#4FDFC8',
    },
    '& svg': {
      color: '#4FDFC8',
    },
  },
}));

const CustomTimePicker = (props) => {
  const { error, label, value, onChange } = props;
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileTimePicker
        {...props}
        label={label}
        showToolbar={false}
        DialogProps={{ className: classes.customDialog }}
        className={classes.textField}
        clearable
        onChange={onChange}
        ampm={false}
        renderInput={(params) => (
          <TextField
            {...params}
            error={false}
            className="w-full"
            value={value}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <AccessTimeFilledIcon
            //         color={error ? '#FF4D4D' : '#BDD7EF'}
            //         width="18"
            //         height="18"
            //       />
            //     </InputAdornment>
            //   ),
            // }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;

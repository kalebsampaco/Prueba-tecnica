import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  primary: {
    background: '#023E73',
    color: '#4FDFC8',
    borderRadius: 8,
    '&:hover': {
      background: '#145C9C',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#2E7EC5',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: '#EEF7FF',
      textDecoration: 'none',
      color: '#B2DBFF',
    },
  },
  outlineSecondaryLight: {
    background: '#D0E9FF',
    color: '#145C9C',
    borderRadius: 8,
    border: '1px solid #145C9C',
    padding: 14,
    '&:hover': {
      background: 'white',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#EEF7FF',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: '#EEF7FF',
      textDecoration: 'none',
      color: '#B2DBFF',
    },
  },
  outlinePrimary: {
    background: 'white',
    border: '1px solid #145C9C',
    color: '#145C9C',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      background: '#EEF7FF',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#D0E9FF',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: 'white',
      textDecoration: 'none',
      color: '#B2DBFF',
      border: '1px solid #B2DBFF',
    },
  },
  secundary: {
    background: '#4FDFC8',
    color: '#023E73',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      background: '#66FFE6',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#88FFEC',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: '#EEF7FF',
      textDecoration: 'none',
      color: '#B2DBFF',
    },
  },
  outlineSecondary: {
    background: 'white',
    border: '1px solid #4FDFC8',
    color: '#4FDFC8',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      background: '#EFFFFC',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#CDFFF7',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: 'white',
      textDecoration: 'none',
      color: '#B2DBFF',
      border: '1px solid #B2DBFF',
    },
  },
  textButton: {
    background: 'white',
    color: '#145C9C',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      background: 'transparent',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#D0E9FF',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: 'white',
      textDecoration: 'none',
      color: '#B2DBFF',
    },
  },
  errorButton: {
    background: '#FFC5C5',
    color: '#00274A',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      background: '#FFBDBD',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#FCBABA',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: '#FFEDED',
      textDecoration: 'none',
      color: '#FFB7B7',
    },
  },
  linkButton: {
    background: 'white',
    color: '#145C9C',
    textDecoration: 'underline',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      textDecoration: 'underline',
      background: 'white',
      color: '#2E7EC5',
    },
    '&:focus': {
      textDecoration: 'underline',
      background: 'white',
      color: '#51A4ED',
    },
    '&:disabled': {
      textDecoration: 'underline',
      background: 'white',
      color: '#B2DBFF',
    },
  },
  customGeneral: {
    textTransform: 'none',
    padding: 14,
    fontWeight: 600,
    fontSize: 14,
  },
}));

const CustomButton = (props) => {
  const {
    label,
    disabled,
    onClick,
    width,
    height,
    className,
    startIcon,
    href,
    endIcon,
    style,
    component,
  } = props;
  const classes = useStyles();
  const sizeButtonHeight =
    height === 'extralarge'
      ? 64
      : height === 'large'
      ? 56
      : height === 'medium'
      ? 48
      : height === 'xmedium'
      ? 43
      : 32;
  const sizeButtonWidth = width === 'full' ? '100%' : 'fit-content';
  const typeButton =
    className === 'primary'
      ? classes.primary
      : className === 'outlinePrimary'
      ? classes.outlinePrimary
      : className === 'secondary'
      ? classes.secundary
      : className === 'outlineSecondary'
      ? classes.outlineSecondary
      : className === 'linkButton'
      ? classes.linkButton
      : className === 'error'
      ? classes.errorButton
      : className === 'outlineSecondaryLight'
      ? classes.outlineSecondaryLight
      : classes.textButton;

  return (
    <Button
      {...props}
      className={clsx(typeButton, classes.customGeneral)}
      style={{ ...style, width: sizeButtonWidth, height: sizeButtonHeight }}
      disabled={disabled}
      disableElevation
      disableRipple={false}
      variant={
        className === 'primary' ? 'contained' : className === 'outlined' ? 'outlined' : 'text'
      }
      onClick={onClick}
      href={href}
      startIcon={startIcon}
      endIcon={endIcon}
      component={component}
    >
      {label}
    </Button>
  );
};

export default CustomButton;

import { TextField, Typography, MenuItem, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'flex',
    padding: 0,
    cursor: 'pointer',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflowY: 'auto',
    padding: 11,
    cursor: 'pointer',
    '& > div': {
      '&.css-1rhbuit-multiValue': {
        backgroundColor: '#F1F3FF',
        borderRadius: 6,
      },
    },
    '&::-webkit-scrollbar': {
      width: 5,
      height: 0,
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#c3c3c3',
      borderRadius: 2,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#888',
      borderRadius: 2,
    },
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
    color: '#333333',
  },
  placeholder: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 400,
    cursor: 'pointer',
  },
  paper: {
    zIndex: 99,
    background: '#FFF',
    left: 0,
    right: 0,
    position: 'absolute',
    '& > div': {
      maxHeight: 200,
      '&::-webkit-scrollbar': {
        width: 5,
        height: 0,
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#c3c3c3',
        borderRadius: 2,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#888',
        borderRadius: 2,
      },

      '& > div': {
        background: '#FFF',
        margin: '0px 8px 0px 3px',
        '&:hover': {
          background: `#E4E7F8 !important`,
          color: '#023E73',
          borderRadius: 4,
        },
      },
    },
  },
  select: {
    width: '100%',
    '& .MuiMenuItem-root': {
      minHeight: 48,
    },
    '& .MuiFormLabel-root': {
      fontSize: 11,
    },
    '& .MuiOutlinedInput-input': {
      fontSize: 16,
      height: '50%',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 6,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#BDD7EF',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#145C9C',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#145C9C',
        borderWidth: 1,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FF4D4D',
      },
      '&.Mui-disabled': {
        // background: colors.select.bgDisabled,
        color: '#9DB8D1',
      },
    },
    '& .MuiMenuItem-gutters': {
      fontSize: 12,
    },
    '& .MuiInputLabel-shrink': {
      //   color: colors.select.text,
      fontSize: 16,
      fontWeight: 400,
      '&.Mui-focused': {
        // color: colors.select.textPrimary,
      },
    },
  },
}));

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired,
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps, style },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
          style: { style},
        },
      }}
      {...TextFieldProps}
    />
  );
}

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
};

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
};

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object,
};

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

function IndicatorSeparator() {
  return null;
}

function DropdownIndicator() {
  return (
    <img
      src="/assets/images/select/arrowDropDown.png"
      alt="arrow"
      style={{ maxWidth: 20, maxHeight: 20, marginRight: 19 }}
    />
  );
}

const ClearIndicator = (props) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref} style={getStyles('clearIndicator', props)}>
      <img
        src="/assets/images/select/ic-close-circle.svg"
        alt="clear"
        style={{ width: 20, maxHeight: 20 }}
      />
    </div>
  );
};

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  IndicatorSeparator,
  DropdownIndicator,
  ClearIndicator,
};

function CustomSelect(props) {
  const classes = useStyles();
  const {
    required,
    error,
    label,
    disabled,
    id,
    isClearable,
    value,
    minLength,
    maxLength,
    isMulti
  } = props;

  return (
    <Select
      style={{maxHeight: `${(8*value.length) + 100}px`,height: `${(8*value.length) + 100}px`}}
      {...props}
      classes={classes}
      className={classes.select}
      instanceId={id}
      TextFieldProps={{
        label: value ? label : '',
        InputLabelProps: {
          htmlFor: id,
          shrink: true,
          style:{maxHeight: `${(8*value.length) + 100}px`,height: `${(8*value.length) + 100}px`}
        },
        variant: 'outlined',
        required,
        error,
        disabled,
      }}
      isDisabled={disabled}
      isClearable={isClearable}
      isMulti={isMulti}
      components={components}
      inputProps={{
        maxLength,
        minLength,
      }}
    />
  );
}

export default CustomSelect;

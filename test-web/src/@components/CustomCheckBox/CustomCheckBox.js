import { Checkbox } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Controller } from 'react-hook-form';

// import { ReactComponent as SVGchecked } from './CheckedIcon/checked.svg';

const useStyles = makeStyles((theme) => ({
  checkBox: {
    color: '#9DB8D1',
    '&.Mui-checked': {
      color: '#4FDFC8',
    },
  },
  checkBoxDisabled: {
    color: '#9DB8D1',
    '&.Mui-checked': {
      color: '#9DB8D1',
    },
  },
}));

const CustomCheckBox = (props) => {
  const { disabled, label, rounded, checked, onChange, color } = props;
  const classes = useStyles();
  const iconType = rounded ? <RadioButtonUncheckedIcon /> : <CheckBoxOutlineBlankIcon />;
  const checkedIconType = rounded ? <RadioButtonCheckedIcon /> : <CheckBoxIcon />;

  if (props.control && props.name) {
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <Controller
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <Checkbox
              {...field}
              {...props}
              className={disabled ? classes.checkBoxDisabled : classes.checkBox}
              style={{ padding: 0 }}
              color="primary"
              icon={iconType}
              checkedIcon={checkedIconType}
            />
          )}
        />
        <p
          style={{
            color: color || (disabled ? '#9DB8D1' : '#243161'),
          }}
          className="ml-6 text-14"
        >
          {label}
        </p>
      </div>
      {props.error && <p className="text-12 text-red-500">{props.error}</p>}
    </div>;
  }

  return (
    <div className="flex items-center">
      <Checkbox
        {...props}
        className={disabled ? classes.checkBoxDisabled : classes.checkBox}
        style={{ padding: 0 }}
        color="primary"
        icon={iconType}
        checkedIcon={checkedIconType}
        checked={checked}
        onChange={onChange}
      />
      <p
        style={{
          color: color || (disabled ? '#9DB8D1' : '#243161'),
        }}
        className={`ml-6 ${props?.text === '10' ? 'text-11' : 'text-14'}`}
      >
        {label}
      </p>
    </div>
  );
};
export default CustomCheckBox;

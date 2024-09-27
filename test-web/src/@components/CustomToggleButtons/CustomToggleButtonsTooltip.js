import clsx from 'clsx';
import { Button, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  customButtonPrimary: {
    color: 'yellow',
    textTransform: 'none',
    padding: 8,
    fontWeight: 700,
    fontSize: 14,
    minWidth: 48,
    height: 44,
  },
  btnYes: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  btnNo: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

const CustomToggleButtonsTooltip = (props) => {
  const { selectedRight, selectedLeft, open, close, labelLeft, labelRight, disabled } = props;
  const classes = useStyles();

  const btnActiveYes = selectedRight === true ? '#023E73' : '#D0E9FF';
  const textAciveYes = selectedRight === true ? '#4FDFC8' : '#243161';

  const btnActiveNo = selectedLeft === false ? '#E6F0FA' : '#023E73';
  const textAciveNo = selectedLeft === false ? '#243161' : '#4FDFC8';

  return (
    <div className="flex flex-row">
      {props.tooltip && (
        <>
          <Tooltip title={props.tooltip?.left}>
            <Button
              className={clsx(classes.customButtonPrimary, classes.btnNo)}
              style={
                disabled
                  ? { background: '#E6F0FA', color: '#9DB8D1' }
                  : { background: btnActiveNo, color: textAciveNo }
              }
              disableElevation
              disableRipple
              variant="contained"
              onClick={close}
              disabled={disabled}
            >
              {labelLeft || 'No'}
            </Button>
          </Tooltip>
          <Tooltip title={props.tooltip?.right}>
            <Button
              className={clsx(classes.customButtonPrimary, classes.btnYes)}
              style={
                disabled
                  ? { background: '#E7EAFF', color: '#9DB8D1' }
                  : { background: btnActiveYes, color: textAciveYes }
              }
              disableElevation
              disableRipple
              variant="contained"
              onClick={open}
              disabled={disabled}
            >
              {labelRight || 'Si'}
            </Button>
          </Tooltip>
        </>
      )}
    </div>
  );
};
export default CustomToggleButtonsTooltip;

import { Warning } from '@components/FuseSvgIcon';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
 alertWarning: {
  border: '1px solid #FCC500', backgroundColor: '#FFF6D6'
 },
 alertOk: {
  border: '1px solid #4FDFC8', backgroundColor: '#CDFFF7'
 }
}));

const CustomAlertInfo = (props) => {
  const { content, className } = props;
  const classes = useStyles()

  return (
    <div
    {...props}
      className={clsx(className === 'ok'? classes.alertOk : classes.alertWarning, "rounded-8 p-16 w-full flex",)}
    >
      <div className="mr-4">
        <Warning fill={className === 'ok'? '#3ABDA8': '#FCC500'}/>
      </div>
      <div className="font-semibold " style={{ color: '#364A5D' }}>
        {content}
      </div>
    </div>
  );
};

export default CustomAlertInfo;

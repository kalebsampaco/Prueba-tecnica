import { Dialog, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  paper: {
    '& .MuiPaper-root': {
      maxWidth: '50%',
    },
  },
  paperFull: {
    '& .MuiPaper-root': {
      maxWidth: '100%',
    },
  },
}));

const CustomDialog = (props) => {
  const { open, title, contentText, close, img, showClose, background, maxWidth } = props;
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      style={{ background: background ? 'white' : '' }}
      {...props}
      className={maxWidth === 'full' ? classes.paperFull : classes.paper}
    >
      <div className="flex flex-col items-center lg:min-w-512 min-h-360 p-14 px-28">
        {showClose ? (
          <div
            className=" flex justify-end fixed bg-white "
            style={{ width: '48%', marginTop: '-13px' }}
          >
            <IconButton onClick={close}>
              <CloseRoundedIcon className="fixed mt-8" style={{ color: '#023E73' }} />
            </IconButton>
          </div>
        ) : (
          ''
        )}
        <div className="font-bold text-16 mt-10">{title}</div>
        {img && <img src={img} alt="img dialog vigpro" />}
        <div className=" text-14 m-16 text-justify">{contentText}</div>
      </div>
    </Dialog>
  );
};

export default CustomDialog;

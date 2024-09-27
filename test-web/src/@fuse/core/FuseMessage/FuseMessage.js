import { amber, blue, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideMessage } from 'app/store/fuse/messageSlice';

const StyledSnackbar = styled(Snackbar)(({ theme, variant }) => ({
  '& .FuseMessage-content': {
    ...(variant === 'success' && {
      backgroundColor: '#CDFFF7',
      color: '#3ABDA8',
      border: '1px solid #3ABDA8',
      borderRadius: '8px',
    }),

    ...(variant === 'error' && {
      backgroundColor: '#FFEDED',
      color: '#FF4D4D',
      border: '1px solid #FF4D4D',
      borderRadius: '8px',
    }),

    ...(variant === 'info' && {
      backgroundColor: '#EEF7FF',
      color: '#145C9C',
      border: '1px solid #2E7EC5',
      borderRadius: '8px',
    }),

    ...(variant === 'warning' && {
      backgroundColor: '#FFF6D6',
      color: '#FCC500',
      border: '1px solid #FCC500',
      borderRadius: '8px',
    }),
  },
}));

const variantIcon = {
  success: 'check_circle',
  warning: 'warning',
  error: 'error_outline',
  info: 'info',
};

function FuseMessage(props) {
  const dispatch = useDispatch();
  const state = useSelector(({ fuse }) => fuse.message.state);
  const options = useSelector(({ fuse }) => fuse.message.options);

  return (
    <StyledSnackbar
      {...options}
      open={state}
      onClose={() => dispatch(hideMessage())}
      ContentProps={{
        variant: 'body2',
        headlineMapping: {
          body1: 'div',
          body2: 'div',
        },
      }}
    >
      <SnackbarContent
        className="FuseMessage-content"
        message={
          <div className="flex items-center">
            {variantIcon[options.variant] && (
              <Icon color="inherit">{variantIcon[options.variant]}</Icon>
            )}
            <Typography className="mx-8 font-600">{options.message}</Typography>
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => dispatch(hideMessage())}
            size="large"
          >
            <Icon>close</Icon>
          </IconButton>,
        ]}
      />
    </StyledSnackbar>
  );
}

export default memo(FuseMessage);

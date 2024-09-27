import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingButtonComponent = (props) => {
  const { width, height, color } = props;

  return (
    <LoadingButton
      loading
      loadingIndicator={<CircularProgress size={25} style={{ color: `${color}` }} />}
      variant="outlined"
      style={{
        height: `${width}`,
        width: `${height}`,
        borderColor: `${color}`,
        borderRadius: '8px',
      }}
    >
      Loading...
    </LoadingButton>
  );
};

export default LoadingButtonComponent;

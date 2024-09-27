import { Box, Grid } from '@mui/material';
import CustomButton from '@components/CustomButton';

const ModalConfirmUserOtherUsers = ({ onCLose, sendDataRegister }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} className="text-justify -mt-10">
          <span className="text-black text-justify text-20">
            Todos los trámites asignados al usuario actual, serán trasladados a otros usuarios,
            estas seguro?{' '}
          </span>
          <br /> <br />
        </Grid>
        <Grid item xs={12} md={12}>
          <div className="my-20 w-full flex items-center justify-between w-full">
            <CustomButton
              label="Volver"
              className="error"
              height="medium"
              width="full"
              onClick={onCLose}
              style={{ marginRight: 10 }}
            />
            <CustomButton
              label="Aceptar"
              className="primary"
              height="medium"
              width="full"
              onClick={sendDataRegister}
              style={{ marginLeft: 10 }}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModalConfirmUserOtherUsers;

import { Box, Grid } from '@mui/material';
import CustomButton from '@components/CustomButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CustomTextField from '@components/CustomTextField';
import { useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';

const ModalConfirmEditUser = ({
  handleCloseAlert,
  sendDataRol5or25,
  form,
  selectedAll,
  dataUser,
}) => {
  const [justificacionCierre, setJustificacion] = useState('');
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = () => {
    setJustificacion('');
    setChecked(false);
    handleCloseAlert();
  };

  const handleJustificacion = (e) => {
    if (e.target.value.toString().length > 300) {
      showMessage({
        message: '¡Solo puede ingresar hasta 300 caracteres!',
        variant: 'warning',
      });
    } else {
      setJustificacion(e.target.value);
    }
  };

  const aceptEditUser = () => {
    sendDataRol5or25(checked, justificacionCierre);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} className="text-justify -mt-10">
          <span className="text-black text-justify text-20">
            Va a realizar la asignación del Rol{' '}
            {form.cu_id_rol === 5
              ? 'Director General'
              : form.cu_id_rol === 25
              ? 'Subdirector Jurídico'
              : ''}{' '}
            al usuario{' '}
            <strong>
              {selectedAll.cu_nombres.toUpperCase()} {selectedAll.cu_apellidos.toUpperCase()}
            </strong>
          </span>
          <br /> <br />
          <span className="text-black text-justify text-20">
            Todos los trámites asignados al usuario actual, serán trasladados al usuario{' '}
            <strong>
              {selectedAll.cu_nombres.toUpperCase()} {selectedAll.cu_apellidos.toUpperCase()}
            </strong>
          </span>
          <br /> <br />
          <span className="text-black text-justify text-20">
            Total trámites a trasladar: {dataUser?.total_tramites} trámites.
          </span>
        </Grid>
        <Grid item xs={12} md={12} className="text-black text-center font-bold text-18">
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                label={
                  form.cu_id_rol === 5
                    ? 'Será Director encargado (E)'
                    : form.cu_id_rol === 25
                    ? 'Será Subdirector encargado (E)'
                    : ''
                }
                onChange={handleChange}
                height="small"
                className="secondary font-bold"
              />
            }
            className="text-black text-center font-bold text-12"
            label={
              form.cu_id_rol === 5
                ? 'Será Director encargado (E)'
                : form.cu_id_rol === 25
                ? 'Será Subdirector encargado (E)'
                : ''
            }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomTextField
            multiline
            value={justificacionCierre}
            onChange={handleJustificacion}
            rows={3}
            label="Texto de la resolución de firma"
            name="motivoRechazo"
            error={justificacionCierre === ''}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <div className="my-20 w-full flex items-center justify-between w-full">
            <CustomButton
              label="Volver"
              className="error"
              height="medium"
              width="full"
              onClick={handleClose}
              style={{ marginRight: 10 }}
            />
            <CustomButton
              label="Aceptar"
              className="primary"
              height="medium"
              width="full"
              onClick={aceptEditUser}
              style={{ marginLeft: 10 }}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModalConfirmEditUser;

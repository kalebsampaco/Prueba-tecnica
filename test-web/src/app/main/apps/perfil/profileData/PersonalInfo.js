import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, useMediaQuery } from '@mui/material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import CustomSelect from '@components/CustomSelect';
import CustomTextField from '@components/CustomTextField';
import CustomButton from '@components/CustomButton';

import API from 'app/services/constants/api';
import { isEmpty, isNil } from 'lodash';

function PersonalInfo(props) {
  const {
    form,
    emailCorrect,
    genderOptions,
    documentTypeOptions,
    documentTypeCompany,
    personTypeOptions,
    changeText,
    changeNumber,
    onChangeEmail,
    sendDataRegister,
    rolOptions,
    dataRedux,
    handleUploadChangeFirma,
  } = props;

  /* Config */
  const user = useSelector(({ auth }) => auth.user);
  const smallScreen = useMediaQuery('(min-width:750px)');

  /* States */
  const [disCompare, setDiscompare] = useState(false);
  const [data, setData] = useState(dataRedux.data);
  const [urlImgen, setUrlImgen] = useState('');

  /* useEffect */
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(form)) {
      setDiscompare(false);
    } else {
      setDiscompare(true);
    }
  }, [form, setDiscompare, data]);

  useEffect(() => {
    if (!isEmpty(user) && !isNil(dataRedux.data.firma)) {
      setUrlImgen(`${API.url_bucket}/${user.usr_id}/${dataRedux.data.firma}`);
    } else {
      setUrlImgen('');
    }
  }, [user, dataRedux]);

  const validateRolFirma = () => {
    const arrayValidateFirmaRol = [25, 5, 49, 26, 51, 31, 28, 27];
    const isValidate = arrayValidateFirmaRol.includes(user.fk_roles.rl_id);

    return isValidate;
  };

  return (
    <div className={smallScreen ? 'flex flex-col min-w-512' : 'flex flex-col '}>
      <p className="mt-16 mb-32 font-bold text-primary text-14">Información personal</p>

      <Box sx={{ padding: '0' }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={4}>
            {user.fk_roles.rl_id === 2 || user.fk_roles.rl_id === 3 ? (
              <CustomSelect
                label="Tipo de persona"
                options={personTypeOptions}
                value={form.personType}
                onChange={changeText('personType')}
                name="personType"
              />
            ) : (
              <CustomSelect
                value={form.rol}
                onChange={changeText('rol')}
                name="rol"
                label="Rol"
                options={rolOptions}
                disabled
              />
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomSelect
              value={form.documentType}
              onChange={changeText('documentType')}
              name="documentType"
              label="Tipo de documento"
              options={form.personType === 2 ? documentTypeCompany : documentTypeOptions}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Número de documento"
              onChange={changeNumber('documentNumber', form.documentType === 6 ? 'nit' : '')}
              value={form.documentNumber}
              name="documentNumber"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Nombres"
              value={form.name}
              onChange={changeText('name')}
              name="name"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              onChange={changeText('lastName')}
              value={form.lastName}
              label="Apellidos"
              name="lastName"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomSelect
              label="Género"
              value={form.gender}
              name="gender"
              onChange={changeText('gender')}
              options={genderOptions}
            />
          </Grid>
          <Grid item xs={12} sm={4} />
          <Grid item xs={12} sm={4}>
            {(user.fk_roles.rl_id === 2 || user.fk_roles.rl_id === 3) && form.personType === 2 ? (
              <div
                className={smallScreen ? 'w-full mt-36' : null}
                style={smallScreen ? null : { marginBottom: 16 }}
              >
                <CustomTextField
                  label="Empresa"
                  value={form.empresa}
                  onChange={changeText('empresa')}
                  name="empresa"
                />
              </div>
            ) : null}
          </Grid>
        </Grid>
      </Box>

      <div
        className={
          smallScreen ? 'w-full flex justify-between mt-36' : 'w-full flex flex-col justify-between'
        }
      >
        <div style={smallScreen ? { width: '29%' } : { marginBottom: 16 }}>
          <input
            onChange={handleUploadChangeFirma}
            accept="image/jpeg, image/png, image/jpg"
            id="firma"
            name="firma"
            style={{ display: 'none' }}
            variant="outlined"
            type="file"
          />
          <div>
            <label htmlFor="firma">
              {validateRolFirma() && (
                <div className="">
                  <Typography
                    className="absolute p-4 ml-12 -mt-16 bg-white text-10"
                    style={{ color: '#023E73' }}
                  >
                    Firma
                  </Typography>
                  <div
                    className="flex items-center justify-center h-16 px-24 py-8 "
                    style={{
                      border: '2px dashed  #BDD7EF',
                      width: '100%',
                      height: 70,
                    }}
                  >
                    {urlImgen ? (
                      <img
                        src={urlImgen}
                        style={{
                          maxWidth: '100%',
                          height: '-webkit-fill-available',
                        }}
                        alt="Firma"
                      />
                    ) : (
                      <span>Firma</span>
                    )}
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>
      <p className="mt-40 mb-32 font-bold text-primary text-14">Información de contacto</p>

      <Box sx={{ padding: '0' }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
            <div
              className="flex items-center justify-center w-56 rounded-8"
              style={{
                border: '1px solid #BDD7EF',
                background: '#F9FCFF',
                height: '44px',
                marginRight: '10px',
              }}
            >
              <p className="text-primaryBlack text-16">+57</p>
            </div>
            <div style={{ width: '100%' }}>
              <CustomTextField
                label="Número de teléfono"
                onChange={changeNumber('phone')}
                name="phone"
                value={form.phone}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="Correo electrónico"
              value={form.email}
              name="email"
              onChange={onChangeEmail}
              error={emailCorrect && form.email !== '' ? true : null}
              helperText={
                emailCorrect && form.email !== ''
                  ? 'Por favor ingresa un correo electrónico valido'
                  : ''
              }
            />
          </Grid>
        </Grid>
      </Box>

      {smallScreen ? '' : <div className="h-60" />}
      <div
        className="w-full py-12 my-12"
        style={{ borderTop: '1px solid  rgba(229, 229, 229, 0.35)' }}
      >
        <div
          style={{
            position: smallScreen ? 'inherit' : 'fixed',
            top: '81%',
            bottom: 0,
            width: '100%',
          }}
          className={
            smallScreen ? 'flex items-center justify-end' : 'flex flex-col items-end z-50 bg-white '
          }
        >
          <div
            style={{
              marginTop: smallScreen ? 0 : 4,
              marginRight: smallScreen ? 0 : '14%',
            }}
          >
            <CustomButton
              label="Actualizar datos"
              className="primary"
              disabled={
                user.fk_roles.rl_id === 2 || user.fk_roles.rl_id === 3
                  ? form.personType === '' ||
                    form.documentType === '' ||
                    form.documentNumber === '' ||
                    form.name === '' ||
                    form.lastName === '' ||
                    form.gender === '' ||
                    form.phone === '' ||
                    form.email === '' ||
                    emailCorrect ||
                    disCompare
                  : form.documentType === '' ||
                    form.documentNumber === '' ||
                    form.name === '' ||
                    form.lastName === '' ||
                    form.gender === '' ||
                    form.phone === '' ||
                    form.email === '' ||
                    emailCorrect ||
                    disCompare
              }
              height="large"
              onClick={sendDataRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;

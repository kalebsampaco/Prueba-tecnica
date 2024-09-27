import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { IconButton, InputAdornment } from '@mui/material';

import CustomSelect from '@components/CustomSelect';
import CustomTextField from '@components/CustomTextField';

function PersonalInfo(props) {
  const {
    form,
    setForm,
    validatePassword,
    setValidatePassword,
    errorPass,
    setErrorPass,
    disabledFields,
    passwordDiferent,
  } = props;

  const genderOptions = [
    { value: 1, label: 'Masculino' },
    { value: 2, label: 'Femenino' },
  ];
  const documentTypeOptions = [
    { value: 1, label: 'Cédula de ciudadanía' },
    { value: 3, label: 'Cédula Extranjería' },
    { value: 4, label: 'Pasaporte' },
  ];
  const documentTypeCompany = [{ value: 6, label: 'NIT' }];

  const changeText = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const handleClickShowPassword = (key) => () => {
    setForm({ ...form, [key]: !form[key] });
  };

  const handlePasswordChange = (event) => {
    const regExp = /[0-9]/;
    const letters = /([a-zA-Z])/;
    const t = event.currentTarget.value.split(' ');
    let tex = '';
    // eslint-disable-next-line array-callback-return
    t.map((r) => {
      if (r !== '') {
        tex += r;
      }
    });
    setForm({ ...form, password: tex });
    if (tex !== '' && tex.length >= 8) {
      if (regExp.test(tex)) {
        if (letters.test(tex)) {
          setValidatePassword({
            ...validatePassword,
            messagePasswordError: '',
            passwordCorrect: false,
            passwordLength: false,
          });
          setErrorPass(false);
        } else {
          setValidatePassword({
            ...validatePassword,
            messagePasswordError:
              'La contraseña debe ser debe ser alfanumerico, hace falta almenos una letra',
            passwordCorrect: true,
          });
          setErrorPass(true);
        }
      } else {
        setValidatePassword({
          ...validatePassword,
          messagePasswordError:
            'La contraseña debe ser debe ser alfanumerico, hace falta almenos un numero',
          passwordCorrect: true,
        });
        setErrorPass(true);
      }
    } else {
      setValidatePassword({
        ...validatePassword,
        messagePasswordError: 'La contraseña debe ser mayor a 8 caracteres',
        passwordLength: true,
      });
      setErrorPass(true);
    }
  };

  const changeNumber = (event) => {
    if (event.target.value.length === 0) {
      setForm({ ...form, documentNumber: event.target.value });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setForm({ ...form, documentNumber: t.toString() });
      } else {
        setForm({ ...form, documentNumber: '' });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <p className="my-32 font-bold text-primary text-14">Información personal</p>
      <div className="flex flex-col justify-between w-full  md:flex-row ">
        <div className="w-full lg:w-2/4">
          <CustomTextField
            disabled={disabledFields}
            label="Nombres"
            value={form.name}
            onChange={changeText('name')}
          />
        </div>
        <div className="w-full  lg:w-2/4  md:ml-10">
          <CustomTextField
            disabled={disabledFields}
            onChange={changeText('lastName')}
            value={form.lastName}
            label="Apellidos"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between mt-12 md:mt-36 w-full md:flex-row">
        <div className="w-full lg:w-1/3 ">
          <CustomSelect
            disabled={disabledFields}
            value={form.documentType}
            onChange={changeText('documentType')}
            name="documentType"
            label="Tipo de documento"
            options={documentTypeOptions}
          />
        </div>
        <div className="w-full lg:w-1/3 md:ml-10">
          <CustomTextField
            disabled={disabledFields}
            label="Número de documento"
            onChange={changeNumber}
            value={form.documentNumber}
            name="documentNumber"
          />
        </div>
        <div className="w-full lg:w-1/3 md:ml-10">
          <CustomSelect
            disabled={disabledFields}
            label="Género"
            value={form.gender}
            name="gender"
            onChange={changeText('gender')}
            options={genderOptions}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between w-full mt-12 md:flex-row md:mt-36">
        <div className="w-full lg:w-1/3">
          <CustomTextField
            disabled={disabledFields}
            onChange={handlePasswordChange}
            helperText={form.password ? validatePassword.messagePasswordError : ''}
            value={form.password}
            label="Contraseña"
            type={form.showPassword ? 'text' : 'password'}
            minLength={8}
            error={passwordDiferent || form.password !== '' ? errorPass : null}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword('showPassword')} size="large">
                    {form.showPassword ? (
                      <VisibilityOutlinedIcon
                        style={{ color: form.password !== '' && errorPass ? '#FF4D4D' : '#BDD7EF' }}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        style={{ color: form.password !== '' && errorPass ? '#FF4D4D' : '#BDD7EF' }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="w-full mx-0 mt-12 lg:w-1/3 md:mt-0 md:ml-10">
          <CustomTextField
            onChange={changeText('confirmPasword')}
            disabled={disabledFields}
            value={form.confirmPasword}
            type={form.showConfirmPassword ? 'text' : 'password'}
            minLength={8}
            helperText={
              form.confirmPasword && form.confirmPasword !== form.password
                ? 'Las contraseñas no coinciden'
                : ''
            }
            error={
              form.confirmPasword && form.confirmPasword !== form.password
                ? true
                : form.confirmPasword
                ? errorPass
                : null
            }
            label="Confirmar Contraseña"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword('showConfirmPassword')} size="large">
                    {form.showConfirmPassword ? (
                      <VisibilityOutlinedIcon
                        style={{
                          color: form.confirmPasword !== '' && errorPass ? '#FF4D4D' : '#BDD7EF',
                        }}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        style={{
                          color: form.confirmPasword !== '' && errorPass ? '#FF4D4D' : '#BDD7EF',
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="w-full lg:w-1/3  md:ml-10" />
      </div>
    </div>
  );
}

export default PersonalInfo;

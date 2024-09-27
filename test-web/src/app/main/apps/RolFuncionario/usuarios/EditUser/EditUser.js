/* eslint-disable array-callback-return */
import withReducer from 'app/store/withReducer';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import CustomButton from '@components/CustomButton';
import CustomDialog from '@components/CustomDialog';
import CustomSelect from '@components/CustomSelect';
import CustomTextField from '@components/CustomTextField';
import { Dialog, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getAllRoles
} from 'app/main/registroFuncionarios/store/RegistroFuncionarioSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { truncate } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../store';
import { getUserById, updateUser, updateUserDirJur } from '../store/userListSlice';
import ModalConfirmEditUser from './ModalConfirmEditUser';
import ModalConfirmUserOtherUsers from './ModalConfirmUserOtherUsers';
import TableUserSelect from './TableUserSelect';

const rows = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'ROL',
    sort: true,
  },
  {
    id: 'nombre',
    align: 'left',
    disablePadding: false,
    label: 'Nombre usuario',
    sort: true,
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: true,
    label: 'Correo electrónico',
    sort: true,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    '& label': {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 12,
      top: 0,
    },
    '& input': {
      fontSize: 12,
      color: '#2e2e2e',
    },
    '& .MuiFormHelperText-root': {
      color: 'red',
      marginTop: 4,
      fontWeight: 500,
      textAlign: 'right',
    },
  },
  orderArrow: {
    backgroundColor: '#E6F0FA',
    '& .MuiTableSortLabel-icon': {
      opacity: 1,
    },
    '& span.MuiTableSortLabel-active svg': {
      color: '#000000',
    },
    '& span svg': {
      color: '#00000038',
    },
    '& .MuiInputBase-root': {
      height: 18,
      backgroundColor: 'white',
    },
    '&  table  tbody tr td .MuiFormControl-root': {
      marginTop: 4,
    },
  },
  headFilters: {
    '& .MuiInputBase-root': {
      backgroundColor: '#80808040',
      height: 30,
      // backgroundColor: 'white',
    },
  },
}));

function EditUser() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const itemRoles = useSelector(({ roles }) => roles.registroFuncionario.dataRoles);
  const dataUser = useSelector(({ listUserApp }) => listUserApp.userList.userById);
  const user = useSelector(({ auth }) => auth.user);
  const itemTerritoriales = useSelector(({ roles }) => roles.registroFuncionario.dataTerritoriales);

  const [selected, setSelected] = useState('');
  const [selectedAll, setSelectedAll] = useState('');
  const [datosListRoles, setDatosListRoles] = useState([]);
  const [multipleRole, setMultipleRole] = useState([]);
  const [listaInicialNumber, setListaInicialNumber] = useState([]);
  const [listaInicialRoles, setListaInicialRoles] = useState([]);
  const [emailCorrect, setEmailCorrect] = useState(undefined);
  // const [errorPass, setErrorPass] = useState(false);
  const [error, setError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDirJur, setOpenDialogDirJur] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [openDialogEditOtherUsers, setOpenDialogEditOtherUsers] = useState(false);
  // const [confirmPasword, setConfirmPasword] = useState('');
  const [form, setForm] = useState({
    cu_id_rol: '',
    cu_rol_add: [],
    cu_id_cliente: '',
    cu_id_tipo_documento: '',
    cu_documento: '',
    cu_nombres: '',
    cu_apellidos: '',
    cu_genero: '',
    cu_celular: '',
    cu_email: '',
    // cu_password: '',
    cu_estado: '',
    cu_territorial: '',
  });

/*   useEffect(() => {
    if (user.fk_roles?.rl_rol !== 'CLI_ADMIN') {
      history.goBack();
    }
  }, [user.fk_roles?.rl_rol, history]); */
  useEffect(() => {
    async function fetch() {
      await dispatch(getUserById(params.id, params.idUser));
      await dispatch(getAllRoles());
    }
    fetch();
  }, [dispatch, params]);

  useEffect(() => {
    if (dataUser.length !== 0) {
      setForm({
        ...dataUser,
        cu_celular: dataUser?.cu_celular?.slice(2),
        cu_territorial: dataUser?.cu_id_territorial,
      });
      // setConfirmPasword(dataUser.cu_password);
    }

    if (dataUser?.fk_usuario?.roles_add?.length > 0) {
      const resultInical = dataUser.fk_usuario.roles_add.map(function (item) {
        return {
          id_rol: item?.fk_rol?.rl_id,
          estado: item?.estado,
        };
      });

      setListaInicialRoles(resultInical);

      const rolesMul = [];
      dataUser.fk_usuario.roles_add.map((item) => {
        if (item.estado !== 0) {
          rolesMul.push(item?.fk_rol?.rl_id);
        }
      });

      setMultipleRole(rolesMul);

      const rolesMulCero = [];
      dataUser.fk_usuario.roles_add.map(function (item) {
        if (item.estado === 0) {
          rolesMulCero.push(item?.fk_rol?.rl_id);
        }
      });

      setListaInicialNumber(rolesMul);
    }
  }, [dataUser]);


  const genderOptions = [
    { value: 1, label: 'Masculino' },
    { value: 2, label: 'Femenino' },
  ];
  const stateOptions = [
    { value: 1, label: 'Activo' },
    { value: 2, label: 'Inactivo' },
  ];
  const corporationOptions = [{ value: 1, label: 'Cortolima' }];
  const documentTypeOptions = [
    { value: 1, label: 'Cédula de ciudadanía' },
    { value: 3, label: 'Cédula Extranjería' },
    { value: 4, label: 'Pasaporte' },
    { value: 5, label: 'Permiso Especial de Permanencia' },
  ];
  const RolOptions =
    itemRoles && itemRoles.length > 0
      ? itemRoles.map((resp) => ({
          label: resp?.rol_cliente?.rc_nombre,
          value: resp.rl_id,
        }))
      : [];

  const TerritorialOptions =
    itemTerritoriales && itemTerritoriales.length > 0
      ? itemTerritoriales.map((resp) => ({
          label: resp?.nombre,
          value: resp.id,
        }))
      : [];

  const dirJur = () => {
    let res = false;
    if (listaInicialRoles.length > 0) {
      // eslint-disable-next-line consistent-return
      listaInicialRoles.forEach((item) => {
        if ((item.id_rol === 5 && item.estado === 1) || (item.id_rol === 25 && item.estado === 1)) {
          res = true;
        }
      });
    } else {
      res = false;
    }
    return res;
  };
  const changeText = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const changeSelectEstado = (prop) => (event) => {
    if (event.target.value === 2 && (form.cu_id_rol === 5 || form.cu_id_rol === 25)) {
      setOpenDialog(true);
    }
    setForm({ ...form, [prop]: event.target.value });
  };

  const onChangeEmail = async (event) => {
    const caracteres =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const t = event.currentTarget.value.split(' ');
    let text = '';
    t.map((r) => {
      if (r !== '') {
        text += r;
      }
    });
    setForm({ ...form, cu_email: text.toLowerCase() });
    if (text !== '') {
      if (caracteres.test(text)) {
        setEmailCorrect(true);
      } else {
        setEmailCorrect(false);
        setError(true);
      }
    } else {
      setError(true);
      setEmailCorrect(false);
    }
  };

  const changeNumber = (key) => (event) => {
    if (event.target.value.length === 0) {
      setForm({ ...form, [key]: event.target.value });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setForm({ ...form, [key]: t.toString() });
      } else {
        setForm({ ...form, [key]: '' });
      }
    }
  };

  const disabledBtn =
    form.cu_id_rol === '' ||
    form.cu_id_cliente === '' ||
    form.cu_id_tipo_documento === '' ||
    form.cu_documento === '' ||
    form.cu_nombres === '' ||
    form.cu_apellidos === '' ||
    form.cu_genero === '' ||
    form.cu_celular?.length < 1 ||
    form.cu_email === '' ||
    form.cu_territorial === '';

  const sendDataUserRolesVarios = () => {
    if (form.cu_estado === 2) {
      setOpenDialogEditOtherUsers(true);
    } else {
      sendDataRegister();
    }
  };

  const sendDataRegister = async () => {
    const body = {
      cu_id_rol: form.cu_id_rol,
      cu_rol_add: datosListRoles,
      cu_id_cliente: form.cu_id_cliente,
      cu_id_tipo_documento: form.cu_id_tipo_documento,
      cu_documento: form.cu_documento,
      cu_nombres: form.cu_nombres,
      cu_apellidos: form.cu_apellidos,
      cu_genero: form.cu_genero,
      cu_celular: `57${form.cu_celular}`,
      cu_email: form.cu_email,
      cu_estado: form.cu_estado === 2 ? 0 : form.cu_estado,
      cu_id_territorial: form.cu_territorial,
      cu_new_user: null,
      cu_dir_E: null,
    };
    if (form.cu_celular?.length < 10) {
      dispatch(
        showMessage({
          message: 'Número de celular inválido. Debe tener 10 dígitos',
          variant: 'error',
        })
      );
    } else if (form.cu_territorial === '') {
      setError(true);
      dispatch(
        showMessage({
          message: 'Debe asignar una territorial',
          variant: 'error',
        })
      );
    } else {
      const result = await dispatch(updateUser(params.id, body));
      if (result.status === 200) {
        if (form.cu_estado === 2) {
          await dispatch(
            showMessage({
              message: `¡Usuario actualizado con éxito! Has trasladado ${result?.data?.solUpdate} trámites`,
              variant: 'success',
            })
          );
        } else {
          await dispatch(
            showMessage({
              message: '¡Usuario actualizado con éxito!',
              variant: 'success',
            })
          );
        }
        console.log('entro a 200 actualizar');
        await history.push('/usuarios');
      } else if (result.status === 201) {
        console.log('entro a 201 paso algo');
        await dispatch(
          showMessage({
            message: result.data.message,
            variant: 'error',
          })
        );
      }
    }
  };
  const back = async () => {
    await history.push('/usuarios');
  };

  const handleChangeMRole = (event) => {
    const {
      target: { value },
    } = event;
    setMultipleRole(typeof value === 'string' ? value.split(',') : value);
    // Lista inicial de roles
    const noEsta = listaInicialRoles.map(function (item) {
      const found = value.find((element) => element === item.id_rol);

      if (!found) {
        return item.id_rol;
      }
      return 0;
    });
    console.log(value, multipleRole, noEsta, listaInicialRoles);
    // Concatenar lista inical y nueva

    const listaConcatRoles = Array.from(new Set(listaInicialNumber.concat(value)));
    const listaRolesSel = listaConcatRoles.map(function (item) {
      const found = noEsta.find((element) => element === item);
      if (found) {
        return { id_rol: item, estado: 0 };
      }
      return { id_rol: item, estado: 1 };
    });
    setDatosListRoles(listaRolesSel);
  };

  const handleSure = () => {
    setModalAlert(true);
    setOpenDialogDirJur(true);
  };

  const handleCloseAlert = () => {
    setModalAlert(false);
    setOpenDialogDirJur(false);
  };

  const handleClick = (n) => (event) => {
    setSelectedAll(n);
    setSelected(event.target.value);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const sendDataRol5or25 = async (checkedD, justificacionCierr) => {
    if ((form.cu_id_rol === 5 || form.cu_id_rol === 25) && Number(selected) !== 0) {
      const body = {
        cu_id_usuario_send: dataUser?.cu_id_usuario, // --> el cu_id_usuario del usuario que envia la solicitud
        cu_id_usuario_receive: Number(selected), // --> el cu_id_usuario del usuario al que se le va a asignar el nuevo rol
        cu_id_territorial_receive: form.cu_territorial, // --> el cu_id_territorial del usuario al que se le va a asignar el nuevo rol
        rol: form.cu_id_rol, // -> enviar número dependiendo del rol que se va a asignar --> 5 DIRECTOR GENERAL --- 25 CLI_SUBDIRECTOR_JURIDICO --- 37 CLI_DIRECTOR_ENCARGADO
        check: checkedD,
        cu_resolucion: justificacionCierr,
      };
      if (form.cu_celular?.length < 10) {
        dispatch(
          showMessage({
            message: 'Número de celular inválido. Debe tener 10 dígitos',
            variant: 'error',
          })
        );
      } else if (form.cu_territorial === '') {
        setError(true);
        dispatch(
          showMessage({
            message: 'Debe asignar una territorial',
            variant: 'error',
          })
        );
      } else {
        const result = await dispatch(updateUserDirJur(body));
        if (result.status === 200) {
          // Entro a actualizar
          await history.push('/usuarios');
          await dispatch(
            showMessage({
              message: '¡Usuario actualizado con éxito!',
              variant: 'success',
            })
          );
        } else if (result.status === 201) {
          // Algo paso 201
          await dispatch(
            showMessage({
              message: result.data.message,
              variant: 'error',
            })
          );
        }
      }
    }
  };

  console.log('dataUser', dataUser);

  return (
    <div className="flex flex-col">
      <Dialog
        open={openDialogDirJur}
        className={classes.screenDialog}
        fullWidth="false"
        maxWidth="sm"
      >
        {modalAlert && (
          <CustomDialog
            open={modalAlert}
            img="/assets/images/dialogs/unregistered.png"
            title="Confirmación cambio de usuario"
            contentText={
              <>
                <ModalConfirmEditUser
                  dataUser={dataUser}
                  selectedAll={selectedAll}
                  form={form}
                  handleCloseAlert={handleCloseAlert}
                  sendDataRol5or25={sendDataRol5or25}
                />
              </>
            }
          />
        )}
      </Dialog>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        fullWidth="true"
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <TableUserSelect
            form={form}
            handleClose={handleClose}
            handleClick={handleClick}
            selected={selected}
          />
        </>
      </Dialog>
      <Dialog
        open={openDialogEditOtherUsers}
        onClose={() => setOpenDialogEditOtherUsers(false)}
        fullWidth="true"
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <CustomDialog
            open={openDialogEditOtherUsers}
            img="/assets/images/dialogs/unregistered.png"
            title="Confirmación cambio de usuario"
            contentText={
              <>
                <ModalConfirmUserOtherUsers
                  onCLose={() => setOpenDialogEditOtherUsers(false)}
                  sendDataRegister={sendDataRegister}
                />
              </>
            }
          />
        </>
      </Dialog>
      <p className="font-bold text-primary text-14 my-32 mx-10 px-12">Datos del funcionario:</p>

      <Box sx={{ padding: '10px 20px' }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid item xs={12} sm={4}>
            <CustomSelect
              value={form.cu_id_tipo_documento}
              onChange={changeText('cu_id_tipo_documento')}
              name="cu_id_tipo_documento"
              label="Tipo de documento"
              options={documentTypeOptions}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Número de documento"
              onChange={changeNumber('cu_documento')}
              value={form.cu_documento}
              name="cu_documento"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Nombres"
              value={form.cu_nombres}
              onChange={changeText('cu_nombres')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Apellidos"
              value={form.cu_apellidos}
              onChange={changeText('cu_apellidos')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomSelect
              label="Género"
              value={form.cu_genero}
              name="cu_genero"
              onChange={changeText('cu_genero')}
              options={genderOptions}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomSelect
              label="Estado"
              options={stateOptions}
              value={form.cu_estado === 0 ? 2 : form.cu_estado}
              onChange={changeSelectEstado('cu_estado')}
              name="cu_estado"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="flex">
              <div
                className="w-56 rounded-8 flex justify-center items-center md:mr-10"
                style={{
                  border: '1px solid #BDD7EF',
                  background: '#F9FCFF',
                  height: 43,
                }}
              >
                <p className="text-primaryBlack text-16">+57</p>
              </div>
              <div style={{ width: '100%' }}>
                <CustomTextField
                  label="Número de teléfono"
                  onChange={changeNumber('cu_celular')}
                  name="cu_celular"
                  value={form.cu_celular}
                  error={
                    form.cu_celular === '' ? true : form.cu_celular?.length < 10 ? truncate : null
                  }
                  inputProps={{
                    maxLength: 10,
                    minLength: 10,
                  }}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Correo electrónico"
              value={form.cu_email}
              name="email"
              onChange={onChangeEmail}
              error={emailCorrect === false && form.cu_email !== '' ? error : null}
              helperText={
                emailCorrect === false && form.cu_email !== ''
                  ? 'Por favor ingresa un correo electrónico valido'
                  : ''
              }
            />
          </Grid>
        </Grid>
      </Box>


      <div className="w-full flex flex-col md:flex-row justify-between mt-12 md:mt-28 px-12">
        <div className="w-full lg:w-1/9 my-12 md:my-0 md:mx-10" />
        <div className="w-full lg:w-1/9" />
        <div className="w-full lg:w-1/9 flex justify-end">
          <div className="mr-8">
            <CustomButton
              label="Volver"
              className="outlinePrimary"
              height="large"
              disabled={disabledBtn}
              onClick={back}
            />
          </div>
          <CustomButton
            label="Editar"
            className="primary"
            height="large"
            disabled={
              disabledBtn ||
              ((form.cu_id_rol === 5 || form.cu_id_rol === 25) &&
                selected === '' &&
                form.cu_estado !== 1)
            }
            onClick={
              (form.cu_id_rol === 5 || form.cu_id_rol === 25) && selected !== ''
                ? handleSure
                : sendDataUserRolesVarios
            }
          />
        </div>
      </div>
    </div>
  );
}

export default withReducer('listUserApp', reducer)(EditUser);

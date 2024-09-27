import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isEmpty, isNil } from 'lodash';
import { Box, Modal, Typography, useMediaQuery } from '@mui/material';

import { useDeepCompareEffect, useForm } from '@fuse/hooks';

import { showMessage } from 'app/store/fuse/messageSlice';
import withReducer from 'app/store/withReducer';
import { deleteFile, uploadFile } from 'app/utils/uploadFile';
import md5 from 'md5';
import reducer from '../store';
import {
  getById,
  updateProfile,
  getCitizenById,
  updateCitizenProfile,
  getAllRoles,
} from '../store/profileSlice';

import PersonalInfo from './PersonalInfo';

function ProfileData() {
  /* Config */
  const dispatch = useDispatch();
  const routeParams = useParams();
  const mediaScreen = useMediaQuery('(max-width:1280px)');
  const user = useSelector(({ auth }) => auth.user);
  const dataRedux = useSelector(({ profileApp }) => profileApp.profile);
  const itemRoles = useSelector(({ profileApp }) => profileApp.profile.dataRoles);

  /* States */

  const { form, handleChange, setForm } = useForm(null);
  const [showSectionPhone, setShowSectionPhone] = useState(false);
  const [emailCorrect, setEmailCorrect] = useState(false);
  const [open, setOpen] = useState(false);
  const [nombreArchivo, setNombreArchivo] = useState();

  /* Constantes */
  const genderOptions = [
    { value: 1, label: 'Masculino' },
    { value: 2, label: 'Femenino' },
  ];
  const documentTypeOptions = [
    { value: 1, label: 'Cédula de ciudadanía' },
    { value: 3, label: 'Cédula Extranjería' },
    { value: 4, label: 'Pasaporte' },
    { value: 5, label: 'Permiso Especial de Permanencia' },
  ];
  const documentTypeCompany = [{ value: 6, label: 'NIT' }];
  const personTypeOptions = [
    { value: 1, label: 'Natural' },
    { value: 2, label: 'Jurídica' },
  ];

  /* useEffect */
  useDeepCompareEffect(() => {
    async function fetch() {
      if (user.fk_roles.rl_id === 2 || user.fk_roles.rl_id === 3) {
        await dispatch(getCitizenById(user.usr_id));
      } else {
        await dispatch(getAllRoles());
        await dispatch(getById(user.usr_id));
      }
    }
    fetch();

    return () => {};
  }, [dispatch, routeParams]);

  useEffect(() => {
    if ((dataRedux.data && !form) || (dataRedux.data && form && dataRedux.data.id !== form.id)) {
      setForm(dataRedux.data);
    }
  }, [form, dataRedux, setForm, user]);

  const rolOptions =
    itemRoles && itemRoles.length > 0
      ? itemRoles.map((resp) => ({
          label: resp?.rol_cliente?.rc_nombre,
          value: resp.rl_id,
        }))
      : [];

  /* Functions */
  const changeText = (prop) => (event) => {
    if (prop === 'personType') {
      setForm({
        ...form,
        [prop]: event.target.value,
        documentType: '',
        documentNumber: '',
        empresa: '',
      });
    } else {
      setForm({ ...form, [prop]: event.target.value });
    }
  };

  const changeNumber = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setForm({ ...form, [prop]: event.target.value });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setForm({ ...form, [prop]: t.toString() });
      } else {
        setForm({ ...form, [prop]: '' });
      }
    }
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
    setForm({ ...form, email: text.toLowerCase() });
    if (text !== '') {
      if (caracteres.test(text)) {
        setEmailCorrect(false);
      } else {
        setEmailCorrect(true);
      }
    } else {
      setEmailCorrect(false);
    }
  };

  const sendDataRegister = async () => {
    if (user.fk_roles.rl_id === 2 || user.fk_roles.rl_id === 3) {
      const body = {
        us_id_tipo_documento: form.documentType,
        us_nombres: form.name,
        us_apellidos: form.lastName,
        us_documento: form.documentNumber,
        us_email: form.email,
        us_celular: `57${form.phone}`,
        us_genero: form.gender,
        us_empresa: form.personType === 1 ? null : form.empresa,
        us_tipo_persona: form.personType,
      };
      setOpen(true);
      const result = await dispatch(updateCitizenProfile(user.usr_id, body));
      // console.log('Actualización de usuario: ', body);
      if (result) {
        setOpen(false);
      }
    } else {
      const body = {
        cu_id_tipo_documento: form.documentType,
        cu_nombres: form.name,
        cu_apellidos: form.lastName,
        cu_documento: form.documentNumber,
        cu_email: form.email,
        cu_celular: `57${form.phone}`,
        cu_genero: form.gender,
        cu_id_rol: form.rol,
        cu_rol_add: [], // datosListRoles,
        cu_firma: form.NameFile,
      };
      setOpen(true);
      const result = await dispatch(updateProfile(user.usr_id, body));
      if (result) {
        setOpen(false);
      }
    }
  };

  const handleUploadChangeFirma = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    if (file.size > 5000000) {
      dispatch(
        showMessage({ message: 'El archivo es demasiado grande (máximo 5 MB)', variant: 'error' })
      );
      return;
    }
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async () => {
      if (!isEmpty(form.firma) && !isNil(form.firma)) {
        const resul = await deleteFile(user.usr_id, form.firma);
        if (resul) {
          const data = {
            file,
            name_archivo: `${md5(Date.now())}.jpeg`,
            name_to_show: file.name,
            url_base64: `data:${file.type};base64,${btoa(reader.result)}`,
          };
          // ----------------------------------------------------------------------
          setForm({ ...form, firma: data.url_base64 });
          setForm({ ...form, NameFile: data.name_archivo });
          // ----------------------------------------------------------------------
          const result = await uploadFile(user.usr_id, data);
          if (result) {
            const body = {
              cu_id_tipo_documento: form.documentType,
              cu_nombres: form.name,
              cu_apellidos: form.lastName,
              cu_documento: form.documentNumber,
              cu_email: form.email,
              cu_celular: `57${form.phone}`,
              cu_genero: form.gender,
              cu_id_rol: form.rol,
              cu_rol_add: [], // datosListRoles,
              cu_firma: data.name_archivo,
            };
            const response = await dispatch(updateProfile(user.usr_id, body));
            if (response) {
              dispatch(
                showMessage({ message: '¡Imagen actualizada con exito!', variant: 'success' })
              );
            }
          }
        } else {
          console.log('error al eliminar foto de aws');
        }
      } else {
        const data = {
          file,
          name_archivo: `${md5(Date.now())}.jpeg`,
          name_to_show: file.name,
          url_base64: `data:${file.type};base64,${btoa(reader.result)}`,
        };
        // ----------------------------------------------------------------------
        setForm({ ...form, firma: data.url_base64 });
        // ----------------------------------------------------------------------
        const result = await uploadFile(user.usr_id, data);
        if (result) {
          const body = {
            cu_id_tipo_documento: form.documentType,
            cu_nombres: form.name,
            cu_apellidos: form.lastName,
            cu_documento: form.documentNumber,
            cu_email: form.email,
            cu_celular: `57${form.phone}`,
            cu_genero: form.gender,
            cu_id_rol: form.rol,
            cu_rol_add: [], // datosListRoles,
            cu_firma: data.name_archivo,
          };
          const resul = await dispatch(updateProfile(user.usr_id, body));
          if (resul) {
            dispatch(showMessage({ message: '¡Imagen cargada con éxito.!', variant: 'success' }));
          }
        }
      }
    };

    reader.onerror = function (error) {
      console.log('error on load image', error);
    };
  };

  return (
    <div>
      <Modal open={open} onClose={null} style={{ backgroundColor: 'rgba(225,225,225, 0.8) ' }}>
        <Box
          className="absolute flex flex-col items-center justify-center py-12 bg-white px-52 rounded-16"
          style={{
            top: '30%',
            left: '40%',
            boxShadow: '0px 2px 16px 4px rgba(2, 62, 115, 0.1)',
          }}
        >
          <img alt="loading" src="/assets/images/dialogs/loading.png" />
          <Typography className="mb-8 font-semibold text-16">
            Estamos validando tu información
          </Typography>
          <Typography style={{ color: '#223240' }} className="mb-24">
            Esto solo tardará unos instantes
          </Typography>
        </Box>
      </Modal>
      <div className="flex flex-col lg:flex-row">
        <div
          className="flex bg-white min-h-136"
          style={{
            width: showSectionPhone && mediaScreen ? '100%' : showSectionPhone ? '65%' : '100%',
          }}
        >
          <div className="flex flex-col w-full mx-12 mb-32">
            {!isEmpty(form) && (
              <PersonalInfo
                form={form}
                emailCorrect={emailCorrect}
                genderOptions={genderOptions}
                documentTypeOptions={documentTypeOptions}
                documentTypeCompany={documentTypeCompany}
                personTypeOptions={personTypeOptions}
                rolOptions={rolOptions}
                changeText={changeText}
                changeNumber={changeNumber}
                onChangeEmail={onChangeEmail}
                sendDataRegister={sendDataRegister}
                dataRedux={dataRedux}
                handleUploadChangeFirma={handleUploadChangeFirma}
                // datosListRoles={datosListRoles}
                // setDatosListRoles={setDatosListRoles}
                // multipleRole={multipleRole}
                // setMultipleRole={setMultipleRole}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withReducer('profileApp', reducer)(ProfileData);

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";

import withReducer from "app/store/withReducer";
import { useHistory, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import CustomButton from "@components/CustomButton";
import CustomSelect from "@components/CustomSelect";
import CustomTextField from "@components/CustomTextField";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import reducer from "../store";
import { createUser } from "../store/userListSlice";

function CreateUser() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const itemTerritoriales = useSelector(
    ({ roles }) => roles.registroFuncionario.dataTerritoriales
  );
  const user = useSelector(({ auth }) => auth.user);

  const [datosListRoles, setDatosListRoles] = useState([]);
  const [multipleRole, setMultipleRole] = useState([]);

  const [passwordDiferent, setPasswordDiferent] = useState(false);
  const [emailCorrect, setEmailCorrect] = useState(undefined);
  const [errorPass, setErrorPass] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [error, setError] = useState(false);
  const [confirmPasword, setConfirmPasword] = useState("");
  const [form, setForm] = useState({
    cu_id_rol: "",
    cu_id_cliente: 5,
    cu_id_tipo_documento: "",
    cu_documento: "",
    cu_nombres: "",
    cu_apellidos: "",
    cu_genero: "",
    cu_celular: "",
    cu_email: "",
    cu_password: "",
    cu_estado: "",
  });
  const [formPass, setFormPass] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });
  const [validatePassword, setValidatePassword] = useState({
    passwordLength: false,
    passwordCorrect: false,
    messagePasswordError: "",
  });


  const genderOptions = [
    { value: 1, label: "Masculino" },
    { value: 2, label: "Femenino" },
  ];

  const itemRoles = [
    { value: 1, label: "Rol 1" },
    { value: 2, label: "Rol 2" },
  ];
  const stateOptions = [
    { value: 1, label: "Activo" },
    { value: 2, label: "Inactivo" },
  ];
  const corporationOptions = [{ value: 1, label: "Cortolima" }];
  const documentTypeOptions = [
    { value: 1, label: "Cédula de ciudadanía" },
    { value: 3, label: "Cédula Extranjería" },
    { value: 4, label: "Pasaporte" },
    { value: 5, label: "Permiso Especial de Permanencia" },
  ];


  const changeText = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };
  const changeTextPassword = (event) => {
    setConfirmPasword(event.target.value);
  };

  const handleClickShowPassword = (key) => () => {
    setFormPass({ ...formPass, [key]: !formPass[key] });
  };

  const onChangeEmail = async (event) => {
    const caracteres =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const t = event.currentTarget.value.split(" ");
    let text = "";
    t.map((r) => {
      if (r !== "") {
        text += r;
      }
    });
    setForm({ ...form, cu_email: text.toLowerCase() });
    if (text !== "") {
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

  const handlePasswordChange = (event) => {
    const regExp = /[0-9]/;
    const letters = /([a-zA-Z])/;
    const t = event.currentTarget.value.split(" ");
    let tex = "";
    t.map((r) => {
      if (r !== "") {
        tex += r;
      }
    });
    setForm({ ...form, cu_password: tex });
    if (tex !== "" && tex.length >= 8) {
      if (regExp.test(tex)) {
        if (letters.test(tex)) {
          setValidatePassword({
            ...validatePassword,
            messagePasswordError: "",
            passwordCorrect: false,
            passwordLength: false,
          });
          setErrorPass(false);
        } else {
          setValidatePassword({
            ...validatePassword,
            messagePasswordError:
              "La contraseña debe ser debe ser alfanumerico, hace falta almenos una letra",
            passwordCorrect: true,
          });
          setErrorPass(true);
        }
      } else {
        setValidatePassword({
          ...validatePassword,
          messagePasswordError:
            "La contraseña debe ser debe ser alfanumerico, hace falta almenos un número",
          passwordCorrect: true,
        });
        setErrorPass(true);
      }
    } else {
      setValidatePassword({
        ...validatePassword,
        messagePasswordError: "La contraseña debe ser mayor a 8 caracteres",
        passwordLength: true,
      });
      setErrorPass(true);
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
        setForm({ ...form, [key]: "" });
      }
    }
  };

  const disabledBtn =
    form.cu_id_rol === "" ||
    form.cu_id_cliente === "" ||
    form.cu_id_tipo_documento === "" ||
    form.cu_documento === "" ||
    form.cu_nombres === "" ||
    form.cu_apellidos === "" ||
    form.cu_genero === "" ||
    form.cu_celular?.length < 1 ||
    form.cu_email === "" ||
    form.cu_password === "";

  const sendDataRegister = async () => {
    const caracteres =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      cu_password: form.cu_password,
      cu_estado: form.cu_estado === 2 ? 0 : form.cu_estado,
    };
    if (form.cu_celular?.length < 10) {
      setErrorPhone(true);
      dispatch(
        showMessage({
          message: "Número de celular inválido. Debe tener 10 dígitos",
          variant: "error",
        })
      );
    } else if (form.cu_password !== confirmPasword) {
      setPasswordDiferent(true);
      dispatch(
        showMessage({
          message: "Las contraseñas no coinciden, por favor verifique",
          variant: "error",
        })
      );
    } else if (!caracteres.test(form.cu_email)) {
      setPasswordDiferent(true);
      dispatch(
        showMessage({
          message: "El formato del correo no es correcto",
          variant: "error",
        })
      );
    } else if (form.cu_territorial === "") {
      setError(true);
      dispatch(
        showMessage({
          message: "Debe asignar una territorial",
          variant: "error",
        })
      );
    } else {
      const result = await dispatch(createUser(body));
      if (result.status === 200) {
        await history.push("/usuarios");
        await dispatch(
          showMessage({
            message: "¡Usuario registrado con éxito!",
            variant: "success",
          })
        );
        setForm({
          ...form,
          cu_id_rol: "",
          cu_rol_add: [],
          cu_id_cliente: "",
          cu_id_tipo_documento: "",
          cu_documento: "",
          cu_nombres: "",
          cu_apellidos: "",
          cu_genero: "",
          cu_celular: "",
          cu_email: "",
          cu_password: "",
          cu_estado: "",
        });
      } else if (result.status === 201) {
        console.log("entro a 201 paso algo");
        await dispatch(
          showMessage({
            message: result.data.message,
            variant: "error",
          })
        );
      }
      // console.log('result *******' /* result */);
    }
  };

  const handleChangeMRole = (event) => {
    const {
      target: { value },
    } = event;
    setDatosListRoles([]);
    setMultipleRole(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    const datosCompletos = value.map(function (item) {
      return { id_rol: item };
    });

    setDatosListRoles(datosCompletos);
  };

  return (
    <div className="flex flex-col">
      <p className="font-bold text-primary text-14 my-32 mx-10 px-12">
        Datos del funcionario:
      </p>
      <Box sx={{ padding: "10px 20px" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid item xs={12} sm={4}>
            <CustomSelect
              label="Rol"
              options={itemRoles}
              value={form.cu_id_rol}
              onChange={changeText("cu_id_rol")}
              name="cu_id_rol"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomSelect
              value={form.cu_id_tipo_documento}
              onChange={changeText("cu_id_tipo_documento")}
              name="cu_id_tipo_documento"
              label="Tipo de documento"
              options={documentTypeOptions}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Número de documento"
              onChange={changeNumber("cu_documento")}
              value={form.cu_documento}
              name="cu_documento"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Nombres"
              value={form.cu_nombres}
              onChange={changeText("cu_nombres")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Apellidos"
              value={form.cu_apellidos}
              onChange={changeText("cu_apellidos")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomSelect
              label="Género"
              value={form.cu_genero}
              name="cu_genero"
              onChange={changeText("cu_genero")}
              options={genderOptions}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              autoComplete="off"
              onChange={handlePasswordChange}
              helperText={
                form.cu_password ? validatePassword.messagePasswordError : ""
              }
              value={form.cu_password}
              label="Contraseña"
              type={formPass.showPassword ? "text" : "password"}
              minLength={8}
              error={
                passwordDiferent || form.cu_password !== "" ? errorPass : null
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword("showPassword")}
                      size="large"
                    >
                      {formPass.showPassword ? (
                        <VisibilityOutlinedIcon
                          style={{
                            color:
                              form.cu_password !== "" && errorPass
                                ? "#FF4D4D"
                                : "#BDD7EF",
                          }}
                        />
                      ) : (
                        <VisibilityOffOutlinedIcon
                          style={{
                            color:
                              form.cu_password !== "" && errorPass
                                ? "#FF4D4D"
                                : "#BDD7EF",
                          }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              onChange={changeTextPassword}
              value={confirmPasword}
              type={formPass.showConfirmPassword ? "text" : "password"}
              helperText={
                confirmPasword !== form.cu_password
                  ? "Las contraseñas no coinciden"
                  : ""
              }
              error={
                confirmPasword !== form.cu_password
                  ? true
                  : confirmPasword
                  ? errorPass
                  : null
              }
              label="Confirmar Contraseña"
              InputProps={{
                minLength: 8,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword("showConfirmPassword")}
                      size="large"
                    >
                      {formPass.showConfirmPassword ? (
                        <VisibilityOutlinedIcon
                          style={{
                            color:
                              confirmPasword !== "" && errorPass
                                ? "#FF4D4D"
                                : "#BDD7EF",
                          }}
                        />
                      ) : (
                        <VisibilityOffOutlinedIcon
                          style={{
                            color:
                              confirmPasword !== "" && errorPass
                                ? "#FF4D4D"
                                : "#BDD7EF",
                          }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomSelect
              label="Estado"
              options={stateOptions}
              value={form.cu_estado}
              onChange={changeText("cu_estado")}
              name="cu_estado"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="flex">
              <div
                className="w-56 rounded-8 flex justify-center items-center md:mr-10"
                style={{
                  border: "1px solid #BDD7EF",
                  background: "#F9FCFF",
                  height: 43,
                }}
              >
                <p className="text-primaryBlack text-16">+57</p>
              </div>
              <div style={{ width: "100%" }}>
                <CustomTextField
                  label="Número de teléfono"
                  onChange={changeNumber("cu_celular")}
                  name="cu_celular"
                  value={form.cu_celular}
                  error={
                    form.cu_celular?.length < 10 && errorPhone ? true : null
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
              error={
                emailCorrect === false && form.cu_email !== "" ? error : null
              }
              helperText={
                emailCorrect === false && form.cu_email !== ""
                  ? "Por favor ingresa un correo electrónico valido"
                  : ""
              }
            />
          </Grid>
        </Grid>
      </Box>
      <div className="w-full flex flex-col md:flex-row justify-between mt-12 md:mt-28 px-12">
        <div className="w-full lg:w-1/9 my-12 md:my-0 md:mx-10">
          <CustomButton
            label="Registrar"
            className="primary"
            height="large"
            disabled={disabledBtn}
            onClick={sendDataRegister}
          />
        </div>
        <div className="w-full lg:w-1/9" />
        <div className="w-full lg:w-1/9" />
      </div>
    </div>
  );
}

export default withReducer("listUserApp", reducer)(CreateUser);

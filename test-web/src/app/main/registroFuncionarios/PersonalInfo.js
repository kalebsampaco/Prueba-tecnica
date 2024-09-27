import { useEffect } from "react";
import { useState } from "react";
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";

import { InputAdornment, IconButton } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

import CustomSelect from "@components/CustomSelect";
import CustomTextField from "@components/CustomTextField";
import reducer from "./store";
import { getAllRoles } from "./store/RegistroFuncionarioSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      //maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      //width: ,
    },
  },
};

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
    multipleRole,
    setMultipleRole,
    datosList,
    setDatosList,
  } = props;
  const dispatch = useDispatch();
  const itemRoles = useSelector(
    ({ roles }) => roles.registroFuncionario.dataRoles
  );

  useEffect(() => {
    async function fetch() {
      await dispatch(getAllRoles());
    }
    fetch();
  }, []);

  const genderOptions = [
    { value: 1, label: "Masculino" },
    { value: 2, label: "Femenino" },
  ];
  const corporationOptions = [{ value: 1, label: "Cortolima" }];
  const documentTypeOptions = [
    { value: 1, label: "Cédula de ciudadanía" },
    { value: 3, label: "Cédula Extranjería" },
    { value: 4, label: "Pasaporte" },
    { value: 5, label: "Permiso Especial de Permanencia" },
  ];

  const RolOptions =
    itemRoles && itemRoles.length > 0
      ? itemRoles.map((resp) => ({
          label: resp?.rol_cliente?.rc_nombre,
          value: resp.rl_id,
        }))
      : [];

  const changeText = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const handleClickShowPassword = (key) => () => {
    setForm({ ...form, [key]: !form[key] });
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
    setForm({ ...form, password: tex });
    if (tex != "" && tex.length >= 8) {
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
            "La contraseña debe ser debe ser alfanumerico, hace falta almenos un numero",
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

  const changeNumber = (event) => {
    if (event.target.value.length === 0) {
      setForm({ ...form, documentNumber: event.target.value });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setForm({ ...form, documentNumber: t.toString() });
      } else {
        setForm({ ...form, documentNumber: "" });
      }
    }
  };

  const handleChangeMRole = (event) => {
    const {
      target: { value },
    } = event;
    setDatosList([]);
    setMultipleRole(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    const datosCompletos = value.map(function (item) {
      return { id_rol: item };
    });
    setDatosList(datosCompletos);
  };


  return (
    <div className="flex flex-col">
      <p className="font-bold text-primary text-14 my-32">
        Información personal
      </p>

      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <CustomSelect
            disabled={disabledFields}
            label="Seleccione Corporación"
            options={corporationOptions}
            value={form.corporation}
            onChange={changeText("corporation")}
            name="corporation"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomSelect
            disabled={disabledFields}
            label="Rol"
            options={RolOptions}
            value={form.rol}
            onChange={changeText("rol")}
            name="rol"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl style={{width: "100%"}}>
            <InputLabel id="demo-multiple-name-label">Roles adicionales</InputLabel>
            <Select
              className="multipleSel"
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={multipleRole}
              onChange={handleChangeMRole}
              input={<OutlinedInput label="Name" />}
              disabled={disabledFields}
              MenuProps={MenuProps}
             
            >
              {RolOptions.map((name) => (
                <MenuItem
                  key={name.value}
                  value={name.value}
                  //style={getStyles(name, personName, theme)}
                >
                  {name.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomSelect
            disabled={disabledFields}
            value={form.documentType}
            onChange={changeText("documentType")}
            name="documentType"
            label="Tipo de documento"
            options={documentTypeOptions}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            disabled={disabledFields}
            label="Número de documento"
            onChange={changeNumber}
            value={form.documentNumber}
            name="documentNumber"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            disabled={disabledFields}
            label="Nombres"
            value={form.name}
            onChange={changeText("name")}
            name="name"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            disabled={disabledFields}
            onChange={changeText("lastName")}
            value={form.lastName}
            name="lastName"
            label="Apellidos"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomSelect
            disabled={disabledFields}
            label="Género"
            value={form.gender}
            name="gender"
            onChange={changeText("gender")}
            options={genderOptions}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            disabled={disabledFields}
            onChange={handlePasswordChange}
            helperText={
              form.password ? validatePassword.messagePasswordError : ""
            }
            name="password"
            value={form.password}
            label="Contraseña"
            type={form.showPassword ? "text" : "password"}
            error={passwordDiferent || form.password !== "" ? errorPass : null}
            InputProps={{
              minLength: 8,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword("showPassword")}
                    size="large"
                  >
                    {form.showPassword ? (
                      <VisibilityOutlinedIcon
                        style={{
                          color:
                            form.password !== "" && errorPass
                              ? "#FF4D4D"
                              : "#BDD7EF",
                        }}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        style={{
                          color:
                            form.password !== "" && errorPass
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
            disabled={disabledFields}
            onChange={changeText("confirmPasword")}
            value={form.confirmPasword}
            name="confirmPasword"
            type={form.showConfirmPassword ? "text" : "password"}
            helperText={
              form.confirmPasword && form.confirmPasword !== form.password
                ? "Las contraseñas no coinciden"
                : ""
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
              minLength: 8,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword("showConfirmPassword")}
                    size="large"
                  >
                    {form.showPassword ? (
                      <VisibilityOutlinedIcon
                        style={{
                          color:
                            form.confirmPasword !== "" && errorPass
                              ? "#FF4D4D"
                              : "#BDD7EF",
                        }}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        style={{
                          color:
                            form.confirmPasword !== "" && errorPass
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
      </Grid>
    </div>
  );
}
export default withReducer("roles", reducer)(PersonalInfo);

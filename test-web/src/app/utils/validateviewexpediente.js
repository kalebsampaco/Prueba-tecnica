function validate(user) {
  const lista = [
    'CLI_VALIDACION_JURIDICA',
    'CLI_VALIDACION_TECNICA',
    'CLI_VENTANILLA_UNICA',
    'CLI_SUBDIRECTOR_JURIDICO',
    'CLI_COORDINADOR_JURIDICO',
    'SUPERADMIN',
    'CLI_COORDINADOR_ADMINISTRATIVO',
    'CLI_ADMIN',
    'CLI_PROFESIONAL_RECURSOS',
    'CLI_PROFESIONAL_SEGUIMIENTO',
    'CLI_JEFE_TERRITORIAL',
    'CLI_DIRECTOR_GENERAL',
    'CLI_SECRETARIA_NUMERACION',
    'CLI_DIRECTOR_GENERAL',
  ];
  let result = false;
  if (lista.includes(user.role)) {
    result = true;
    return result;
  }

  if (user.data.rolesAdd && user.data.rolesAdd.length > 0) {
    user.data.rolesAdd.forEach((element) => {
      if (lista.includes(element)) {
        result = true;
      }
    });
  }
  return result;
}

export default validate;

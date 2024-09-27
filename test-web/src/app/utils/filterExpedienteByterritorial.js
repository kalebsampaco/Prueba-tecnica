/** Listado de Usuarios Para Agregar filtro por Territorial en Expediente r */

function addfilterTerritorial(user) {
  const lista = [
    'CLI_COORDINADOR_RECURSOS',
    'CLI_SUBDIRECTOR_JURIDICO',
    'CLI_SECRETARIA_JURIDICA',
    'CLI_SUBDIRECTOR_RECURSOS',
    'CLI_JEFE_TERRITORIAL',
  ];
  let result = false;
  if (lista.includes(user.role)) {
    result = true;
    return result;
  }

  if (user.data.rolesAdd && user.data.rolesAdd.length > 0) {
    user.data.rolesAdd.forEach((element) => {
      if (lista.includes(element.fk_rol.rl_rol)) {
        result = true;
      }
    });
  }
  return result;
}

export default addfilterTerritorial;

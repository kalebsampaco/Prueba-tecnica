import CliUsuario from "../models/cliUsuario";

const returnNameAndLastnameUser = async (id) => {
  const userData = {
    name: "",
    lastName: "",
  };

  // const getClient = await CliCliente.findOne({
  //   where: {
  //     id_usuario: id,
  //   },
  // });

  // if (getClient) {
  //   userData.name = getClient.cc_nombre;
  //   return userData;
  // }

  const getCliUsuario = await CliUsuario.findOne({
    where: {
      cu_id_usuario: id,
    },
  });

  if (getCliUsuario) {
    userData.name = getCliUsuario.getDataValue("cu_nombres");
    userData.lastName = getCliUsuario.getDataValue("cu_apellidos");
    return userData;
  }



  return userData;
};

export default returnNameAndLastnameUser;

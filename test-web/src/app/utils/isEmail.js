// validar si es un correo electornico
const isEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export default isEmail;
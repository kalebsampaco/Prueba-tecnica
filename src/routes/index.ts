// import TramDocumentoTramite from "./tramDocumentoTramite";
import CliCliente from "./cliCliente";
import CliUsuario from "./cliUsuario";
import GiftCards from "./giftCard";
import Users from "./users";

export default [
  ...Users,
  ...CliCliente,
  ...CliUsuario,
  ...GiftCards
  // ...TramDocumentoTramite,
];

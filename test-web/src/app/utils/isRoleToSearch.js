const isRoleToSearch = (user, rolToSearch) => {
  if (user) {
    if (user.fk_roles.rl_rol === rolToSearch) {
      return rolToSearch;
    }
    if (user.data.rolesAdd && user.data.rolesAdd.length > 0) {
      const isRole = user.data.rolesAdd.find((roleAdd) => roleAdd.fk_rol.rl_rol === rolToSearch);
      if (isRole) {
        return rolToSearch;
      }
      return 'CLI_NOFOUND';
    }
  }
  return 'CLI_NOFOUND';
};

export default isRoleToSearch;

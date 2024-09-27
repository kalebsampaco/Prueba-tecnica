import {
  AutoIncrement,
  Column,
  Comment,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

/************ import HasMany ************/
import CliUsuario from "./cliUsuario";
import RolCliente from "./rolCliente";
import RolPermiso from "./rolPermiso";
import RolesAdicionales from "./rolesAdicionales";
import Users from "./users";

/**
 * @author Styk Medina
 * @description Class to create model Role
 */
@Table({ tableName: "roles", comment: "Roles", timestamps: false })
export default class Roles extends Model<Roles> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  public rl_id: number;

  @Comment("EJ: SUPERADMIN")
  @Column({ type: DataType.STRING(45), allowNull: false })
  public rl_rol: string;

  @Default(1)
  @Comment("0: Inactivo, 1: Activo")
  @Column({ type: DataType.INTEGER, allowNull: false })
  public rl_estado: number;

  @Comment("1: ciudadano, 2: funcionario")
  @Column({ type: DataType.INTEGER, allowNull: false })
  public rl_tipo: number;

  @HasMany(() => Users)
  public users: Users[];

  @HasOne(() => RolCliente)
  public rol_cliente: RolCliente;

  @HasMany(() => CliUsuario)
  public cli_usuario: CliUsuario[];

  @HasOne(() => RolPermiso)
  public rol_permiso: RolPermiso;

  @HasMany(() => RolesAdicionales)
  public roles_add: RolesAdicionales[];
}

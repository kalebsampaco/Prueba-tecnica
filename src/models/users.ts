import {
  AutoIncrement,
  BelongsTo,
  Column,
  Comment,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

/************ import models ************/
import Roles from "./roles";

/************ import HasMany ************/
import CliCliente from "./cliCliente";
import CliUsuario from "./cliUsuario";
import RolesAdicionales from "./rolesAdicionales";
/**
 * @author Styk Medina
 * @description Class to create model Users
 */
@Table({ tableName: "users", comment: "Usuarios", timestamps: false })
export default class Users extends Model<Users> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  public usr_id: number;

  @ForeignKey(() => Roles)
  @Comment("ROL tabla : rol")
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "NO ACTION" })
  public usr_rol_id: number;

  @BelongsTo(() => Roles)
  public fk_roles: Roles;

  @Comment("username")
  @Column({ type: DataType.STRING(255), allowNull: false })
  public usr_username: string;

  @Comment("auth_key")
  @Column({ type: DataType.STRING(32), allowNull: true })
  public usr_auth_key: string;

  @Comment("password_hash")
  @Column({ type: DataType.STRING(255), allowNull: false })
  public usr_password_hash: string;

  @Default(1)
  @Comment("0: Inactivo, 1: Activo")
  @Column({ type: DataType.INTEGER, allowNull: false })
  public usr_state: number;

  @Default(0)
  @Comment("0: No, 1: Si")
  @Column({ type: DataType.INTEGER, allowNull: false })
  public usr_erased: number;

  @Comment("email")
  @Column({ type: DataType.STRING(255), allowNull: false })
  public usr_email: string;

  @Comment("celular")
  @Column({ type: DataType.STRING(20), allowNull: false })
  public usr_phone: string;

  @Default(0)
  @Comment("0: logout, 1: login")
  @Column({ type: DataType.INTEGER, allowNull: false })
  public usr_state_login: number;

  @Default(0)
  @Comment("0: sin verificar, 1: verificado")
  @Column({ type: DataType.INTEGER, allowNull: false })
  public usr_verify: number;

  @Comment("confirmation_token")
  @Column({ type: DataType.STRING(255), allowNull: true })
  public usr_confirmation_token: string;

  @Comment("reset_pass")
  @Column({ type: DataType.STRING(255), allowNull: true })
  public usr_reset_pass: string;

  @Comment("imei del dispositivo o mac")
  @Column({ type: DataType.STRING(255), allowNull: true })
  public usr_device_imei: string;

  @Comment("foto_hash")
  @Column({ type: DataType.STRING(255), allowNull: true })
  public usr_avatar: string;

  @Comment("Id creador")
  @Column({ type: DataType.INTEGER, allowNull: false })
  public usr_creator_id: number;

  @CreatedAt
  @Column({ type: DataType.DATE })
  public usr_created_at: Date;

  @Comment("Id editor")
  @Column({ type: DataType.INTEGER, allowNull: false })
  public usr_editor_id: number;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  public usr_updated_at: Date;

  @HasMany(() => CliCliente)
  public cli_cliente: CliCliente[];

  @HasOne(() => CliUsuario)
  public cli_usuario: CliUsuario;

  @HasMany(() => RolesAdicionales)
  public roles_add: RolesAdicionales[];
}

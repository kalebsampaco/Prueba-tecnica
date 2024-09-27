import {
  AutoIncrement,
  BelongsTo,
  Column,
  Comment,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from "sequelize-typescript";

/************ import HasMany ************/
import CliCliente from "./cliCliente";
import Roles from "./roles";
import Users from "./users";
/**
 * @author Styk Medina
 * @description Class to create model Role
 */
@Table({
  tableName: "cli_usuario",
  comment: "Usuarios del Colectivo",
  timestamps: false,
})
export default class CliUsuario extends Model<CliUsuario> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  public cu_id: number;

  @ForeignKey(() => Users)
  @Comment("id_usuario")
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "NO ACTION" })
  public cu_id_usuario: number;

  @BelongsTo(() => Users, { foreignKey: "cu_id_usuario" })
  public fk_usuario: Users;

  @ForeignKey(() => CliCliente)
  @Comment("id_cliente")
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "NO ACTION" })
  public cu_id_cliente: number;

  @BelongsTo(() => CliCliente)
  public fk_cli_cliente: CliCliente;

  @ForeignKey(() => Roles)
  @Comment(
    "Tabla Rol: 1: ADMIN_CLIENTE, 2: DIRECTOR_GENERAL, 3: PROFESIONAL_UNIVERSITARIO, 4: JEFE OFICINA ASESORA JURIDICA	.... etc"
  )
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "NO ACTION" })
  public cu_id_rol: number;

  @BelongsTo(() => Roles)
  public fk_roles: Roles;

  @Column({ type: DataType.STRING(100), allowNull: false })
  public cu_nombres: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  public cu_apellidos: string;

  @Column({ type: DataType.STRING(45), allowNull: false })
  public cu_documento: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  public cu_email: string;

  @Column({ type: DataType.STRING(45), allowNull: false })
  public cu_celular: string;

  @Default(1)
  @Comment("0: Inactivo, 1: Activo")
  @Column({ type: DataType.INTEGER, allowNull: false })
  public cu_estado: number;

  @Column({ type: DataType.BLOB, allowNull: true })
  public cu_logo: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  public cu_genero: number;

  @Comment(
    "1: SEDC (Sede Centro), 2: NTE (Norte), 3: ORI (Oriente), 4: SUROR (Sur Oriental), 5: SUR (Sur)  -- en la tabla cities (está un campo cty_code: ese se usó, para identificar las territoriales x ciudad)"
  )
  @Column({ type: DataType.INTEGER, allowNull: true })
  public cu_territorial: number;

  @Comment("firma")
  @Column({ type: DataType.STRING(255), allowNull: true })
  public cu_firma: string;

  @ForeignKey(() => Users)
  @Comment("user creador")
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "NO ACTION" })
  public cu_id_creador: number;

  @BelongsTo(() => Users, { foreignKey: "cu_id_creador" })
  public fk_creador: Users;

  @CreatedAt
  @Column({ type: DataType.DATE })
  public cu_fecha_creacion: Date;

  @ForeignKey(() => Users)
  @Comment("user editor")
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "NO ACTION" })
  public cu_id_editor: number;

  @BelongsTo(() => Users, { foreignKey: "cu_id_editor" })
  public fk_editor: Users;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  public cu_fecha_edicion: Date;

}

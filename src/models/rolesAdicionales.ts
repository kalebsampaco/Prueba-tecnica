import {
  Table,
  Model,
  Column,
  Comment,
  Default,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Users from "./users";
import CliUsuario from "./cliUsuario";
import Roles from "./roles";

/**
 * @author Juan Rosero
 * @description Class to create model Role ADDITIONAL
 */

@Table({
  tableName: "roles_add",
  comment: "Roles Adicionales",
  timestamps: false,
})
export default class RolesAdicionales extends Model<RolesAdicionales> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  public id: number;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  public id_usuario: number;

  @BelongsTo(() => Users)
  public fk_usuario: Users;

  @ForeignKey(() => Roles)
  @Column({ type: DataType.INTEGER, allowNull: false })
  public id_rol: number;

  @BelongsTo(() => Roles)
  public fk_rol: Roles;

  @Default(1)
  @Comment("0: Inactivo, 1: Activo")
  @Column({ type: DataType.SMALLINT, allowNull: false })
  public estado: number;

  @CreatedAt
  @Column({ type: DataType.DATE })
  public fecha_creacion: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  public fecha_edicion: Date;
}

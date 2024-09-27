import {
  Table,
  Model,
  Column,
  Comment,
  HasMany,
  Default,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

/************ import HasMany ************/
import Roles from './roles';

/**
 * @author Styk Medina
 * @description Class to create model Role
 */
@Table({ tableName: 'rol_permiso', comment: 'Url pantallas que tienen acceso a la plataforma', timestamps: false })
export default class RolPermiso extends Model<RolPermiso> {

  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  public rp_id: number;

  @ForeignKey(() => Roles)
  @Comment('id ROL que tiene acceso a la pantalla')
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'NO ACTION' })
  public rp_id_rol: number;

  @BelongsTo(() => Roles)
  public fk_roles: Roles;

  @Comment('url de la pantalla que tendra el permiso')
  @Column({ type: DataType.STRING(100), allowNull: false })
  public rp_url: string;

  @Default(1)
  @Comment('0: Inactivo, 1: Activo')
  @Column({ type: DataType.INTEGER, allowNull: false })
  public rp_estado: number;

}

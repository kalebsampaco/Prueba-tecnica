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
import CliCliente from './cliCliente';

/**
 * @author Styk Medina
 * @description Class to create model Role
 */
@Table({ tableName: 'rol_cliente', comment: 'Roles Equivalentes del Cliente Vs Roles de VIGPRO', timestamps: false })
export default class RolCliente extends Model<RolCliente> {

  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  public rc_id: number;

  @ForeignKey(() => CliCliente)
  @Comment('id_cliente')
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'NO ACTION' })
  public rc_id_cliente: number;

  @BelongsTo(() => CliCliente)
  public fk_cli_cliente: CliCliente;

  @ForeignKey(() => Roles)
  @Comment('id_rol')
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'NO ACTION' })
  public rc_id_rol: number;

  @BelongsTo(() => Roles)
  public fk_roles: Roles;

  @Comment('Nombre del Rol equivalente del cliente')
  @Column({ type: DataType.STRING(45), allowNull: false })
  public rc_nombre: string;

}

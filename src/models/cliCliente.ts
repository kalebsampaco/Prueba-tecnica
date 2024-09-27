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
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

/************ import HasMany ************/
import CliUsuario from './cliUsuario';
import RolCliente from './rolCliente';
import Users from './users';


/**
 * @author kalebsam
 * @description Class to create model Role
 */
@Table({ tableName: 'cli_cliente', comment: 'Empresas o Corporaciones que tendrán VIGPRO', timestamps: false })
export default class CliCliente extends Model<CliCliente> {

    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    public cc_id: number;

    @Comment('1: CORPORACIÓN, 2: ALCALDÍA, 3: GOBERNACIÓN, 4: EMPRESA PRIVADA')
    @Column({ type: DataType.INTEGER, allowNull: false })
    public cc_tipo: number;

    @Column({ type: DataType.STRING(100), allowNull: false })
    public cc_nombre: string;

    @Comment('explicación de quien es y que hace el cliente')
    @Column({ type: DataType.TEXT, allowNull: true })
    public cc_descripcion: string;

    @Column({ type: DataType.STRING(45), allowNull: true })
    public cc_nit: string;

    @Column({ type: DataType.STRING(45), allowNull: false })
    public cc_nombre_contacto: string;

    @Column({ type: DataType.STRING(45), allowNull: false })
    public cc_celular_contacto: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    public cc_email_contacto: string;

    @Column({ type: DataType.STRING(100), allowNull: true })
    public cc_telefono: string;

    @Column({ type: DataType.BLOB, allowNull: true })
    public cc_logo: string;

    @Comment('carpeta MD5')
    @Column({ type: DataType.STRING(45), allowNull: false })
    public cc_carpeta: string;

    @Default(1)
    @Comment('0: Inactivo, 1: Activo')
    @Column({ type: DataType.INTEGER, allowNull: false })
    public cc_estado: number;

    @ForeignKey(() => Users)
    @Comment('user creador')
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'NO ACTION' })
    public cc_id_creador: number;

    @BelongsTo(() => Users, { foreignKey: 'cc_id_creador' })
    public fk_creador: Users;

    @CreatedAt
    @Column({ type: DataType.DATE })
    public cc_fecha_creacion: Date;

    @ForeignKey(() => Users)
    @Comment('user editor')
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'NO ACTION' })
    public cc_id_editor: number;

    @BelongsTo(() => Users, { foreignKey: 'cc_id_editor' })
    public fk_editor: Users;

    @UpdatedAt
    @Column({ type: DataType.DATE })
    public cc_fecha_edicion: Date;

    @HasMany(() => RolCliente)
    public rol_cliente: RolCliente[];

    @HasMany(() => CliUsuario)
    public cli_usuario: CliUsuario[];


}

import {
  AutoIncrement,
  Column,
  Comment,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';


/**
 * @author kalebsam
 * @description Class to create model gift cards
 */
@Table({ tableName: 'gift_card', comment: '', timestamps: false })
export default class GiftCards extends Model<GiftCards> {

    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    public cc_id: number;

    @Comment('monto')
    @Column({ type: DataType.INTEGER, allowNull: false })
    public amount: number;

    @Comment('moneda')
    @Column({ type: DataType.STRING(100), allowNull: false })
    public currency: string;

    @CreatedAt
    @Column({ type: DataType.DATE })
    public expirationDate: Date;

    @CreatedAt
    @Column({ type: DataType.INTEGER })
    public user: number;




}

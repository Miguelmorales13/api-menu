import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  UpdatedAt,
} from 'sequelize-typescript';

/**
 * General
 * @template T
 */
export class General<T> extends Model<T> {
  /**
   * Column  of general
   */
  @Column({ autoIncrement: true, primaryKey: true })
  id?: number;

  /**
   * Created at of general
   */
  @CreatedAt
  @Column({ field: 'created_at', allowNull: false })
  createdAt?: Date;

  /**
   * Updated at of general
   */
  @UpdatedAt
  @Column({ field: 'updated_at', allowNull: false })
  updatedAt?: Date;

  /**
   * Deleted at of general
   */
  @DeletedAt
  @Column({ field: 'deleted_at', allowNull: true })
  deletedAt?: Date;
}

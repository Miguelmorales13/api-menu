import { BeforeCreate, Column, DataType, Table } from 'sequelize-typescript';
import { General } from './General.entity';

/**
 * Entity logger
 */
@Table({
  paranoid: true,
  timestamps: true,
  underscored: true,
})
export class Logger extends General<Logger> {
  @Column
  url: string;

  @Column
  type: string;

  @Column
  method: string;

  @Column(DataType.BIGINT)
  now: number;

  @Column(DataType.STRING(500))
  result: string;

  @Column
  wheree: string;

  @BeforeCreate
  static recortMessage(instance: Logger) {
    instance.result =
      instance.result.length > 500
        ? instance.result.substr(0, 500)
        : instance.result;
  }
  _toString(): string {
    return `${this.method} ${this.url} ${Date.now() - this.now}ms [${
      this.type
    }::${this.result}]`;
  }
}

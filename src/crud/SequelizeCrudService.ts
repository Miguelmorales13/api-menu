import { FindOptions } from 'sequelize';
import { ICrudService } from './ISequelizeCrudService';

/**
 * Sequelize crud service
 * @template T
 * @template D
 */
export abstract class SequelizeCrudService<T = any, D = any>
  implements ICrudService<T, D>
{
  constructor(private readonly service: T | any) {}

  /**
   * Gets all
   * @param [options]
   * @returns all
   */
  async getAll(options?: FindOptions): Promise<T[]> {
    return await this.service.findAll(options || null);
  }
  /**
   * Gets one
   * @param id
   * @param [options]
   * @returns one
   */
  async getOne(id: number, options?: FindOptions): Promise<T> {
    return await this.service.findByPk(id, options);
  }
  /**
   * Creates sequelize crud service
   * @param item
   * @returns create
   */
  async create(item: Partial<D>): Promise<T> {
    let itemCreated = await this.service.create(item);
    return this.getOne(itemCreated.id);
  }
  /**
   * Creates bulk
   * @param item
   * @returns bulk
   */
  async createBulk(item: Partial<D[]>): Promise<T[]> {
    let itemsCreated = await this.service.bulkCreate(item);
    return itemsCreated;
  }
  /**
   * Updates sequelize crud service
   * @param item
   * @param id
   * @returns update
   */
  async update(item: Partial<D>, id: number): Promise<T> {
    await this.service.update(item, { where: { id }, limit: 1 });
    return await this.getOne(id);
  }
  /**
   * Deletes sequelize crud service
   * @param id
   * @returns delete
   */
  async delete(id: number): Promise<number> {
    return this.service.destroy({ where: { id }, limit: 1 });
  }
}

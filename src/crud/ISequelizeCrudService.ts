/**
 * Icrud service
 * @template T
 * @template D
 */
export interface ICrudService<T = any, D = any> {
  getAll(): Promise<T[]>;
  getOne(id: number): Promise<T>;
  create(item: Partial<D>): Promise<T>;
  createBulk(item: Partial<D[]>): Promise<T[]>;
  update(item: Partial<D>, id: number);
  delete(id: number);
}

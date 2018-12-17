import { BaseService } from "./base/BaseService";
import { inject } from "inversify";
import { ProvideSingleton } from "../inversify/ioc";
import { CategoryRepository } from "../repositories/mongo/CategoryRepository";
import { CategoryEntity } from "../entities/CategoryEntity";

@ProvideSingleton(CategoryService)
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(@inject(CategoryRepository) protected repository: CategoryRepository) {
    super();
  }

  public async getByIndex(index: number): Promise<CategoryEntity> {
    return await this.repository.findOne({ 'index': index });
  }

}
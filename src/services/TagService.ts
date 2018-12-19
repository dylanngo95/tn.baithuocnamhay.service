import { BaseService } from "./base/BaseService";
import { TagEntity } from "../entities/TagEntity";
import { inject } from "inversify";
import { TagRepository } from "../repositories/mongo/TagRepository";
import { ProvideSingleton } from "../inversify/ioc";

@ProvideSingleton(TagService)
export class TagService extends BaseService<TagEntity> {
  constructor(@inject(TagRepository) protected repository: TagRepository) {
    super();
  }

  public async getByContentId(contentId: string): Promise<TagEntity[]> { 
    try {
      return await this.repository.getByContentId(contentId);
    } catch (error) {
      throw new Error(error);
    } 
  }

  public async getByCategoryId(categoryId: string): Promise<TagEntity[]> {
    try {
      return await this.repository.getByCategoryId(categoryId);
    } catch (error) {
      throw new Error(error);
    }
  }

}
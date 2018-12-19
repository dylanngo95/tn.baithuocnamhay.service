import { BaseRepository } from "./BaseRepository";
import { TagEntity, TagShema } from "../../entities/TagEntity";
import { ProvideSingleton, inject } from "../../inversify/ioc";
import { MongoDbConnection } from "../../config/MongoDbConnection";

@ProvideSingleton(TagRepository)
export class TagRepository extends BaseRepository<TagEntity> {
  constructor(@inject(MongoDbConnection) protected mongoDbConnection: MongoDbConnection) {
    super();
    super.init('Tags', TagShema, mongoDbConnection);
  }

  public async getByContentId(contentId: string): Promise<TagEntity[]> {
    const tags = await this.documentModel.find({
      contentId: contentId
    });
    return new this.formatter(tags);
  }

  public async getByCategoryId(categoryId: string): Promise<TagEntity[]> {
    const tags = await this.documentModel.find({
      categoryId: categoryId
    });
    return new this.formatter(tags);
  }

}
import { Controller, Tags, Route, Get, Query, Post, Body, Delete, Put, Path } from "tsoa";
import { inject } from "inversify";
import { ContentService } from "../services/ContentService";
import { ProvideSingleton } from "../inversify/ioc";
import { MContentView, ContentModule } from "../views/MContentView";
import { IPaginationModel, ContentEntity } from "../entities/index";
import { TagService } from "../services/TagService";
import { ApiError } from "../config/ErrorHandler";
import { Constants } from "../config/Constants";
import { CategoryService } from "../services/CategoryService";
import * as _ from 'lodash';


@Tags('Content')
@Route('content')
@ProvideSingleton(ContentController)
export class ContentController extends Controller {

  constructor(
    @inject(ContentService) protected contentService: ContentService,
    @inject(TagService) protected tagService: TagService,
    @inject(CategoryService) protected categoryService: CategoryService,
  ) {
    super();
  }

  @Get('{id}')
  public async getById(@Path('id') id: string): Promise<ContentEntity> {
    return this.contentService.getById(id);
  }

  @Get()
  public async getPaginated(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('fields') fields?: string,
    @Query('sort') sort?: string,
    @Query('q') q?: string,
  ): Promise<IPaginationModel> {
    return this.contentService.getPaginated(page, limit, fields, sort, q);
  }

  @Post()
  public async saveContent(@Body() content: MContentView): Promise<ContentEntity> {
    return this.contentService.save(ContentModule.convertContentView(content));
  }

  @Post('add-content')
  public async addContent(@Body() contentView: MContentView): Promise<ContentEntity> {
    try {
      const content = await this.contentService.save(ContentModule.convertContentView(contentView));
      if (!content) throw new ApiError(Constants.errorTypes.notFound);

      for (let index = 0; index < contentView.categories.length; index++) {
        const categoryId = contentView.categories[index].trim();
        const category = await this.categoryService.getByIndex(parseInt(categoryId));
        if (category) {
          await this.tagService.save({
            categoryId: category._id,
            contentId: content._id
          });
        }
      }
      return content;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Put('{id}')
  public async updateContent(@Path('id') id: string, @Body() contentView: MContentView): Promise<ContentEntity> {
    try {
      const content = await this.contentService.update(id, <ContentEntity>contentView);
      if (!content) throw new ApiError(Constants.errorTypes.notFound);

      return content;
    } catch(err) {
      throw new Error(err);
    }
  }

  @Delete('{id}')
  public async delete(@Path('id') id: string): Promise<void> {
    try {
      const res = await this.contentService.delete(id);
      if (res.n) {
        const categories = await this.tagService.getByContentId(id);
        if (categories) {
          categories.forEach(item => {
            this.tagService.delete(item._id);
          })
          return;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

}
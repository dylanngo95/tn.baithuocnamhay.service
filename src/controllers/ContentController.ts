import { Controller, Tags, Route, Get, Query, Post, Body, Delete } from "tsoa";
import { inject } from "inversify";
import { ContentService } from "../services/ContentService";
import { ProvideSingleton } from "../inversify/ioc";
import { MContentView } from "../views/MContentView";
import { IPaginationModel, ContentEntity } from "../entities/index";
import * as _ from 'lodash';
import { TagService } from "../services/TagService";
import { ApiError } from "../config/ErrorHandler";
import { Constants } from "../config/Constants";


@Tags('Content')
@Route('content')
@ProvideSingleton(ContentController)
export class ContentController extends Controller {

  constructor(
    @inject(ContentService) protected contentService: ContentService,
    @inject(TagService) protected tagService: TagService,
  ) {
    super();
  }

  @Get('{id}')
  public async getById(id: string): Promise<ContentEntity> {
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
    return this.contentService.save(<ContentEntity>content);
  }

  @Post('add-content')
  public async addContent(@Body() contentView: MContentView): Promise<ContentEntity> {
    try {
      const content = await this.contentService.save(<ContentEntity>contentView);
      if (!content) throw new ApiError(Constants.errorTypes.notFound);

      for (let index = 0; index < contentView.categories.length; index++) {
        const category = contentView.categories[index].trim();
        if (!_.isEmpty(category)) {
          await this.tagService.save({
            categoryId: category,
            contentId: content._id
          });
        }
      }
      return content;
    } catch (err) {
      throw new ApiError(Constants.errorTypes.validation);
    }

  }

  @Delete('{id}')
  public async delete(id: string): Promise<void> {
    return this.contentService.delete(id);
  }

}
import { Controller, Route, Tags, Get, Query, Post, Body, Delete, Path, Request } from "tsoa";
import { ProvideSingleton, inject } from "../inversify/ioc";
import { TagService } from "../services/TagService";
import { MTagView } from "../views/MTagView";
import { IPaginationModel } from "../entities/index";
import { TagEntity } from "../entities/TagEntity";
import { ApiError } from "../config/ErrorHandler";
import { Constants } from "../config/Constants";

@Tags('Tag')
@Route('tag')
@ProvideSingleton(TagController)
export class TagController extends Controller {
  
  constructor(@inject(TagService) protected tagService: TagService) {
    super();
  }

  @Get('{id}')
  public async getById(@Path('id') id: string): Promise<MTagView> {
    return this.tagService.getById(id);
  }

  @Get()
  public async getPaginated(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('fields') fields?: string,
    @Query('sort') sort?: string,
    @Query('q') q?: string, 
  ) : Promise<IPaginationModel> {
    return this.tagService.getPaginated(
      page,
      limit,
      fields,
      sort,
      q,
    );
  }

  @Post()
  public async addContent(@Body() tag: MTagView) {
    return this.tagService.save(<TagEntity>tag);
  }

  @Delete('{id}')
  public async delete(@Path('id') id: string): Promise<void> {
    return this.tagService.delete(id);
  }

  @Post('get-by-content-id')
  public async getByContentId(@Query() contentId: string) {
    try {
      return await this.tagService.getByContentId(contentId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('get-by-category-id')
  public async getByCategoryId(@Query() categoryId: string) {
    try {
      return await this.tagService.getByCategoryId(categoryId);
    } catch (error) {
      throw new Error(error);
    }
  }

}
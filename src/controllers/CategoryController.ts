import { Controller, Tags, Route, Get, Query, Post, Body, Delete, Path } from "tsoa";
import { inject } from "inversify";
import { ProvideSingleton } from "../inversify/ioc";
import { IPaginationModel, ContentEntity, CategoryEntity } from "../entities/index";
import { CategoryService } from "../services/CategoryService";
import { MCategoryView } from "../views/MCategoryView";

@Tags('Category')
@Route('category')
@ProvideSingleton(CategoryController)
export class CategoryController extends Controller {
  
  constructor(@inject(CategoryService) protected service: CategoryService) {
    super();
  }

  @Get('{id}')
  public async getById(@Path('id') id: string): Promise<MCategoryView> {
    return this.service.getById(id);
  }

  @Get()
  public async getPaginated(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('fields') fields?: string,
    @Query('sort') sort?: string,
    @Query('q') q?: string,
  ) : Promise<IPaginationModel> {
    return this.service.getPaginated(page, limit, fields, sort, q);
  }

  @Post()
  public async addContent(@Body() content: MCategoryView): Promise<MCategoryView> {
    return this.service.save(<CategoryEntity>content);
  }

  @Delete('{id}')
  public delete(@Path('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

}
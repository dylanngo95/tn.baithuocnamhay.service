import { MongoDbConnection } from '../../config/MongoDbConnection';
import { Model, Document, Schema, SchemaDefinition, Mongoose } from 'mongoose';
import { cleanQuery } from '../../utils/generalUtils';
import { ApiError } from '../../config/ErrorHandler';
import { Constants } from '../../config/Constants';
import { decorate, injectable } from 'inversify';
import { IBaseRepository } from '../base/IBaseRepository';

export abstract class BaseRepository<EntityType> implements IBaseRepository<EntityType> {

  protected mongoDbConnection: MongoDbConnection;
  protected documentModel: Model<Document>;
  protected schema: SchemaDefinition;
  protected modelName: string;
  protected formatter: any = Object;

  protected init(modelName: string, schema: SchemaDefinition, mongoDbConnection: MongoDbConnection) {
    this.modelName = modelName;
    this.schema = schema;
    this.mongoDbConnection = mongoDbConnection;
    this.documentModel = this.mongoDbConnection.db.model(this.modelName, new Schema(this.schema, { collection: this.modelName }));
  }

  public async create(model: EntityType): Promise<EntityType> {
    const document: Document = await this.documentModel.create(this.cleanToSave(model));
    return new this.formatter(document);
  }

  public async save(model: EntityType): Promise<EntityType> {
    const documentModel = await new this.documentModel(model);
    const doc = await documentModel.save();
    if (doc) {
      return Promise.resolve(new this.formatter(doc));
    } else {
      throw new ApiError(Constants.errorTypes.notFound);
    }
  }

  public async update(_id: string, model: EntityType): Promise<void> {
    await this.documentModel.updateOne({ _id }, this.cleanToSave(model));
  }

  public async delete(_id: string): Promise<{ n: number; }> {
    const number = await this.documentModel.deleteOne({ _id });
    return number;
  }

  public async find(
    skip: number = 0,
    limit: number = 100,
    sort: string,
    query: any
  ): Promise<EntityType[]> {
    const sortObject = cleanQuery(sort, this.sortQueryFormatter);
    return (
      await this.documentModel
        .find(this.cleanWhereQuery(query))
        .sort(Object.keys(sortObject).map(key => [key, sortObject[key]]))
        .skip(skip)
        .limit(limit)
    ).map(item => new this.formatter(item));
  }

  public async findOne<T>(query: any): Promise<EntityType> {
    const document: Document = await this.documentModel.findOne(query);
    if (!document) throw new ApiError(Constants.errorTypes.notFound);
    return new this.formatter(document);
  }

  public async count(query: any): Promise<number> {
    return await this.documentModel.estimatedDocumentCount(this.cleanWhereQuery(query));
  }

  protected cleanToSave(entity: EntityType): EntityType {
    const copy: EntityType = new this.formatter(entity);
    const loop = (value: any): any => {
      if (!value || typeof value !== 'object') return;
      /** formatting logic to save goes here */
      Object.keys(value).forEach(key => loop(value[key]));
    };
    loop(copy);
    return copy;
  }

  protected sortQueryFormatter(key: string, value: string): number | undefined {
    if (value === 'asc') return 1;
    if (value === 'desc') return -1;
    return undefined; // just for static typing
  }

  protected cleanSort(sort: string): { [key: string]: any } {
    return cleanQuery(sort, this.sortQueryFormatter);
  }

  protected cleanWhereQuery(query: any): { [key: string]: any } {
    if (!query || typeof query === 'string') return cleanQuery(query);

    const newQuery = { $or: [] };
    Object.keys(query).forEach(key => {
      let value = query[key];
      if (!(value instanceof Array)) newQuery[key] = value;
      else newQuery.$or = newQuery.$or.concat(value.map(item => ({ [key]: item })));
    });
    if (!newQuery.$or.length) delete newQuery.$or;
    return newQuery;
  }

}

decorate(injectable(), BaseRepository);
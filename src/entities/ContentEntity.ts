import { DbEntity, DbSchema } from "./base/DbEntity";
import * as mongoose from "mongoose";

export interface ContentEntity extends DbEntity {
  title: string;
  description: string;
  content: string;
  active: number;
  image: string;
  userId: string;
}

export const ContentSchema = {
  ...DbSchema,
  title: { type: String, require: true, },
  description: { type: String, require: true, },
  content: { type: String, require: true, },
  active: { type: Number, require: true, },
  image: { type: String, require: true, },
  userId: { type: String, require: true, },
};
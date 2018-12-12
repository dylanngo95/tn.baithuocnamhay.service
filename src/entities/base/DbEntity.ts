import { View, Entity } from "./Entity";
import * as mongoose from "mongoose";

export interface DbView extends View {

}

export interface DbEntity extends DbView, Entity {
  _id: any;
  created?: number;
  updated?: number;
}

export const DbSchema = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  created: {
    type: mongoose.Schema.Types.Number,
    require: false,
    default: Date.now,
  },
  updated: {
    type: mongoose.Schema.Types.Number,
    require: false,
    default: Date.now
  }
}

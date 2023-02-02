import { Mongo } from "meteor/mongo";

export default interface LoteryInterface {
  id?: number;
  date: Date;
  numbers: number[];
}

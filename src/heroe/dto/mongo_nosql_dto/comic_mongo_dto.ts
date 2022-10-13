import { ObjectId } from 'mongoose';

export default class Comic_Mongo_Dto {
  id: number;
  title: string;
  description: string;
  format: string;
  comicsummary: ObjectId;
}

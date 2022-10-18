import { ObjectId } from 'mongoose';

export interface ComicInterface {
  id: number;
  title: string;
  description: string;
  format: string;
  comicsummary: ObjectId;
}

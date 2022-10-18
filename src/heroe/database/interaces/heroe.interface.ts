import { ObjectId } from 'mongoose';

export interface HeroeInterface {
  id: number;
  name: string;
  description: string;
  image: string;
  comics: ObjectId[];
}

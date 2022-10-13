import { ObjectId } from 'mongoose';

export default class HeroeMongo_Dto {
  id: number;
  name: string;
  description: string;
  image: string;
  comics: ObjectId[];
}

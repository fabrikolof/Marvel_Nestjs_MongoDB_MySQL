import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type HeroeDocument = Heroe & Document;

@Schema({ versionKey: false })
export class Heroe {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comic' }] })
  comics: number[];
}

export const HeroeSchema = SchemaFactory.createForClass(Heroe);

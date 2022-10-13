import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComicSummaryDocument = ComicSummary & Document;

@Schema({ versionKey: false })
export class ComicSummary {
  @Prop()
  title: string;

  @Prop()
  resourceURI: string;
}

export const ComicSummarySchema = SchemaFactory.createForClass(ComicSummary);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Auth } from '../../../../domain/auth';
import { Id } from '../../../../domain/generics';
import { Document } from 'mongoose';

@Schema({ collection: 'auths', timestamps: true })
export class AuthClass implements Auth {
  id: Id;
  @Prop()
  username: string;
  @Prop()
  password: string;
}

export type AuthDocument = Auth & Document;
export const AuthSchema = SchemaFactory.createForClass(AuthClass);

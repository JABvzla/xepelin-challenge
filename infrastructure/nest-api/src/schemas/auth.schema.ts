import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Auth } from '@xepelin/domain/auth';
import { Id } from '@xepelin/domain/generics';
import { Document } from 'mongoose';

@Schema({ collection: 'auths ' })
export class AuthClass implements Auth {
  id: Id;
  @Prop()
  username: string;
  @Prop()
  password: string;
}

export type AuthDocument = Auth & Document;
export const AuthSchema = SchemaFactory.createForClass(AuthClass);

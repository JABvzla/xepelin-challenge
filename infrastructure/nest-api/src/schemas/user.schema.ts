import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from '../../../../domain/account';
import { Auth } from '../../../../domain/auth';
import { Id } from '../../../../domain/generics';
import { User } from '../../../../domain/user';
import { Document } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class UserClass implements User {
  id: Id;
  @Prop()
  name: string;
  @Prop()
  auth: Auth['id'][];
  @Prop()
  accounts: Account['id'][];
  @Prop()
  createdAt?: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(UserClass);

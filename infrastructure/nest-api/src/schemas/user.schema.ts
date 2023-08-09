import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from '@xepelin/domain/account';
import { Auth } from '@xepelin/domain/auth';
import { Id } from '@xepelin/domain/generics';
import { User } from '@xepelin/domain/user';
import { Document } from 'mongoose';

@Schema({ collection: 'users ' })
export class UserClass implements User {
  id: Id;
  @Prop()
  name: string;
  @Prop()
  auth: Auth['id'][];
  @Prop()
  accounts: Account['id'][];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(UserClass);

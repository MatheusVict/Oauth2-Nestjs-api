import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserAuth {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  image: string;
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);

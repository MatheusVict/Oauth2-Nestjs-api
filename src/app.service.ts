import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserAuth } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(UserAuth.name)
    private userAuthModel: Model<UserAuth>,
  ) {}

  async login({
    email,
    name,
    image,
  }: {
    email: string;
    name: string;
    image: string;
  }): Promise<any> {
    const userExits = await this.userAuthModel.findOne({
      email,
    });
    if (!userExits) {
      const createdUser = new this.userAuthModel({
        email,
        name,
        image,
      });

      await createdUser.save();

      return createdUser;
    } else {
      return userExits;
    }
  }
}

import { IUser, default as userSchema } from '../models/Users';
import mongoose, { Model } from 'mongoose';

export default class UserRepository {
  private readonly UserModel: Model<IUser>;

  constructor() {
    this.UserModel = mongoose.model<IUser>('User', userSchema);
  }

  async create(user: any) {
    const newUser = new this.UserModel(user);
    await newUser.save();
    return newUser;
  }

  async findOne(email: any) {
    return this.UserModel.findOne({ email: email });
  }

  async findOneAndUpdate(email: any, updatedUser: any) {
    return await this.UserModel.findOneAndUpdate({ email: email }, updatedUser, { new: true });
  }

  async deleteOne(email: string): Promise<void> {
    await this.UserModel.deleteOne({ email });
  }


}
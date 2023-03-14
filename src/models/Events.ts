import { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  description: string;
  dateTime: Date;
  createdAt: Date;
}

const eventSchema: Schema = new Schema({
  description: { type: String, required: true },
  dateTime: { type: String, default: new Date()},
  createdAt: { type: Date, default: Date.now() },
});

export default eventSchema
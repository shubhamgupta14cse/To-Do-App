// Import Mongoose and its types
import { Document } from 'mongoose';
import { EnumType } from 'typescript';

export interface ITask extends Document {
    name: string;
    description: string;
    status: EnumType;
  }
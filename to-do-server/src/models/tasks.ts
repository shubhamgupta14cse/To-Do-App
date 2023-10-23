import {ITask} from '../types/tasks';
import {model, Schema} from 'mongoose';

const taskSchema = new Schema ({
 name:{
    type: String,
    required: true
 },
 description: {
    type: String,
    required: true
 },
 status: {
   type: String,
   enum : ["TO_DO", "IN_PROGRESS", "DONE"],
   default: 'TO_DO',
   required: false
 }
},
{timestamps: true}
)
export default model<ITask>('Task', taskSchema);
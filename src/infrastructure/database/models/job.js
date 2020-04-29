import { Schema, model } from 'mongoose';

const JobSchema = Schema({
  success: {
    type: Boolean,
  },
  status: {
    type: String,
    enum: ['running', 'done'],
  },
  name: {
    type: String,
  },
  label: {
    type: String,
  },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

export default model('Job', JobSchema);

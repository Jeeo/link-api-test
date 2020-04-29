import { Schema, model } from 'mongoose';

const DealSchema = Schema({
  blingRef: {
    type: Number,
    required: true,
    index: true,
  },
  pipedriveRef: {
    type: Number,
    required: true,
    index: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
},
{
  timestamps: { createdAt: 'createdAt' },
});

export default model('Deal', DealSchema);

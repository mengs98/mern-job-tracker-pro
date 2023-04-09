import mongoose from 'mongoose';
import moment from 'moment';

const JobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, 'Please state your applied position'],
      trim: true,
      minlength: [2, 'Position must be at least 2 characters'],
      maxlength: [35, 'Position must not exceed 35 characters'],
    },
    company: {
      type: String,
      required: [true, 'Please state the company you applied to'],
      trim: true,
      minlength: [3, 'Position must be at least 3 characters'],
      maxlength: [35, 'Position must not exceed 35 characters'],
    },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'freelance', 'internship'],
      default: 'full-time',
      required: [true, 'Please state the job type'],
    },
    workArrangement: {
      type: String,
      enum: ['wfo', 'remote', 'hybrid'],
      default: 'wfo',
      required: [true, 'Please state the work arrangement'],
    },
    location: {
      type: String,
      required: [true, 'Please state the job location'],
      minlength: [2, 'Position must be at least 2 characters'],
      maxlength: [20, 'Position must not exceed 20 characters'],
    },
    deadline: {
      type: Date,
      max: moment().add(6, 'months'),
      validate: {
        validator: function (value) {
          const sixMonthsFromNow = moment().add(6, 'months');
          return moment(value).isSameOrBefore(sixMonthsFromNow);
        },
        message: 'Deadline must be within 6 months from today',
      },
    },
    link: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        'plan to apply',
        'applied',
        'interviewing',
        'declined',
        'accepted',
      ],
      required: [true, 'Please state the status of your application'],
      default: 'applied',
    },
    skills: {
      type: String,
      required: [true, 'Please list required skills, comma-separated'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);

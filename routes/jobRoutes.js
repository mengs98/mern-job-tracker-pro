import express from 'express';
import testUser from '../middleware/testUser.js';
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobController.js';

const router = express.Router();

router.route('/').get(getAllJobs).post(testUser, createJob);
router.route('/stats').get(showStats);
router.route('/:id').patch(testUser, updateJob).delete(testUser, deleteJob);

export default router;
import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user team workout');
  res.json({ activities });
});

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ activity });
});

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('user team workout');
  if (!activity) {
    return res.status(404).json({ message: 'Activity not found' });
  }
  res.json({ activity });
});

export default router;

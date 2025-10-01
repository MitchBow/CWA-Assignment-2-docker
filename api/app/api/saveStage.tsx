import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../lib/sequelize';
import { initDB } from './_db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initDB();
  if (req.method !== 'POST') return res.status(405).end();

  const { userId, stageData } = req.body;
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.stageProgress = JSON.stringify(stageData);
  await user.save();

  res.status(200).json({ message: 'Stage saved!' });
}

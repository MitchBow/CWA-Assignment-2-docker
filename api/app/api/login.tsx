import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../lib/sequelize';
import { initDB } from './_db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initDB();
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const user = await User.findOne({ where: { username, password } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  res.status(200).json({
    id: user.id,
    username: user.username,
    stageProgress: user.stageProgress ? JSON.parse(user.stageProgress) : {},
  });
}

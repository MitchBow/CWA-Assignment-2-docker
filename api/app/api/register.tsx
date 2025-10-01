import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../lib/sequelize';
import { initDB } from './_db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initDB();
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) return res.status(400).json({ error: 'Username already exists' });

  const user = await User.create({ username, password, stageProgress: JSON.stringify({}) });
  res.status(200).json({ id: user.id, username: user.username, stageProgress: {} });
}

import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import jwt from 'jsonwebtoken';
import { env } from '~/env';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await db.select(users).where(users.email.eq(email)).single();

      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, env.NEXTAUTH_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Error logging in user', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

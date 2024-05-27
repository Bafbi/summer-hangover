// src/pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password: hashedPassword,
      };

      await db.insert(users).values(newUser);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Error registering user', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

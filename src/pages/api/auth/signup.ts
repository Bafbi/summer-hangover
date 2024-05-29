// src/pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, age, description, email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      await db.insert(users).values({
        id: crypto.randomUUID(),  // Add the id here
        firstName,
        lastName,
        age,
        description,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

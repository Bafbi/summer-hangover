import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export const POST = async (req: NextRequest) => {
  try {
    const { name, firstName, lastName, age, description, email, password } = await req.json();

    console.log('Received data:', { name, firstName, lastName, age, description, email, password });

    // Check if the user or pseudo already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      console.log('Email already exists:', email);
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const existingPseudo = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.name, name),
    });

    if (existingPseudo) {
      console.log('Pseudo already exists:', name);
      return NextResponse.json({ error: 'Pseudo already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    // Insert the new user into the database
    await db.insert(users).values({
      id: crypto.randomUUID(),
      name: name,
      firstName,
      lastName,
      age,
      description,
      email,
      password: hashedPassword,
    });

    console.log('User registered successfully:', email);
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
};

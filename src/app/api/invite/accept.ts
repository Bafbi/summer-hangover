import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '~/server/db';
import { groupsMembers, groups } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Accept Invite API</title>
      </head>
      <body>
        <h1>API Invite Link is Working!</h1>
        <p>Method: GET</p>
      </body>
      </html>
    `);
  }

  if (req.method === 'POST') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { inviteLink } = req.body;
    const userId = session.user.id;

    try {
      const group = await db.query.groups.findFirst({
        where: (groups, { eq }) => eq(groups.inviteLink, inviteLink),
      });

      if (!group) {
        return res.status(400).json({ error: 'Invalid invitation link' });
      }

      await db.insert(groupsMembers).values({
        groupId: group.id,
        userId,
      });

      res.status(200).json({ message: 'Invitation accepted' });
    } catch (error) {
      console.error('Error accepting invitation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

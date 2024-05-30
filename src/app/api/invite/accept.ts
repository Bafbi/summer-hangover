import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '~/server/db';
import { inviteLinks, groupsMembers } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { groupId } = req.body;
    const userId = session.user.id;

    try {
      const inviteLink = await db.query.inviteLinks.findFirst({
        where: (inviteLinks, { eq }) => eq(inviteLinks.link, groupId),
      });

      if (!inviteLink) {
        return res.status(400).json({ error: 'Invalid invitation link' });
      }

      await db.insert(groupMembers).values({
        groupId: inviteLink.groupId,
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

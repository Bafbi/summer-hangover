import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { inviteLinks, userGroups } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { groupId } = req.body;
    const userId = req.session.user.id; // Assuming you have session middleware to get user ID

    try {
      const inviteLink = await db.query.inviteLinks.findFirst({
        where: (inviteLinks, { eq }) => eq(inviteLinks.link, groupId),
      });

      if (!inviteLink) {
        return res.status(400).json({ error: 'Invalid invitation link' });
      }

      await db.insert(userGroups).values({
        userId,
        groupId: inviteLink.groupId,
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

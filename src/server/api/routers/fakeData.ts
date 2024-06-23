import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { count, sql, eq } from "drizzle-orm";
import { faker } from "@faker-js/faker";
import { db } from "~/server/db";
import {
  users,
  sessions,
  notifications,
  groups,
  events,
  messages,
  groupsMembers,
} from "~/server/db/schema";
import { notificationType } from "~/server/db/schema";

/*
    Permet de générer des données factices pour les test, en particulier pour le dashboard admin
    Pour lancer ce script, executer la commande suivante dans le terminal :

    npx ts-node fakeData.ts
*/

const NUMBER_TO_GENERATE = 250;


async function generateUsers(count: number) {
  const userData = Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 15, max: 80 }),
    description:  faker.lorem.paragraph(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    emailVerified: faker.date.recent(),
    createdAt: 
      faker.date.past({years: 1 }),
    image: faker.image.avatar(),
    isAdmin: false,
  }));

  console.log("userData date : ", userData[0]?.createdAt);
  await db.insert(users).values(userData);
  return userData;
}

// Fonction pour générer des sessions factices
async function generateSessions(users: any[], count: number) {
  const sessionData = Array.from({ length: count }, () => ({
    sessionToken: faker.string.uuid(),
    userId: users[Math.floor(Math.random() * users.length)].id,
    expires: faker.date.soon({ days: 7}),
    createdAt: faker.date.past({years: 2}),
  }));

  await db.insert(sessions).values(sessionData);
}

// Fonction pour générer des groupes factices
async function generateGroups(users: any[], count: number) {
  const groupData = Array.from({ length: count }, () => ({
    name: faker.company.name(),
    inviteLink: faker.internet.url(),
    description: faker.lorem.paragraph(),
    userAdmin: users[Math.floor(Math.random() * users.length)].id,
    createdBy: users[Math.floor(Math.random() * users.length)].id,
    createdAt: faker.date.past(),
  }));

  const groupsCreated = await db.insert(groups).values(groupData).returning();

  return groupsCreated;
}

// Fonction pour générer des membres de groupes factices
async function generateGroupMembers(groups: any[], users: any[], count: number) {

  const groupMemberData = [];
  const existingPairs = new Set();

  for (let i = 0; i < count; i++) {
    const groupId = groups[Math.floor(Math.random() * groups.length)].id;
    const userId = users[Math.floor(Math.random() * users.length)].id;
    const pair = `${groupId}-${userId}`;

    // On vérifie que le groupeMember (i.e le combo groupId + userId) n'existe pas déjà
    // Permet d'éviter des erreurs du type "foreign key constraint" à cause de doublons
    if (!existingPairs.has(pair)) {
      groupMemberData.push({ groupId, userId });
      existingPairs.add(pair);
    }
  }

  if (groupMemberData.length > 0) {
    await db.insert(groupsMembers).values(groupMemberData);
  } else {
    console.warn("Aucun membre généré (pas de groupeMember unique trouvé).");
  }
}

// Fonction pour générer des événements factices
async function generateEvents(groups: any[], users: any[], count: number) {
  const eventData = Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 1, max: 100000 }),
    groupId: groups[Math.floor(Math.random() * groups.length)].id,
    name: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    createdBy: users[Math.floor(Math.random() * users.length)].id,
    createdAt: faker.date.past(),
    date: faker.date.future(),
    location: faker.location.streetAddress().toString(),
    endVoteDate: faker.date.soon(),
  }));

  
  console.log("eventData : ", eventData);
  return await db.insert(events).values(eventData);
}

// Fonction pour générer des messages factices
async function generateMessages(groups: any[], users: any[], count: number) {
  const messageData = Array.from({ length: count }, () => ({
    groupId: groups[Math.floor(Math.random() * groups.length)].id,
    eventId: null,
    userId: users[Math.floor(Math.random() * users.length)].id,
    content: faker.lorem.sentences(),
    createdAt: faker.date.past(),
  }));

  await db.insert(messages).values(messageData).returning();
}

// Fonction pour générer des notifications factices
async function generateNotifications(users: any[], count: number) {
  const notificationData = Array.from({ length: count }, () => ({
    userId: users[Math.floor(Math.random() * users.length)].id,
    message: "Vous avez été invité à rejoindre un nouveau groupe ! Cliquer ici pour voir le détail.",
    createdAt: faker.date.past(),
    isRead: faker.datatype.boolean(),
    notifType: notificationType[0],
    urlLink: faker.internet.url(),
  }));

  await db.insert(notifications).values(notificationData);
}

// Appel général pour générer toutes les fausses données
export async function generateFakeData(numberOfUsers: number) {
  const userCount = numberOfUsers;
  const sessionCount = Math.floor(numberOfUsers * 0.35);
  const notificationCount = Math.floor(numberOfUsers * 2.4);
  const groupCount = Math.floor(numberOfUsers * 0.25);
  const groupMemberCount = numberOfUsers * 3.2;
  const eventCount = numberOfUsers * 0.6;
  const messageCount = numberOfUsers * 5;

  const users = await generateUsers(userCount);
  await generateSessions(users, sessionCount);
  await generateNotifications(users, notificationCount);
  const groups = await generateGroups(users, groupCount);
  await generateGroupMembers(groups, users, groupMemberCount);
  await generateEvents(groups, users, eventCount);
  await generateMessages(groups, users, messageCount);

  console.log("Fake data générés correctement");
}

// Pour importer cette fonction dans un autre fichier, il faut mettre cet import :
// import { generateFakeData } from "../../server/api/routers/fakeData";

export const dataRouter = createTRPCRouter({
    generateData: protectedProcedure.mutation(async ({ ctx }) => {
      generateFakeData(NUMBER_TO_GENERATE).catch(console.error);
      return "Fake data générés correctement";
    }),
});
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

async function generateUsers(count: number) {
  const userData = Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 15, max: 80 }),
    description: faker.lorem.sentence(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    emailVerified: new Date(faker.date.past().getTime()),
    createdAt: new Date(
      faker.date
        .between({
          from: "2023-01-01T00:00:00.000Z",
          to: "2023-06-06T00:00:00.000Z",
        })
        .getTime(),
    ),
    image: faker.image.avatar(),
    isAdmin: faker.datatype.boolean(),
  }));

  await db.insert(users).values(userData);
  return userData;
}

// Fonction pour générer des sessions factices
async function generateSessions(users: any[], count: number) {
  const sessionData = Array.from({ length: count }, () => ({
    sessionToken: faker.string.uuid(),
    userId: users[Math.floor(Math.random() * users.length)].id,
    expires: new Date(faker.date.soon().getTime()),
    createdAt: new Date(faker.date.past().getTime()),
  }));

  await db.insert(sessions).values(sessionData);
}

// Fonction pour générer des notifications factices
async function generateNotifications(users: any[], count: number) {
  const notificationData = Array.from({ length: count }, () => ({
    userId: users[Math.floor(Math.random() * users.length)].id,
    message: faker.lorem.sentence(),
    createdAt: new Date(faker.date.past().getTime()),
    isRead: faker.datatype.boolean(),
    notifType: notificationType[0],
    urlLink: faker.internet.url(),
  }));

  await db.insert(notifications).values(notificationData);
}

// Fonction pour générer des groupes factices
async function generateGroups(users: any[], count: number) {
  const groupData = Array.from({ length: count }, () => ({
    name: faker.company.name(),
    inviteLink: faker.internet.url(),
    description: faker.lorem.paragraph(),
    userAdmin: users[Math.floor(Math.random() * users.length)].id,
    createdBy: users[Math.floor(Math.random() * users.length)].id,
    createdAt: new Date(faker.date.past().getTime()),
  }));

  const groupsCreated = await db.insert(groups).values(groupData).returning();
  return groupsCreated;
}

// Fonction pour générer des membres de groupes factices
async function generateGroupMembers(
  groups: any[],
  users: any[],
  count: number,
) {
  const groupMemberData = Array.from({ length: count }, () => ({
    groupId: groups[Math.floor(Math.random() * groups.length)].id,
    userId: users[Math.floor(Math.random() * users.length)].id,
  }));

  await db.insert(groupsMembers).values(groupMemberData);
}

// Fonction pour générer des événements factices
async function generateEvents(groups: any[], users: any[], count: number) {
  const eventData = Array.from({ length: count }, () => ({
    id: groups[Math.floor(Math.random() * groups.length * 100000)].id,
    groupId: groups[Math.floor(Math.random() * groups.length)].id,
    name: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    createdBy: users[Math.floor(Math.random() * users.length)].id,
    createdAt: new Date(faker.date.past().getTime()),
    date: new Date(faker.date.future().getTime()),
    location: faker.location.streetAddress().toString(),
    endVoteDate: new Date(faker.date.soon().getTime()),
  }));

  await db.insert(events).values(eventData);
}

// Fonction pour générer des messages factices
async function generateMessages(groups: any[], users: any[], count: number) {
  const messageData = Array.from({ length: count }, () => ({
    groupId: groups[Math.floor(Math.random() * groups.length)].id,
    eventId: null,
    userId: users[Math.floor(Math.random() * users.length)].id,
    content: faker.lorem.sentences(),
    createdAt: new Date(faker.date.past().getTime()),
  }));

  await db.insert(messages).values(messageData);
}

// Exécution de la génération de données factices
export async function generateFakeData(numberOfUsers: number) {
  const userCount = numberOfUsers;
  const sessionCount = numberOfUsers * 2;
  const notificationCount = numberOfUsers * 2;
  const groupCount = Math.floor(numberOfUsers / 2);
  const groupMemberCount = numberOfUsers * 3;
  const eventCount = numberOfUsers;
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

generateFakeData(100).catch(console.error);

// Pour importer cette fonction dans un autre fichier, il faut mettre cet import :
// import { generateFakeData } from "../../server/api/routers/fakeData";

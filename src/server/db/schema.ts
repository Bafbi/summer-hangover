import { info, table } from "console";
import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = sqliteTableCreator(
  (name) => `summer-hangover_${name}`,
);

export const posts = createTable(
  "post",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
    createdById: text("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = createTable("user", {
  id: text("id", { length: 255 }).primaryKey(),
  name: text("name", { length: 255 }).notNull().unique(),
  firstName: text("firstName", { length: 255 }),
  lastName: text("lastName", { length: 255 }),
  age: int("age"),
  description: text("description", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  password: text("password", { length: 255 }),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  groups: many(groupsMembers),
  groupsAdmin: many(groups, { relationName: "admin" }),
  groupsCreated: many(groups, { relationName: "createdBy" }),
  events: many(eventsParticipants),
  eventsCreated: many(events, { relationName: "createdBy" }),
  activitiesCreated: many(activities, { relationName: "createdBy" }),
  notifications: many(notifications),
  usedLinks: many(inviteLinkUsers),
}));

// Different types of notifications à passer en paramètre
// Permet de choisir quel texte afficher selon le contexte
export const notificationType = [
  "INVITED_TO_GROUP",
  "NEW_EVENT_TO_GROUP",
  "NEW_ACTIVITY_TO_EVENT",
  "NEW_MESSAGES_TO_GROUP",
  "NEW_MESSAGES_TO_EVENT",
  "LAST_ONE_TO_VOTE",
  "VOTE_REMINDER",
  "EXPENSES_REMINDER",
] as const;

export const notifications = createTable(
  "notification",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    message: text("message", { length: 255 }).notNull(),
    createdAt: int("createdAt", { mode: "timestamp" }).default(
      sql`(strftime('%s', 'now'))`,
    ),
    isRead: int("isRead", { mode: "boolean" }).default(false),
    notifType: text("notifType", { enum: notificationType }).notNull(),
    urlLink: text("url", { length: 255 }),
  },
  (notification) => ({
    userIdIdx: index("notification_userId_idx").on(notification.userId),
  }),
);

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
}));

export const accounts = createTable(
  "account",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

/// Tables for the functionality of the app ///

export const groups = createTable("group", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  inviteLink: text("inviteLink", { length: 255 }).notNull(),
  description: text("description", { length: 255 }),
  userAdmin: text("userAdmin", { length: 255 })
    .notNull()
    .references(() => users.id),
  createdBy: text("createdBy", { length: 255 })
    .notNull()
    .references(() => users.id),
  createdAt: int("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const groupsRelations = relations(groups, ({ one, many }) => ({
  members: many(groupsMembers),
  userAdmin: one(users, {
    fields: [groups.userAdmin],
    references: [users.id],
    relationName: "admin",
  }),
  createdBy: one(users, {
    fields: [groups.createdBy],
    references: [users.id],
    relationName: "createdBy",
  }),
  messages: many(messages),
  inviteLinks: many(inviteLinks),
}));

export const groupsMembers = createTable(
  "groupMembers",
  {
    groupId: int("groupId", { mode: "number" })
      .notNull()
      .references(() => groups.id),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.groupId, table.userId] }),
  }),
);

export const groupsMembersRelations = relations(groupsMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupsMembers.groupId],
    references: [groups.id],
  }),
  user: one(users, { fields: [groupsMembers.userId], references: [users.id] }),
}));

export const events = createTable(
  "event",
  {
    id: int("id", { mode: "number" }).notNull(),
    groupId: int("groupId", { mode: "number" }).notNull(),
    name: text("name", { length: 255 }).notNull(),
    description: text("description", { length: 255 }),
    createdBy: text("createdBy", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: int("createdAt", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    date: int("date", { mode: "timestamp" }).notNull(),
    location: text("location", { length: 255 }),
    endVoteDate: int("endVoteDate", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.groupId] }),
  }),
);

export const eventsRelations = relations(events, ({ one, many }) => ({
  group: one(groups, { fields: [events.groupId], references: [groups.id] }),
  createdBy: one(users, {
    fields: [events.createdBy],
    references: [users.id],
    relationName: "createdBy",
  }),
  participants: many(eventsParticipants),
  messages: many(messages),
  activities: many(activities),
}));

export const eventsParticipants = createTable(
  "eventParticipants",
  {
    eventId: int("eventId", { mode: "number" }).notNull(),
    userId: text("userId", { length: 255 }).notNull(),
    groupId: int("groupId", { mode: "number" }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.eventId, table.userId, table.groupId] }),
  }),
);

export const eventsParticipantsRelations = relations(
  eventsParticipants,
  ({ one }) => ({
    event: one(events, {
      fields: [eventsParticipants.groupId, eventsParticipants.eventId],
      references: [events.groupId, events.id],
    }),
    user: one(users, {
      fields: [eventsParticipants.userId],
      references: [users.id],
    }),
  }),
);

export const activities = createTable("activity", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  eventId: int("eventId", { mode: "number" }).notNull(),
  groupId: int("groupId", { mode: "number" }).notNull(),
  createdBy: text("createdBy", { length: 255 }).notNull(),
  location: text("location", { length: 255 }).notNull(),
  description: text("description", { length: 255 }),
  name: text("name", { length: 255 }).notNull(),
});

export const activitiesRelations = relations(activities, ({ one, many }) => ({
  event: one(events, {
    fields: [activities.eventId],
    references: [events.id],
  }),
  group: one(groups, {
    fields: [activities.groupId],
    references: [groups.id],
  }),
  createdBy: one(users, {
    fields: [activities.createdBy],
    references: [users.id],
    relationName: "createdBy",
  }),
  votes: many(votesActivities),
}));

export const votesActivities = createTable(
  "voteActivity",
  {
    activityId: int("activityId", { mode: "number" }).notNull(),
    eventId: int("eventId", { mode: "number" }).notNull(),
    groupId: int("groupId", { mode: "number" }).notNull(),
    userId: text("userId", { length: 255 }).notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.eventId, table.groupId, table.userId],
    }),
  }),
);

export const votesActivitiesRelations = relations(
  votesActivities,
  ({ one }) => ({
    user: one(users, {
      fields: [votesActivities.userId],
      references: [users.id],
    }),
    activity: one(activities, {
      fields: [
        votesActivities.groupId,
        votesActivities.eventId,
        votesActivities.groupId,
      ],
      references: [activities.groupId, activities.eventId, activities.groupId],
    }),
  }),
);

export const messages = createTable("message", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  groupId: int("groupId", { mode: "number" }).notNull(),
  eventId: int("eventId", { mode: "number" }),
  userId: text("userId", { length: 255 })
    .notNull()
    .references(() => users.id),
  content: text("content", { length: 1024 }).notNull(),
  createdAt: int("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  user: one(users, { fields: [messages.userId], references: [users.id] }),
  event: one(events, {
    fields: [messages.groupId, messages.eventId],
    references: [events.groupId, events.id],
  }),
  group: one(groups, { fields: [messages.groupId], references: [groups.id] }),
}));

export const inviteLinks = createTable("inviteLink", {
  id: text("id", { length: 255 }).primaryKey(),
  groupId: int("groupId", { mode: "number" })
    .notNull()
    .references(() => groups.id),
  link: text("link", { length: 255 }).unique().notNull(),
  createdAt: int("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  expiresAt: int("expiresAt", { mode: "timestamp" }).notNull(),
  maxUses: int("maxUses").notNull(),
  used: int("used").default(0),
});

export const inviteLinksRelations = relations(inviteLinks, ({ one, many }) => ({
  group: one(groups, {
    fields: [inviteLinks.groupId],
    references: [groups.id],
  }),
  usedBy: many(inviteLinkUsers),
}));

export const inviteLinkUsers = createTable(
  "inviteLinkUsers",
  {
    inviteLinkId: text("inviteLinkId", { length: 255 })
      .notNull()
      .references(() => inviteLinks.id),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.inviteLinkId, table.userId] }),
  }),
);

export const inviteLinkUsersRelations = relations(
  inviteLinkUsers,
  ({ one }) => ({
    inviteLink: one(inviteLinks, {
      fields: [inviteLinkUsers.inviteLinkId],
      references: [inviteLinks.id],
    }),
    user: one(users, {
      fields: [inviteLinkUsers.userId],
      references: [users.id],
    }),
  }),
);

export const expenses = createTable("expense", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  groupId: int("groupId", { mode: "number" }).notNull(),
  eventId: int("eventId", { mode: "number" }).notNull(),
  userId: text("userId", { length: 255 }).notNull(),
  amount: int("amount").notNull(),
  label: text("label", { length: 255 }),
  createdAt: int("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const expensesRelations = relations(expenses, ({ one }) => ({
  event: one(events, {
    fields: [expenses.groupId, expenses.eventId],
    references: [events.id, events.id],
  }),
  user: one(users, {
    fields: [expenses.userId],
    references: [users.id],
  }),
}));

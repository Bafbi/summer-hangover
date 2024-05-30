import { desc, relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
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
  id: text("id", { length: 255 }).notNull().primaryKey(),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text("image", { length: 255 }),
  description: text("description", { length: 255 }),
  firstName: text("firstName", { length: 255 }),
  lastName: text("lastName", { length: 255 }),
});

export const notifications = createTable("notification", {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: text("userId", { length: 255 }).notNull().references(() => users.id),
    message: text("message", { length: 255 }).notNull(),
    createdAt: int("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    userIdIdx: index("notification_userId_idx").on(table.userId),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  friends: many(friends, { relationName: "user" }),
  friendsBy: many(friends, { relationName: "friend" }),
  groups: many(groupsMembers),
  groupsAdmin: many(groups, { relationName: "admin" }),
  groupsCreated: many(groups, { relationName: "createdBy" }),
  events: many(eventsParticipants),
  eventsCreated: many(events, { relationName: "createdBy" }),
  activitiesCreated: many(activities, { relationName: "createdBy" }),
}));

enum FriendStatus {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  BLOCKED = "BLOCKED",
}

export const friends = createTable(
  "friends",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    friendId: text("friendId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: text("status", { length: 255 })
      .$type<FriendStatus>()
      .notNull()
      .default(FriendStatus.PENDING),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.friendId] }),
  }),
);

export const friendsRelations = relations(friends, ({ one }) => ({
  user: one(users, {
    fields: [friends.userId],
    references: [users.id],
    relationName: "user",
  }),
  friend: one(users, {
    fields: [friends.friendId],
    references: [users.id],
    relationName: "friend",
  }),
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
    id: int("id", { mode: "number" }),
    groupId: int("groupId", { mode: "number" })
      .notNull()
      .references(() => groups.id),
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

export const eventsParticipants = createTable("eventParticipants", {
  eventId: int("eventId", { mode: "number" })
    .notNull()
    .references(() => events.id),
  userId: text("userId", { length: 255 })
    .notNull()
    .references(() => users.id),
});

export const eventsParticipantsRelations = relations(
  eventsParticipants,
  ({ one }) => ({
    event: one(events, {
      fields: [eventsParticipants.eventId],
      references: [events.id],
    }),
    user: one(users, {
      fields: [eventsParticipants.userId],
      references: [users.id],
    }),
  }),
);

export const messages = createTable("message", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  groupId: int("groupId", { mode: "number" })
    .notNull()
    .references(() => groups.id),
  eventId: int("eventId", { mode: "number" }).references(() => events.id),
  userId: text("userId", { length: 255 })
    .notNull()
    .references(() => users.id),
  content: text("content", { length: 1024 }).notNull(),
  createdAt: int("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  group: one(groups, { fields: [messages.groupId], references: [groups.id] }),
  user: one(users, { fields: [messages.userId], references: [users.id] }),
  event: one(events, { fields: [messages.eventId], references: [events.id] }),
}));

export const activities = createTable(
  "activity",
  {
    id: int("id", { mode: "number" }),
    eventId: int("eventId", { mode: "number" }),
    groupId: int("groupId", { mode: "number" }),
    createdBy: text("createdBy", { length: 255 })
      .notNull()
      .references(() => users.id),
    location: text("location", { length: 255 }).notNull(),
    description: text("description", { length: 255 }),
    name: text("name", { length: 255 }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.eventId, table.groupId] }),
  }),
);

export const activitiesRelations = relations(activities, ({ one }) => ({
  event: one(events, {
    fields: [activities.eventId, activities.groupId],
    references: [events.id, events.groupId],
  }),
  createdBy: one(users, {
    fields: [activities.createdBy],
    references: [users.id],
    relationName: "createdBy",
  }),
}));

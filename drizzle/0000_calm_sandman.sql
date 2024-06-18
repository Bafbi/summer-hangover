CREATE TABLE `summer-hangover_account` (
	`userId` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`providerAccountId` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `summer-hangover_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_activity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`eventId` integer NOT NULL,
	`groupId` integer NOT NULL,
	`createdBy` text(255) NOT NULL,
	`location` text(255) NOT NULL,
	`description` text(255),
	`name` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_event` (
	`id` integer NOT NULL,
	`groupId` integer NOT NULL,
	`name` text(255) NOT NULL,
	`description` text(255),
	`createdBy` text(255) NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`date` integer NOT NULL,
	`location` text(255),
	`endVoteDate` integer NOT NULL,
	PRIMARY KEY(`groupId`, `id`),
	FOREIGN KEY (`createdBy`) REFERENCES `summer-hangover_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_eventParticipants` (
	`eventId` integer NOT NULL,
	`userId` text(255) NOT NULL,
	`groupId` integer NOT NULL,
	PRIMARY KEY(`eventId`, `groupId`, `userId`)
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_expense` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`groupId` integer NOT NULL,
	`eventId` integer NOT NULL,
	`userId` text(255) NOT NULL,
	`amount` integer NOT NULL,
	`label` text(255),
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_group` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`inviteLink` text(255) NOT NULL,
	`description` text(255),
	`userAdmin` text(255) NOT NULL,
	`createdBy` text(255) NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userAdmin`) REFERENCES `summer-hangover_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`createdBy`) REFERENCES `summer-hangover_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_groupMembers` (
	`groupId` integer NOT NULL,
	`userId` text(255) NOT NULL,
	PRIMARY KEY(`groupId`, `userId`),
	FOREIGN KEY (`groupId`) REFERENCES `summer-hangover_group`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `summer-hangover_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_inviteLinkUsers` (
	`inviteLinkId` text(255) NOT NULL,
	`userId` text(255) NOT NULL,
	PRIMARY KEY(`inviteLinkId`, `userId`),
	FOREIGN KEY (`inviteLinkId`) REFERENCES `summer-hangover_inviteLink`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `summer-hangover_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_inviteLink` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`groupId` integer NOT NULL,
	`link` text(255) NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`expiresAt` integer NOT NULL,
	`maxUses` integer NOT NULL,
	`used` integer DEFAULT 0,
	FOREIGN KEY (`groupId`) REFERENCES `summer-hangover_group`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_message` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`groupId` integer NOT NULL,
	`eventId` integer,
	`userId` text(255) NOT NULL,
	`content` text(1024) NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `summer-hangover_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_notification` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text(255) NOT NULL,
	`message` text(255) NOT NULL,
	`createdAt` integer,
	`isRead` integer DEFAULT false,
	`notifType` text NOT NULL,
	`url` text(255),
	FOREIGN KEY (`userId`) REFERENCES `summer-hangover_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`createdById` text(255) NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`createdById`) REFERENCES `summer-hangover_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_session` (
	`sessionToken` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `summer-hangover_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`firstName` text(255),
	`lastName` text(255),
	`age` integer,
	`description` text(255),
	`email` text(255) NOT NULL,
	`password` text(255),
	`emailVerified` integer DEFAULT CURRENT_TIMESTAMP,
	`image` text(255)
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_verificationToken` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE TABLE `summer-hangover_voteActivity` (
	`activityId` integer NOT NULL,
	`eventId` integer NOT NULL,
	`groupId` integer NOT NULL,
	`userId` text(255) NOT NULL,
	PRIMARY KEY(`eventId`, `groupId`, `userId`)
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `summer-hangover_account` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `summer-hangover_inviteLink_link_unique` ON `summer-hangover_inviteLink` (`link`);--> statement-breakpoint
CREATE INDEX `notification_userId_idx` ON `summer-hangover_notification` (`userId`);--> statement-breakpoint
CREATE INDEX `createdById_idx` ON `summer-hangover_post` (`createdById`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `summer-hangover_post` (`name`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `summer-hangover_session` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `summer-hangover_user_name_unique` ON `summer-hangover_user` (`name`);
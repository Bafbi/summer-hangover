import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { friendRouter } from "./routers/friend";
import { activityRouter } from "./routers/activity";
import { groupRouter } from "./routers/group";
import { eventRouter } from "./routers/event";
import { userRouter } from "./routers/user";
import { profileRouter } from "./routers/profile";
import { notificationRouter } from "./routers/notifications";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  friend: friendRouter,
  activity: activityRouter,
  group: groupRouter,
  event: eventRouter,
  user:  userRouter,
  profile: profileRouter,
  notification: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

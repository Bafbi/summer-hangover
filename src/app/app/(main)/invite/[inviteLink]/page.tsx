// "use client"

// import { GetServerSideProps, NextPage } from "next";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { db } from "~/server/db";
// import { groups, inviteLinks, groupsMembers } from "~/server/db/schema";
// import { eq } from "drizzle-orm";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const inviteLink = context.params?.inviteLink as string;

//   console.log("inviteLink:", inviteLink);  // Log the inviteLink for debugging

//   const group = await db.query.groups.findFirst({
//     where: (groups, { eq }) => eq(groups.inviteLink, inviteLink),
//   });

//   if (!group) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       inviteLink,
//       groupName: group.name,
//       groupId: group.id,
//     },
//   };
// };

// const InvitePage: NextPage<{ inviteLink: string; groupName: string; groupId: number }> = ({ inviteLink, groupName, groupId }) => {
//   const { data: sessionData } = useSession({ required: true });
//   const router = useRouter();

//   const handleAcceptInvite = async () => {
//     try {
//       const response = await fetch(`/api/invite/accept`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ inviteLink }),
//       });

//       if (response.ok) {
//         router.push(`/g/${groupId}`);
//       } else {
//         console.error("Failed to accept invite:", await response.json());
//       }
//     } catch (error) {
//       console.error("Error accepting invite:", error);
//     }
//   };

//   return (
//     <main className="flex h-screen flex-col items-center justify-center bg-[#40534D]">
//       <div className="flex flex-col items-center justify-center gap-4">
//         <h1 className="text-4xl font-bold text-[#E49A0A]">SUMMER TRIP</h1>
//         <p className="text-2xl font-semibold text-[#E49A0A]">Invitation</p>
//         <p className="text-2xl font-semibold text-[#E49A0A]">
//           Vous avez été invité à rejoindre le groupe {groupName}
//         </p>
//         <div className="flex gap-4">
//           <button
//             className="rounded-lg bg-[#1E5552] px-4 py-2 text-lg font-semibold text-[#E49A0A] hover:bg-[#1CCDB3]"
//             onClick={handleAcceptInvite}
//           >
//             Oui
//           </button>
//           <button
//             className="rounded-lg bg-[#E49A0A] px-4 py-2 text-lg font-semibold text-[#1E5552] hover:bg-[#FFA500]"
//             onClick={() => router.push("/")}
//           >
//             Non
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default InvitePage;

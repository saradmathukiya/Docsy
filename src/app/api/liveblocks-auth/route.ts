import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { room } = await req.json();
  const document = await convex.query(api.documents.getById, { id: room });

  if (!document) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isOwner = document.ownerId === user.id;
  
  // Get organization ID from session claims first, then fallback to user's organization membership
  let organizationId = sessionClaims.org_id as string | undefined;
  
  // If session claims don't have org_id, try to get it from user's organization membership
  if (!organizationId) {
    try {
      const clerk = await clerkClient();
      const userMemberships = await clerk.users.getOrganizationMembershipList({
        userId: user.id,
      });
      
      if (userMemberships.data.length > 0) {
        organizationId = userMemberships.data[0].organization.id;
      }
    } catch (_error) {
      console.log("Failed to get user organization memberships:", _error);
    }
  }
  
  const isOrganizationMember = !!(
    document.organizationId && document.organizationId === organizationId
  );

  if (!isOwner && !isOrganizationMember) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";
  const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber) % 360
  const color = `hsl(${hue}, 80%, 60%)`;
  
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color,
    },
  });
  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  return new Response(body, { status });
}

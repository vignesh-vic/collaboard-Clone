import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
auth;
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret:
    "sk_dev_SWpoPGVER_8ORy-KJvW_owl4Ns0TthTnikZ_i42mEDNSeYY45bXevsIQ8cBHIAwC",
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();



  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();

  const board = await convex.query(api.board.get, { id: room });


  if (board?.orgId != authorization.orgId) {
    return new Response("Unauthorized",{status:403});
  }

  const userInfo = {
    name: user.firstName || "unknow",
    picture: user.imageUrl!,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  
  return new Response(body, { status });
}

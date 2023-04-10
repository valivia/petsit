import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const getSessionAndId = async (params: Params["params"]) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return { error: new Response("Unauthorized", { status: 401 }) }

  const id = params.id as string | undefined;
  if (!id)
    return { error: new Response("Missing id", { status: 400 }) }

  return { session, id };
}

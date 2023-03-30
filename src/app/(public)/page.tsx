// nextjs app directory page template

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession(authOptions)
    console.log(session);

    if (!session) redirect("/api/auth/signin")

    return (
        <>
            <h1>{session.user?.name}</h1>
            <p>{session.user?.email}</p>
            <img src={session.user?.image || ""} />
        </>
    );
}

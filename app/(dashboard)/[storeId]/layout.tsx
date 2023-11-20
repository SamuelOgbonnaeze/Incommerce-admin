import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function Dashboardlayout({
    children, params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    // fetch userid from clerk auth
    const { userId } = auth();
    // redirect to sign-in if userId can't be found
    if (!userId) {
        redirect('/sign-in')
    }

    // if found, fetch the store that matchs the userId from prisma.
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    // if store is not found, redirect to home
    if (!store) {
        redirect('/')
    }

    return (
        <>
            <div>This will be a navbar</div>
            {children}
        </>
    )

}
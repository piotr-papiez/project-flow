import { cookies } from "next/headers";

export async function setReactisUserIdCookie(reactisUserId: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set("reactisUserId", reactisUserId, {
        httpOnly: true,
        secure: false,
        path: "/"
    });
}

export async function getReactisUserIdCookie(): Promise<string | null> {
    const cookieStore = await cookies();
    const reactisUserId = cookieStore.get("reactisUserId")?.value;

    if (!reactisUserId) {
        return null;
    }

    return reactisUserId;
}

export async function deleteReactisUserIdCookie(): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.delete("reactisUserId");
}
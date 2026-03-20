import { cookies } from "next/headers";

export async function setReactisUserIdCookie(userId: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set("userId", userId, {
        httpOnly: true,
        secure: false,
        path: "/"
    });
}

export async function deleteReactisUserIdCookie(): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.delete("userId");
}
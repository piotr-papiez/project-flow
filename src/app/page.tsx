// Next.js
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// Better Auth
import { auth } from "@/auth"

export default async function Home(): Promise<void> {
  const session = await auth.api.getSession({
          headers: await headers()
      });

  if (session) {
    redirect("/tasks");
  } else {
    redirect("/signin");
  }
}
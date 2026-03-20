import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/reactis/tasks/[taskId]">) {
    const { taskId } = await ctx.params;

    console.log(taskId);
}
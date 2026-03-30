// React.js
import { Suspense } from "react";

// Components
import TaskDialog from "@/features/tasks/components/dialog/TaskDialog";
import TaskDialogSkeleton from "@/features/tasks/components/dialog/TaskDialogSkeleton";
import TaskDialogContent from "@/features/tasks/components/dialog/TaskDialogContent";

// Utils
import { getReactisUserIdCookie } from "@/features/auth/lib/reactis-user-id-cookie";

// Types
type TaskDialogPagePropsType = {
    params: Promise<{
        reactisTaskId: string
    }>;
}

export default async function TaskDialogPage({ params }: TaskDialogPagePropsType) {
    const { reactisTaskId } = await params;

    const reactisUserId = await getReactisUserIdCookie();
    const reactisTaskUrl = `https://ncrm.netgraf.pl/task/user_list/${reactisUserId}/${reactisTaskId}`;

    return (
        <TaskDialog
            reactisTaskId={reactisTaskId}
            reactisTaskUrl={reactisTaskUrl}
        >
            <Suspense
                fallback={<TaskDialogSkeleton />}
            >
                <TaskDialogContent
                    reactisTaskId={reactisTaskId}
                />
            </Suspense>
        </TaskDialog>
    );
}
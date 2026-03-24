// React.js
import { Suspense } from "react";

// Components
import TaskDialog from "@/features/tasks/components/TaskDialog";
import TaskDialogSkeleton from "@/features/tasks/components/TaskDialogSkeleton";
import TaskDialogContent from "@/features/tasks/components/TaskDialogContent";

type TaskDialogPagePropsType = {
    params: Promise<{
        reactisTaskId: string
    }>;
}

export default async function TaskDialogPage({ params }: TaskDialogPagePropsType) {
    const { reactisTaskId } = await params;



    return (
        <TaskDialog>
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
import TaskDialog from "@/features/tasks/components/TaskDialog";
import TaskDialogSkeleton from "@/features/tasks/components/TaskDialogSkeleton";

export default function DialogLoading() {
    return (
        <TaskDialog reactisTaskId="">
            <TaskDialogSkeleton />
        </TaskDialog>
    );
}
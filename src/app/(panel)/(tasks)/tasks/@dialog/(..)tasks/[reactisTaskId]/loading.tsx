import TaskDialog from "@/features/tasks/components/dialog/TaskDialogContainer";
import TaskDialogSkeleton from "@/features/tasks/components/dialog/TaskDialogSkeleton";

export default function DialogLoading() {
    return (
        <TaskDialog reactisTaskId="">
            <TaskDialogSkeleton />
        </TaskDialog>
    );
}
import TaskDialog from "@/features/tasks/components/dialog/TaskDialog";
import TaskDialogSkeleton from "@/features/tasks/components/dialog/TaskDialogSkeleton";

export default function DialogLoading() {
    return (
        <TaskDialog reactisTaskId="">
            <TaskDialogSkeleton />
        </TaskDialog>
    );
}
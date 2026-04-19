import TaskDialogContainer from "@/features/tasks/components/dialog/TaskDialogContainer";
import TaskDialogSkeleton from "@/features/tasks/components/dialog/TaskDialogSkeleton";
import { RichContentEditorProvider } from "@/features/tasks/context/rich-content-editor.context";

export default function DialogLoading() {
    return (
        <RichContentEditorProvider>
            <TaskDialogContainer>
                <TaskDialogSkeleton />
            </TaskDialogContainer>
        </RichContentEditorProvider>
    );
}
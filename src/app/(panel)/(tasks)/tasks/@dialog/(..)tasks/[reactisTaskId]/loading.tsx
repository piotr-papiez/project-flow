// Components
import TaskDialogHeaderBarSkeleton from "@/features/tasks/components/dialog/skeleton/TaskDialogHeaderBarSkeleton";
import TaskDialogSkeleton from "@/features/tasks/components/dialog/skeleton/TaskDialogSkeleton";


// Radix
import { Dialog, Flex, VisuallyHidden } from "@radix-ui/themes";


// Main function
export default function TaskDialogLoading() {
    return (
        <Dialog.Root open>
            <Dialog.Content
                aria-describedby={undefined}
                maxHeight="86dvh"
                maxWidth="880px"
                size="2"
            >
                <Flex direction="column" gap="4">
                    <VisuallyHidden>
                        <Dialog.Title>Wczytywanie</Dialog.Title>
                    </VisuallyHidden>
                    
                    <VisuallyHidden>
                        <Dialog.Description>Okno dialogowe szczegółów zadania</Dialog.Description>
                    </VisuallyHidden>
                    <TaskDialogHeaderBarSkeleton />


                    <TaskDialogSkeleton />
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
// Components
import RichContentEditor from "@/components/shared/rich-content-editor/RichContentEditor";

// Radix
import {
    Flex, Blockquote
} from "@radix-ui/themes";

// Types
type TaskDialogMorePropsType = {
    notes?: string,
    reactisTaskId?: string
};

export default function TaskDialogMore({
    notes, reactisTaskId
}: TaskDialogMorePropsType) {
    return (
        <Flex direction="column" gap="4" style={{ minHeight: "50dvh", maxHeight: "min(50dvh, 488px)" }}>
            <Blockquote>
                <Flex direction="column" gap="1">
                    <RichContentEditor
                        savedNotes={notes}
                        reactisTaskId={reactisTaskId}
                    />
                </Flex>
            </Blockquote>
        </Flex>
    );
}
// Components
import RichContentEditor from "@/components/shared/rich-content-editor/RichContentEditor";

// Radix
import {
    ScrollArea, Flex, Blockquote, Text,
    IconButton,
    Tooltip,
    Heading,
    DataList,
    Card,
    TextArea
} from "@radix-ui/themes";

// Types
type TaskDialogMorePropsType = {
    notes?: string,
    draft?: string,
    cms?: string
    reactisTaskId?: string
};

export default function TaskDialogMore({
    notes, draft, cms, reactisTaskId
}: TaskDialogMorePropsType) {
    return (
        <Flex direction="column" gap="4" style={{ minHeight: "50dvh", maxHeight: "min(50dvh, 488px)" }}>
            <Blockquote>
                <Flex direction="column" gap="1">
                    <Text size="1" ml="4">
                        Notatki
                    </Text>
                    <RichContentEditor savedNotes={notes} reactisTaskId={reactisTaskId} />
                </Flex>
            </Blockquote>
        </Flex>
    );
}
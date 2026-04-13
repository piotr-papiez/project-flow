// Components
import CommentBubble from "../shared/CommentBubble";
import ActionIconButton from "@/components/ui/ActionIconButton";
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

import { Pencil1Icon } from "@radix-ui/react-icons";

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
            {/* <ScrollArea scrollbars="vertical" type="auto" style={{ maxHeight: "100%" }}>
                <Blockquote size="2" mr="4">
                */}
            <Flex direction="column" gap="1">
                <Text as="label" htmlFor="notes" size="1" ml="2">
                    Notatki
                </Text>
                <RichContentEditor savedNotes={notes} reactisTaskId={reactisTaskId} />
            </Flex>
            {/* <TextArea value={notes}>
                        
                        </TextArea> */}
            {/* </Blockquote> */}
            {/* </ScrollArea > */}


        </Flex>
    );
}
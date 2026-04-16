// Components
import CommentBubble from "../shared/CommentBubble";
import RichContentEditor from "@/components/shared/rich-content-editor/RichContentEditor";

// Radix
import {
    ScrollArea, Flex, Blockquote, TextArea,
} from "@radix-ui/themes";

import { PaperPlaneIcon } from "@radix-ui/react-icons";

// Types
import type { ReactisTaskCommentsType } from "@/types/reactis";

type TaskDialogCommentsPropsType = {
    comments: ReactisTaskCommentsType
};

export default function TaskDialogComments({
    comments
}: TaskDialogCommentsPropsType) {
    return (
        <Flex direction="column" gap="4" style={{ minHeight: "100%", maxHeight: "min(50dvh, 488px)" }}>
            <ScrollArea scrollbars="vertical" type="auto" style={{ maxHeight: "100%" }}>
                <Blockquote size="2" mr="4">
                    <Flex direction="column" gap="2">
                        {comments.items.map(item => (
                            <CommentBubble key={item.id} comment={item.text} />
                        ))}
                    </Flex>
                </Blockquote>
            </ScrollArea >

            <Flex direction="column" gap="2">
                {/* <RichContentEditor /> */}
                {/* <TextArea placeholder="**Wkrótce**" style={{ width: "100%",  minHeight: "100%" }} /> */}
            </Flex>
        </Flex>
    );
}
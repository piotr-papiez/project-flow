// Components
import CommentBubble from "../shared/CommentBubble";

// Radix
import { ScrollArea, Box, Flex, Blockquote, TextArea } from "@radix-ui/themes";

// Types
import type { ReactisTaskCommentsType } from "@/types/reactis";

type TaskDialogCommentsPropsType = {
    comments: ReactisTaskCommentsType
};

export default function TaskDialogComments({
    comments
}: TaskDialogCommentsPropsType) {
    return (
        <Flex direction="column" gap="4" style={{ maxHeight: "min(44dvh, 488px)" }}>
            <ScrollArea scrollbars="vertical" type="auto" style={{ maxHeight: "100%" }}>
                <Blockquote size="2" mr="4">
                    <Flex direction="column" gap="2">
                        {comments.items.map(item => (
                            <CommentBubble key={item.id} comment={item.text} />
                        ))}
                    </Flex>
                </Blockquote>
            </ScrollArea >
            {/* <TextArea  /> */}
        </Flex>
    );
}